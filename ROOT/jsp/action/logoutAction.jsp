<%@ page language= "java" contentType="text/html" pageEncoding="utf-8" %>
<%@ page import="java.sql.DriverManager" %>
<%@ page import="java.sql.Connection" %>
<%@ page import="java.sql.PreparedStatement" %>
<%@ page import="java.sql.SQLException" %>
<%@ page import="java.sql.ResultSet" %>

<%
    request.setCharacterEncoding("utf-8");
    HttpSession sessionLogout = request.getSession(false);
    if (sessionLogout != null) {
        sessionLogout.invalidate(); // 세션 무효화
    }
%>
<script>
    location.href="../page/index.jsp";
</script>
