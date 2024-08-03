<%@ page language= "java" contentType="text/html" pageEncoding="utf-8" %>
<%-- 데이터 베이스 탐색 라이브러리 -> 커넥터를 찾는다 --%>
<%@ page import="java.sql.DriverManager" %>
<%-- 데이터 베이스 연결 lib --%>
<%@ page import="java.sql.Connection" %>
<%-- SQL 생성 및 전송 --%>
<%@ page import="java.sql.PreparedStatement" %>
<%-- SQL 예외처리  --%>
<%@ page import="java.sql.SQLException" %>
<%-- 셀렉트 할때만 필요하다  --%>
<%@ page import="java.sql.ResultSet" %>
<%@ page import="java.sql.*, java.util.*" %>

<%!
public String validateAll() {
    public final Pattern regex_id = Pattern.compile("^[0-9]{6,20}$");
    public final Pattern regex_pw = Pattern.compile("^(?=.*[a-zA-Z])(?=.*\\d)[a-zA-Z\\d]{6,20}$");
    if (!regex_id.matcher(id).matches()) {
        return "아이디 오류";
    }
    if (!regex_pw.matcher(pw).matches()) {
        return "비밀번호 오류";
    }
    return "true";
}

public String tryLogin(Connection connection,HttpServletRequest request,String id,String pw) {
    String userIDX = "";
    String userColor = "";
    String first_login = "";

    try {
        // 사용자 데이터 삽입 시도
        String getSelectSQL = "SELECT idx, theme_color , first_login FROM User WHERE id = ? AND pw = ?";
        PreparedStatement stmt = connection.prepareStatement(getSelectSQL);
        stmt.setString(1,id);
        stmt.setString(2,pw);
        ResultSet result = stmt.executeQuery();
        if(result.next()){
            userIDX=result.getString("idx");
            loginSession(connection,request,userIDX);
        }
    } 
    catch (SQLException e) {
        e.printStackTrace();
        userIDX = "";
    }
    return userIDX;
}
    public void loginSession(Connection connection,HttpServletRequest request,String userIDX) {
        HttpSession session = request.getSession(true);
        session.setAttribute("idx", userIDX);
    }
%>

<%
    request.setCharacterEncoding("utf-8");
    String id = request.getParameter("id");
    String pw = request.getParameter("pw");
    String regexText=validateAll(id,pw)
    Connection connection = null;
    try {
        Class.forName("org.mariadb.jdbc.Driver");
        connection = DriverManager.getConnection("jdbc:mariadb://localhost:3306/web", "mannomi", "1234");
    } catch (Exception e) {
        e.printStackTrace();
    }
    String userIDX = tryLogin(connection,request,id,pw);
%>

<script>
    var regexTest="<%=regexText%>"
    if (regexTest!=)
    var userIDX="<%=userIDX%>"
    if (userIDX!=""){
        alert("로그인 성공 ")
        location.href = "../page/schedule_page.jsp?";
    }
    else{
        alert("계정이 존재하지 않습니다")
        window.history.back()
    }
</script>
