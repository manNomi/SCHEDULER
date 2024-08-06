<%@ page language= "java" contentType="text/html" pageEncoding="utf-8" %>
<%@ page import="java.sql.DriverManager" %>
<%@ page import="java.sql.Connection" %>
<%@ page import="java.sql.PreparedStatement" %>
<%@ page import="java.sql.SQLException" %>
<%@ page import="java.sql.ResultSet" %>

<%!
  public class User {
    String colorCode="";
        public User(String col) {
        this.colorCode = col;
    }
    String getColorCode() { return colorCode; }
}
  public User tryGetUserData(Connection connection,String userIDX) {
      String colorCode="";
      try {
        String positionSQL = "SELECT theme_color FROM User WHERE idx = ? ";
        PreparedStatement post = connection.prepareStatement(positionSQL);
        post.setString(1,userIDX);
        ResultSet result = post.executeQuery();
        if (result.next()) {
            colorCode = result.getString("theme_color");
          }
          post.close();
        }
      catch (SQLException e) {
        e.printStackTrace();
      }
      return new User(colorCode);
    }
%>

<%
    request.setCharacterEncoding("utf-8");
    Connection connection = null;
    HttpSession session_index = request.getSession(false);
    String userIDX = (session_index != null) ? (String) session_index.getAttribute("idx") : null;
    if (userIDX==null){
      out.println("<script>alert('세션 오류'); location.href='../action/logoutAction.jsp';</script>");
       return;
    }
    try {
        Class.forName("org.mariadb.jdbc.Driver");
        connection = DriverManager.getConnection("jdbc:mariadb://localhost:3306/web", "mannomi", "1234");
    } catch (Exception e) {
        e.printStackTrace();
    }
    User user = tryGetUserData(connection,userIDX);
    String colorCode=user.getColorCode();
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