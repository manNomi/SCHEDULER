<%@ page language= "java" contentType="text/html" pageEncoding="utf-8" %>

<%-- 데이터 베이스 탐색 라이브러리 -> 커넥터를 찾는다 --%>
<%@ page import="java.sql.DriverManager" %>
<%-- 데이터 베이스 연결 lib --%>
<%@ page import="java.sql.Connection" %>
<%-- SQL 생성 및 전송 --%>
<%@ page import="java.sql.PreparedStatement" %>
<%@ page import="java.sql.SQLException" %>
<%-- 셀렉트 할때만 필요하다  --%>
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
    String userIDX = null;
    if (session_index != null) {
        userIDX = (String) session_index.getAttribute("idx");
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
  var loginCheck= <%=userIDX%>;
  if (loginCheck==null){
    alert("잘못된 접근입니다")
    history.back()
  }
  var colocCode="<%=colorCode%>"
  stateColor="#"+colocCode
  colorSet();
</script>