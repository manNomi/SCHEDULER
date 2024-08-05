<%@ page language= "java" contentType="text/html" pageEncoding="utf-8" %>
<%@ page import="java.sql.DriverManager" %>
<%@ page import="java.sql.Connection" %>
<%@ page import="java.sql.PreparedStatement" %>
<%@ page import="java.sql.SQLException" %>
<%@ page import="java.sql.ResultSet" %>
<%@ page import=" java.util.regex.Pattern"%>
<%@ page import=" java.util.regex.Matcher"%>

<%!
public class User {
    String id;
    String pw;
    String name;
    String phone;
    String position;
    String colorCode;
    String teamName;
    public User(String id, String pw, String name, String phone, String position, String colorCode, String teamName) {
        this.id = id;
        this.pw = pw;
        this.name = name;
        this.phone = phone;
        this.position = position;
        this.colorCode = colorCode;
        this.teamName = teamName;
    }
    // Getters for all fields
    public String getId() { return id; }
    public String getPw() { return pw; }
    public String getName() { return name; }
    public String getPhone() { return phone; }
    public String getPosition() { return position; }
    public String getThemeColor() { return colorCode; }
    public String getTeamName() { return teamName; }
}

public User tryGetUserData(Connection connection, String userIDX) {
    String id = "";
    String pw = "";
    String name = "";
    String phone = "";
    String position = "";
    String colorCode = "";
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
            colorCode = result.getString("theme_color");
            teamName = result.getString("team_name");
        }
        post.close();
    } catch (SQLException e) {
        e.printStackTrace();
    }
    return new User(id, pw, name, phone, position, colorCode, teamName);
}
%>

<%
    request.setCharacterEncoding("utf-8");
    Connection connection = null;
    HttpSession session_detail = request.getSession(false);
    String userIDX = (session_detail != null) ? (String) session_detail.getAttribute("idx") : null;
    if (userIDX.equals(null)){
      out.println("<script>alert('세션 오류'); history.back();</script>");
       return;
    }
    String id = "";
    String pw = "";
    String name = "";
    String phone = "";
    String position = "";
    String colorCode = "";
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
    colorCode = user.getThemeColor();
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
        <button id="red_btn" class="btn_red" onclick="exitEvent()"></button>
        <button id="yellow_btn" class="btn_yellow" onclick="reNameEvent() "></button>
        <button id="green_btn" class="btn_green" onclick="deleteOpenEvent()"></button>
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
        <button id="red_btn" class="btn_red" onclick="deleteDoneEvent()"></button>
        <button class="btn_gray"></button>
        <button class="btn_gray"></button>
      </nav>
      <article id="delete_content">
        <p id="delete_text">삭제하시겠습니까?</p>
        <div>
          <button class="profile_btn" onclick="deleteEvent()">삭제</button>
          <button class="profile_btn" onclick="deleteDoneEvent()">취소</button>
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
  var colorCode = "<%=colorCode%>"
  var teamName = "<%=teamName%>"
  initText(id,name,phone,position,teamName)
  setColor(colorCode);
</script>
