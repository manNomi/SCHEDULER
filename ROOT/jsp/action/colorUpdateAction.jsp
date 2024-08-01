<%@ page language= "java" contentType="text/html" pageEncoding="utf-8" %>
<%@ page import="java.sql.DriverManager" %>
<%@ page import="java.sql.Connection" %>
<%@ page import="java.sql.PreparedStatement" %>
<%@ page import="java.sql.SQLException" %>
<%@ page import="java.sql.ResultSet" %>

<%!
public String tryUpdate(Connection connection,String userIDX,String colorCode) {
    String userSet = "";
    try {
        // 사용자 데이터 삽입 시도
        String getUpdateSQL =   "UPDATE User "+
                                "SET theme_color = ?"+
                                "WHERE idx = ?";
        PreparedStatement stmt = connection.prepareStatement(getUpdateSQL);
        stmt.setString(1,colorCode);
        stmt.setString(2,userIDX);
        stmt.executeUpdate();
        stmt.close();
    } 
    catch (SQLException e) {
        userSet = e.getMessage();
    }
    return userSet;
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
    String colorCode = request.getParameter("colorCode");
    String check = tryUpdate(connection,userIDX,colorCode);
%>

<script>
    var check = "<%=check%>"
console.log(check)
    if (check==""){
        alert("정보가 변경되었습니다")
        location.href="../page/schedule_page.jsp";
    }
    else{
        alert("잘못된 입력")
        history.back()
    }
</script>
