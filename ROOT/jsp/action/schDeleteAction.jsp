<%@ page language= "java" contentType="text/html" pageEncoding="utf-8" %>
<%@ page import="java.sql.DriverManager" %>
<%@ page import="java.sql.Connection" %>
<%@ page import="java.sql.PreparedStatement" %>
<%@ page import="java.sql.SQLException" %>
<%@ page import="java.sql.ResultSet" %>
<%@ page import="java.sql.*, java.util.*" %>
<%@ page import=" java.util.regex.Pattern"%>
<%@ page import=" java.util.regex.Matcher"%>
<%! 
public String tryDelete(Connection connection, String user_idx , String content, String day, String schedule_time ) {
    String error="false";
    try{
        String deleteSQL = "DELETE FROM Schedule WHERE user_idx  = ? AND content = ? AND day = ? AND schedule_time = ?";
        PreparedStatement stmt = connection.prepareStatement(deleteSQL);
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

<%! 
public String validateAll(String day,String time,String content) {
    final Pattern regex_day = Pattern.compile("^\\d{4}-\\d{2}-\\d{2}$");
    final Pattern regex_time = Pattern.compile("^\\d{2}:\\d{2}$");
    final Pattern regex_content = Pattern.compile("^.{0,255}$");
    if (!regex_day.matcher(day).matches()) {
        return "날짜 오류";
    }
    if (!regex_time.matcher(time).matches()) {
        return "시간 오류";
    }
    if (!regex_content.matcher(content).matches()) {
        return "내용 오류";
    }
    return "true";
}
%>

<%
    request.setCharacterEncoding("UTF-8");
    HttpSession session_detail = request.getSession(false);
    String userIDX = (session_detail != null) ? (String) session_detail.getAttribute("idx") : null;
    if (userIDX==null){
      out.println("<script>alert('세션 오류'); location.href='../action/logoutAction.jsp';</script>");
      return;
    }
    String day = request.getParameter("day");
    String time = request.getParameter("Time");
    String content = request.getParameter("Text");
    String watchState = request.getParameter("watchState");
    String regexText=validateAll(day,time,content);
    if (!regexText.equals("true")){
        out.println("<script>alert('" + regexText + " 오류'); history.back();</script>");
        return;
    }
    Connection connection = null;
    try {
        Class.forName("org.mariadb.jdbc.Driver");
        connection = DriverManager.getConnection("jdbc:mariadb://localhost:3306/web", "mannomi", "1234");
    } catch (Exception e) {
        e.printStackTrace();
    }
    String deleteError=tryDelete(connection,userIDX,content, day,time);
%>

<script>
    var errorMessage="<%=deleteError%>"
    var watchState="<%=watchState%>"
    var day= "<%=day%>"
    if (errorMessage=="false"){
        alert("삭제되었습니다")
        location.href="../page/detail_page.jsp?day="+day+"&watchState="+watchState
    }
    else{
        alert("잘못된 접근 입니다")
        window.history.back()
    }
</script>