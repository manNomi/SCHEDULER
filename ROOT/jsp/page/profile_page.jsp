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
    String id;
    String pw;
    String name;
    String phone;
    String position;
    String themeColor;
    String teamName;
    public User(String id, String pw, String name, String phone, String position, String themeColor, String teamName) {
        this.id = id;
        this.pw = pw;
        this.name = name;
        this.phone = phone;
        this.position = position;
        this.themeColor = themeColor;
        this.teamName = teamName;
    }
    // Getters for all fields
    public String getId() { return id; }
    public String getPw() { return pw; }
    public String getName() { return name; }
    public String getPhone() { return phone; }
    public String getPosition() { return position; }
    public String getThemeColor() { return themeColor; }
    public String getTeamName() { return teamName; }
}

public User tryGetUserData(Connection connection, String userIDX) {
    String id = "";
    String pw = "";
    String name = "";
    String phone = "";
    String position = "";
    String themeColor = "";
    String teamName = "";

    try {
        String positionSQL = "SELECT id, pw, name, phone, position, theme_color, team_name FROM User WHERE idx = ?";
        PreparedStatement post = connection.prepareStatement(positionSQL);
        post.setString(1, userIDX);
        ResultSet result = post.executeQuery();
        if (result.next()) {
            id = result.getString("id");
            pw = result.getString("pw");
            name = result.getString("name");
            phone = result.getString("phone");
            position = result.getString("position");
            themeColor = result.getString("theme_color");
            teamName = result.getString("team_name");
        }

        post.close();
    } catch (SQLException e) {
        e.printStackTrace();
    }
    return new User(id, pw, name, phone, position, themeColor, teamName);
}
%>

<%
    request.setCharacterEncoding("utf-8");
    Connection connection = null;
    HttpSession session_detail = request.getSession(false);
    String userIDX = (session_detail != null) ? (String) session_detail.getAttribute("idx") : null;
    String date = request.getParameter("day");
    String watchState = request.getParameter("watchState");
    String checkSession="";
    String id = "";
    String pw = "";
    String name = "";
    String phone = "";
    String position = "";
    String themeColor = "";
    String teamName = "";

    try {
        Class.forName("org.mariadb.jdbc.Driver");
        connection = DriverManager.getConnection("jdbc:mariadb://localhost:3306/web", "mannomi", "1234");
    } catch (Exception e) {
        e.printStackTrace();
    }
    User user = tryGetUserData(connection, userIDX);
    id = user.getId();
    pw = user.getPw();
    name = user.getName();
    phone = user.getPhone();
    position = user.getPosition();
    themeColor = user.getThemeColor();
    teamName = user.getTeamName();
%>

<!DOCTYPE html>
<html lang="kr">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>스케줄러</title>
    <link rel="stylesheet" type="text/css" href="../../reset/reset.css">
    <link rel="stylesheet" type="text/css" href="../../rootCSS/rootCSS.css">
    <link rel="stylesheet" type="text/css" href="../../component/placeHorder/placeHorder.css">
    <link rel="stylesheet" type="text/css" href="../../component/button/button.css">
    <link rel="stylesheet" type="text/css" href="../../css/profile_page.css" />
  </head>
  <body>
    <div id="profile_container">
      <div id="profile_btn_list" class="btn_list">
        <button id="red_btn" onclick="exitEvent()"></button>
        <button id="yellow_btn" onclick="reNameEvent() "></button>
        <button id="green_btn" onclick="deleteOpenEvent()"></button>
      </div>
      <div id="profile_content_container">
        <div id="back_container">
          <div id="content_back">
              <img id="profile_img_back" src="../../image/profile/profile.png">
              <div id="profile_text_back">
                <div id="profile_text_box"></div>
                <div id="profile_rename_container">
                  <button id="rename_btn" class="profile_btn" onclick="renameBtnEvent()">수정</button>
                  <button id="cancle_btn" class="profile_btn" onclick="reNameEvent()">취소</button>
                </div>
              </div>
          </div>
      </div>

        <div id="front_container">
            <div id="content_front">
                <div id="front_text">
                    <div id="front_box">
                        <p id="logo_text">Satge Us</p>
                        <div id="user_text_list">
                            <p id="user_name">한만욱</p>
                            <p>&nbsp|&nbsp</p>
                            <p id="team_name">프론트엔드 부서<br>팀장</p>
                        </div>
                    </div>
                </div>
                <img src="../../image/profile/logo.png" id="front_img">
            </img>
            </div>
      </div>
    </div>

    <main id="delete_container">
      <nav id="delete_btn_list" class="btn_list">
        <button id="red_btn" class="btn_red" onclick="exitBtnEvent()"></button>
        <button class="btn_gray"></button>
        <button class="btn_gray"></button>
      </nav>
      <article id="delete_content">
        <p id="delete_text">삭제하시겠습니까?</p>
        <div>
          <button class="profile_btn" onclick="deleteEvent()">삭제</button>
          <button class="profile_btn" onclick="deleteDoneEvnet()">취소</button>
        </div>
      </article>
  </main>
    <script src="../../component/placeHorder/placeHorder.js"></script>
    <script src="../../js/profile_page.js"></script>
  </body>
</html>

<script>
    var id = "<%=id%>"
    var pw = "<%=pw%>"
    var name = "<%=name%>"
    var phone = "<%=phone%>"
    var position = "<%=position%>"
    var themeColor = "<%=themeColor%>"
    var teamName = "<%=teamName%>"
    initText(id,name,phone,position,teamName)
    stateColor="#"+themeColor
    colorSet();

</script>
