<%@ page language= "java" contentType="text/html" pageEncoding="utf-8" %>
<%@ page import="java.sql.DriverManager" %>
<%@ page import="java.sql.Connection" %>
<%@ page import="java.sql.PreparedStatement" %>
<%@ page import="java.sql.SQLException" %>
<%@ page import="java.sql.ResultSet" %>

<%!
public String tryUpdate(Connection connection,String userIDX,String newTime,String newText, String oldTime, String oldText,String date) {
    String userSet = "";
    try {
        // 사용자 데이터 삽입 시도
        String getSelectSQL =   "UPDATE Schedule "+
                                "SET content = ?, schedule_time = ?, day = ? "+
                                "WHERE user_idx = ? AND content = ? AND schedule_time = ?";
        PreparedStatement stmt = connection.prepareStatement(getSelectSQL);
        stmt.setString(1,newText);
        stmt.setString(2,newTime);
        stmt.setString(3,date);
        stmt.setString(4,userIDX);
        stmt.setString(5,oldText);
        stmt.setString(6,oldTime);
        stmt.executeUpdate();
    } 
    catch (SQLException e) {
        userSet = e.getMessage();
    }
    return userSet;
}
public String validateAll(String day,String timeNew,String textNew , String timeOld , String textOld) {
    final Pattern regex_day = Pattern.compile("^\d{4}-\d{2}-\d{2}$");
    final Pattern regex_time = Pattern.compile("^\d{2}:\d{2}:\d{2}$");
    final Pattern regex_content = Pattern.compile("^.{0,255}$");
    if (!regex_day.matcher(day).matches()) {
        return "날짜 오류";
    }
    if (!regex_time.matcher(timeNew).matches()) {
        return "현재 시간 오류";
    }
    if (!regex_content.matcher(textNew).matches()) {
        return "현재 내용 오류";
    }
    if (!regex_time.matcher(timeOld).matches()) {
        return "이전 시간 오류";
    }
    if (!regex_content.matcher(textOld).matches()) {
        return "이전 내용 오류";
    }
    return "true";
}
%>

<%
    request.setCharacterEncoding("utf-8");
    String newTime = request.getParameter("newTime");
    String newText = request.getParameter("newText");
    String oldTime = request.getParameter("oldTime");
    String oldText = request.getParameter("oldText");
    String date = request.getParameter("date");
    String watchState = request.getParameter("watchState");
    String regexText=validateAll(day,time,content);
    if (regexText.equals("true")){
        Connection connection = null;
        HttpSession session_profile = request.getSession(false);
        String userIDX = (session_profile != null) ? (String) session_profile.getAttribute("idx") : null;
        try {
            Class.forName("org.mariadb.jdbc.Driver");
            connection = DriverManager.getConnection("jdbc:mariadb://localhost:3306/web", "mannomi", "1234");
        } catch (Exception e) {
            e.printStackTrace();
        }
        String check = tryUpdate(connection,userIDX,newTime,newText,oldTime,oldText,date);
        }
    else{
        out.println("<script>alert(<%=regexText%> 오류); history.back();</script>");
    }
%>

<script>
    var check = "<%=check%>"
    var date = "<%=date%>"
    var watchState = "<%=watchState%>"
    
    if (check!=""){
        alert("잘못된 입력")
        history.back()
    }
    else{
        alert("정보가 변경되었습니다")
        location.href="../page/detail_page.jsp?day="+date+"&watchState="+watchState;
    }
</script>
