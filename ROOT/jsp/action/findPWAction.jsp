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

<%
    request.setCharacterEncoding("utf-8");
    String id = request.getParameter("id");
    String phone = request.getParameter("phone");
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
