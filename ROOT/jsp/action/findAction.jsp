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
public String tryGetSelect(Connection connection) {
    String team = "";
    try {
        // 사용자 데이터 삽입 시도
        String getSelectSQL = "SELECT name FROM Team";
        PreparedStatement stmt = connection.prepareStatement(findSQL);
        ResultSet result = stmt.executeQuery();
        while (result.next()) {
                team +=result.getString("name")+"-";
            }
    } 
    catch (SQLException e) {
        team = "";
    }
    return team;
}
%>

<%
    request.setCharacterEncoding("utf-8");
    Connection connection = null;
    try {
        Class.forName("org.mariadb.jdbc.Driver");
        connection = DriverManager.getConnection("jdbc:mariadb://localhost:3306/instargram_web", "mannomi", "1234");
    } catch (Exception e) {
        e.printStackTrace();
    }
    String team = tryLogin(connection,request, loginId, loginPw);
%>

<script>
    var teamList="<%=team%>"
    location.href="../"
</script>
