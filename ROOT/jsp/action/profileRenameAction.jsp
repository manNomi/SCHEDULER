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



<%!
public String tryUpdate(Connection connection,String userIDX,String pwOld, String pwNew) {
    String userPW = "";
    try {
        // 사용자 데이터 삽입 시도
        String getSelectSQL = "UPDATE User SET pw = ? WHERE idx = ? AND pw = ?";
        PreparedStatement stmt = connection.prepareStatement(getSelectSQL);
        stmt.setString(1,pwNew);
        stmt.setString(2,userIDX);
        stmt.setString(3,pwOld);
        stmt.executeUpdate();
    } 
    catch (SQLException e) {
        userPW = e.getMessage();
    }
    return userPW;
}
public String validateAll(String pwOld,String pwNew) {
    final Pattern regex_pw = Pattern.compile("^(?=.*[a-zA-Z])(?=.*\\d)[a-zA-Z\\d]{6,20}$");
    if (!regex_pw.matcher(pwOld).matches()) {
        return "현재 비밀번호 오류";
    }
    if (!regex_pw.matcher(pwNew).matches()) {
        return "새로운 비밀번호 오류";
    }
    return "true";
}
%>


<%
    request.setCharacterEncoding("utf-8");
    String pwOld = request.getParameter("old-pw");
    String pwNew = request.getParameter("new-pw");
    String regex=validateAll(pwOld,pwNew)
    if (regex.equals("true")){
        Connection connection = null;
        HttpSession session_profile = request.getSession(false);
        String userIDX = (session_profile != null) ? (String) session_profile.getAttribute("idx") : null;
        try {
            Class.forName("org.mariadb.jdbc.Driver");
            connection = DriverManager.getConnection("jdbc:mariadb://localhost:3306/web", "mannomi", "1234");
        } catch (Exception e) {
            e.printStackTrace();
        }
        String check = tryUpdate(connection,userIDX,pwOld,pwNew);
    }
    else{
        out.println("<script>alert('잘못된 입력입니다'); history.back();</script>");
    }
%>

<script>
    var check = "<%=check%>"
    if (check!=""){
        alert("잘못된 입력")
        history.back()
    }
    else{
        alert("정보가 변경되었습니다")
        location.href="./logoutAction.jsp";
    }
</script>
