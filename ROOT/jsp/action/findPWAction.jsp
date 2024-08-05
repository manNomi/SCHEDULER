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
public String tryGetPW(Connection connection,String id,String phone) {
    String userPW = "";
    try {
        // 사용자 데이터 삽입 시도
        String getSelectSQL = "SELECT pw FROM User WHERE id = ? AND phone = ?";
        PreparedStatement stmt = connection.prepareStatement(getSelectSQL);
        stmt.setString(1,id);
        stmt.setString(2,phone);
        ResultSet result = stmt.executeQuery();
        if(result.next()){
            userPW=result.getString("pw");
        }

    } 
    catch (SQLException e) {
        userPW = "";
    }
    return userPW;
}
%>

<%!
public String validateAll(String id,String phone) {
    final Pattern regex_id = Pattern.compile("^[0-9]{6,20}$");
    final Pattern regex_phone = Pattern.compile("^01([0|1|6|7|8|9]?)([0-9]{3,4})([0-9]{4})$");
    if (!regex_id.matcher(id).matches()) {
        return "아이디 오류";
    }
    if (!regex_phone.matcher(phone).matches()) {
        return "전화번호 오류";
    }
    return "true";
}
%>

<%
    request.setCharacterEncoding("utf-8");
    String id = request.getParameter("id");
    String phone = request.getParameter("phone");
    String regexText=validateAll(id,phone);
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
    String userPW = tryGetPW(connection,id,phone);
%>

<script>
    var userPW="<%=userPW%>"
    if (userPW!=""){
        alert("비밀번호 : "+userPW)
        location.href="../page/index.jsp"
    }
    else{
        alert("찾으시려는 비밀번호가 없습니다")
        window.history.back()
    }
    
</script>
