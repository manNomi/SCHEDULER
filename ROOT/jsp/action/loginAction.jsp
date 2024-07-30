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
            userColor=result.getString("theme_color");
            first_login=result.getString("first_login");
            loginSession(connection,request,userIDX,userColor,first_login);
        }
    } 
    catch (SQLException e) {
        e.printStackTrace();
        userIDX = "";
    }
    return userIDX;
}
    public void loginSession(Connection connection,HttpServletRequest request,String userIDX ,String color ,String first_login) {
        HttpSession session = request.getSession(true);
        session.setAttribute("idx", userIDX);
        session.setAttribute("color",color);
        session.setAttribute("login",first_login);
    }
%>

<%
    request.setCharacterEncoding("utf-8");
    String id = request.getParameter("id");
    String pw = request.getParameter("pw");
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
    var userIDX="<%=userIDX%>"
    if (userIDX!=""){
        const now = new Date();
        const year = now.getFullYear();
        const month = (now.getMonth() + 1).toString().padStart(2, "0"); // 두 자리 형식으로
        const day = now.getDate().toString().padStart(2, "0"); // 두 자리 형식으로
        const formattedDate = year+"-"+month+"-"+day;
        alert("로그인 성공 ")
        location.href = "../page/schedule_page.jsp?day="+formattedDate;
    }
    else{
        alert(userIDX)
        alert("계정이 존재하지 않습니다")
        window.history.back()
    }
    
</script>
