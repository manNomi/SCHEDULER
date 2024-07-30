<%@ page language= "java" contentType="text/html" pageEncoding="utf-8" %>
<%@ page import="java.sql.DriverManager" %>
<%@ page import="java.sql.Connection" %>
<%@ page import="java.sql.PreparedStatement" %>
<%@ page import="java.sql.SQLException" %>
<%@ page import="java.sql.ResultSet" %>
<%@ page import="java.sql.*, java.util.*" %>
<%! 
public String tryInsert(Connection connection, String user_idx , String content, String day, String schedule_time ) {
    String error="false";
    try{
        String insertSQL = "INSERT INTO Schedule (user_idx, content, day, schedule_time) VALUES (?, ?, ?, ?)";
        PreparedStatement stmt = connection.prepareStatement(insertSQL);
        stmt.setString(1, user_idx);
        stmt.setString(2, content);
        stmt.setString(3, day);
        stmt.setString(4, schedule_time);
        stmt.executeUpdate();
    }
    catch(SQLException e){
        error=e.getMessage();
    }
    return error;
}
%>

<%
    request.setCharacterEncoding("utf-8");
    HttpSession session_detail = request.getSession(false);
    String userIDX = (session_detail != null) ? (String) session_detail.getAttribute("idx") : null;
    String day = request.getParameter("day");
    String time = request.getParameter("time");
    String content = request.getParameter("content");
    Connection connection = null;
    try {
        Class.forName("org.mariadb.jdbc.Driver");
        connection = DriverManager.getConnection("jdbc:mariadb://localhost:3306/web", "mannomi", "1234");
    } catch (Exception e) {
        e.printStackTrace();
    }
    
    String insertError=tryInsert(connection,userIDX,content, day,time);
%>

<script>
    var errorMessage="<%=insertError%>"
    var day= "<%=day%>"
    if (errorMessage=="false"){
        alert("추가되었습니다")
        location.href="../page/detail_page.jsp?day="+day
    }
    else{
        var text =errorMessage.split("key")[1].trim()
        alert(text+`가 중복입니다`)
        window.history.back()
    }
</script>