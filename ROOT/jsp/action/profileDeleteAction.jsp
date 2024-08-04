<%@ page language= "java" contentType="text/html" pageEncoding="utf-8" %>
<%@ page import="java.sql.DriverManager" %>
<%@ page import="java.sql.Connection" %>
<%@ page import="java.sql.PreparedStatement" %>
<%@ page import="java.sql.SQLException" %>

<%!
public String tryDelete(Connection connection,String userIDX) {
    String user = "";
    try {
        // 사용자 데이터 삽입 시도
        String deleteSQL = "DELETE FROM User WHERE idx  = ?";
        PreparedStatement stmt = connection.prepareStatement(deleteSQL);
        stmt.setString(1,userIDX);
        stmt.executeUpdate();
    } 
    catch (SQLException e) {
        user = e.getMessage();
    }
    return user;
}
%>


<%
    request.setCharacterEncoding("utf-8");
    Connection connection = null;
    HttpSession session_profile = request.getSession(false);
    String userIDX = (session_profile != null) ? (String) session_profile.getAttribute("idx") : null;
    try {
        Class.forName("org.mariadb.jdbc.Driver");
        connection = DriverManager.getConnection("jdbc:mariadb://localhost:3306/web", "mannomi", "1234");
    } catch (Exception e) {
        e.printStackTrace();
    }
    String check = tryDelete(connection,userIDX);
%>

<script>
    var check = "<%=check%>"
    if (check!=""){
        alert("잘못된 경로")
        history.back()
    }
    else{
        alert("계정이 삭제되었습니다")
        location.href="./logoutAction.jsp";
    }
</script>
