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
<%-- <%@ page import="java.lang.System.out"%> --%>

<%! 
  public class User {
        String id;
        String pw;
        String pw_check;
        String name;    
        String phone;
        String team;
        String userClass;
        String themeColor;
        public User(HttpServletRequest request) {
            this.id = request.getParameter("id");
            this.pw = request.getParameter("pw");
            this.pw_check = request.getParameter("pw-check");
            this.name = request.getParameter("name");    
            this.phone = request.getParameter("phone");
            this.team = request.getParameter("team");
            this.userClass = request.getParameter("position");
        }
    }

public String tryJoin(Connection connection, User user ) {
    String error="false";
    try{
        String joinSQL = "INSERT INTO User (id, pw, name, phone, team_name , position , theme_color) VALUES (?, ?, ?, ?, ?, ?, ?)";
        PreparedStatement stmt = connection.prepareStatement(joinSQL);
        stmt.setString(1, user.id);
        stmt.setString(2, user.pw);
        stmt.setString(3, user.name);
        stmt.setString(4, user.phone);
        stmt.setString(5, user.team);
        stmt.setString(6, user.userClass);
        stmt.setString(7, "ffcceb");
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
    User user = new User(request);
    Connection connection = null;
    try {
        Class.forName("org.mariadb.jdbc.Driver");
        connection = DriverManager.getConnection("jdbc:mariadb://localhost:3306/web", "mannomi", "1234");
    } catch (Exception e) {
        e.printStackTrace();
    }
    String joinError=tryJoin(connection,user);
%>

<script>
    var errorMessage="<%=joinError%>"
    if (errorMessage=="false"){
        alert("회원가입 성공")
        location.href="../page/index.jsp"
    }
    else{
        var text =errorMessage.split("key")[1].trim()
        alert(text+`가 중복입니다`)
        window.history.back()
    }
</script>