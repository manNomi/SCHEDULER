<%@ page language= "java" contentType="text/html" pageEncoding="utf-8" %>
<%@ page import="java.sql.DriverManager" %>
<%@ page import="java.sql.Connection" %>
<%@ page import="java.sql.PreparedStatement" %>
<%@ page import="java.sql.SQLException" %>
<%@ page import="java.sql.ResultSet" %>

<%
    request.setCharacterEncoding("utf-8");
    Connection connection = null;
    HttpSession session_theme = request.getSession(false);
    String userIDX = (session_theme != null) ? (String) session_theme.getAttribute("idx") : null;
    if (userIDX==null){
      out.println("<script>alert('세션 오류'); location.href='../action/logoutAction.jsp';</script>");
       return;
    }
    String position = (session_theme != null) ? (String) session_theme.getAttribute("position") : null;
    String colorCode = (session_theme != null) ? (String) session_theme.getAttribute("color") : null;
    try {
        Class.forName("org.mariadb.jdbc.Driver");
        connection = DriverManager.getConnection("jdbc:mariadb://localhost:3306/web", "mannomi", "1234");
    } catch (Exception e) {
        e.printStackTrace();
    }
%>

<!DOCTYPE html>
<html lang="kr">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="stylesheet" type="text/css" href="../../reset/reset.css" />
    <link rel="stylesheet" type="text/css" href="../../rootCSS/rootCSS.css" />
    <link
      rel="stylesheet"
      type="text/css"
      href="../../component/button/button.css" />
    <link rel="stylesheet" type="text/css" href="../../css/theme_page.css" />
    <title>스케줄러</title>
  </head>
  <body>
    <main id="theme_container">
      <header id="btn_lsit">
        <button
          id="theme_red_btn"
          class="btn_red"
          onclick="exitBtnEvent()"></button>
        <button class="btn_gray"></button>
        <button class="btn_gray"></button>
      </header>
      <article id="choose_container">
        <div id="choose_box">
          <input type="color" id="color_choose_input" />
          <p>색상 선택</p>
        </div>
        <button id="color_check_btn" onclick="checkBtnEvent()">확인</button>
      </article>
    </main>
    <script src="../../js/theme_page.js"></script>
  </body>
</html>

<script>
  var colorCode="<%=colorCode%>"
  setColor(colorCode);
</script>