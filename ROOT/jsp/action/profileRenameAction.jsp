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
    String pwOld = request.getParameter("old-pw");
    String pwNew = request.getParameter("new-pw");
    String check = tryUpdate(connection,userIDX,pwOld,pwNew);
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
