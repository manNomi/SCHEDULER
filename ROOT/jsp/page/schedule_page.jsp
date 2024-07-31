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
<%@ page import="java.time.LocalDate, java.time.YearMonth" %>


<%! 
public String tryGetDate(Connection connection, String userIDX , String date, String position) {
    String year = date.split("-")[0];
    String month = date.split("-")[1];
    YearMonth yearMonth = YearMonth.of(Integer.parseInt(year), Integer.parseInt(month));
    String startDate = year + "-" + month + "-01";
    String endDate = yearMonth.atEndOfMonth().toString();
    String countDate="";
      try {
        String meSQL="SELECT day "+
              "FROM Schedule "+
              "WHERE user_idx = ? "+
              "AND day BETWEEN ? AND ? " +
              "ORDER BY day ASC;";
        PreparedStatement post = connection.prepareStatement(meSQL);
        post.setString(1,userIDX);
        post.setString(2,startDate);
        post.setString(3,endDate);
        ResultSet result = post.executeQuery();
        countDate+="[본인]";
        while (result.next()) {
            countDate =countDate+ result.getString("day").split("-")[2]+"-";
          }
        if ("팀장".equals(position)){
        String readerSQL = "SELECT day " +
                            "FROM Schedule s " +
                            "JOIN User u ON s.user_idx = u.idx " +
                            "WHERE u.team_name = ( " +
                            "    SELECT team_name " +
                            "    FROM User " +
                            "    WHERE idx = ? " +
                            ") " +
                            "AND s.day BETWEEN ? AND ? " +
                            "ORDER BY s.day ASC;";
          PreparedStatement postTeam = connection.prepareStatement(readerSQL);
          postTeam.setString(1,userIDX);
          postTeam.setString(2,startDate);
          postTeam.setString(3,endDate);
          ResultSet resultTeam = postTeam.executeQuery();
          countDate+="_[전체]";
          while (resultTeam.next()) {
              countDate = countDate + resultTeam.getString("day").split("-")[2] + "-";
            }
        }
      }
    catch (SQLException e) {
      countDate = e.getMessage();
    }
    return countDate;
}
%>

<%
    request.setCharacterEncoding("utf-8");
    Connection connection = null;
    HttpSession session_schedule = request.getSession(false);
    String userIDX = (session_schedule != null) ? (String) session_schedule.getAttribute("idx") : null;
    String color = (session_schedule != null) ? (String) session_schedule.getAttribute("color") : null;
    String firstLogin = (session_schedule != null) ? (String) session_schedule.getAttribute("login") : null;
    String position="";
    String date = request.getParameter("day");
    String countDateALL="";
     Class.forName("org.mariadb.jdbc.Driver");
    connection = DriverManager.getConnection("jdbc:mariadb://localhost:3306/web", "mannomi", "1234");
    try {
      if ("T".equals(firstLogin)){
          String getSetSQL = "UPDATE User SET first_login = 'F' WHERE idx = ? ";
          PreparedStatement stmt = connection.prepareStatement(getSetSQL);
          session.setAttribute("login", "F");
          stmt.setString(1,userIDX);
          stmt.executeUpdate();
          stmt.close(); 
      }
    }
    catch (SQLException e) {
        e.printStackTrace();
    }
    try {
      String positionSQL = "SELECT position FROM User WHERE idx = ? ";
      PreparedStatement post = connection.prepareStatement(positionSQL);
      post.setString(1,userIDX);
      ResultSet result = post.executeQuery();
      post.close();
      if (result.next()) {
          position = result.getString("position");
        }
      }
    catch (SQLException e) {
      e.printStackTrace();
    }
    countDateALL=tryGetDate(connection,userIDX,date,position);
%>

<!DOCTYPE html>
<html lang="kr">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>스케줄러</title>
    <link rel="stylesheet" type="text/css" href="../../reset/reset.css" />
    <link rel="stylesheet" type="text/css" href="../../rootCSS/rootCSS.css">
    <link rel="stylesheet" type="text/css" href="../../component/button/button.css">
    <link rel="stylesheet" type="text/css" href="../../css/schedule_page.css" />
  </head>
  <body>
    <main id="modal_guide">
      <header id="guide_btn_lsit">
        <button
          id="theme_red_btn"
          class="btn_red"
            onclick="opacityGuideDone()"></button>
        <button class="btn_gray"></button>
        <button class="btn_gray"></button>
      </header>
      <article id="guide_container">
        <div id="guide_box">
          <div class="guide_line">
            <button class="btn_red"></button>
            <p>로그인으로 돌아가기</p>
          </div>
          <div class="guide_line">
            <button class="btn_yellow"></button>
            <p>버튼 목록</p>
          </div>
          <div class="guide_line">
            <button class="btn_green"></button>
            <p>달력키우기 / 옮기기</p>
          </div>
        </div>
        <button id="guide_check_btn" onclick="opacityGuideDone()">확인</button>
      </article>
    </main>

    <main id="page_container">
      <header id="btn_list">
        <button id="red_btn" class="btn_red" onclick="exitBtnEvent()"></button>
        <button id="yellow_btn" class="btn_yellow" onclick="menuBtnEvent()"></button>
        <button id="green_btn" class="btn_green" onclick="reSizeCalanderEvent()"></button>
        <nav id="speech_icon">
          <div id="speech_menu_container">
            <button id="watch_all_box" onclick="whatchAllBtnEvent(event)" style="display:none;">
              <img
                src="../../image/schedule/full_battery.png"
                class="speech_menu_icon" />
              <div class="speech_menu_text">전체 보기</div>
            </button>
            <button id="watch_profile_box" onclick="setProfileMoveEvent()">
              <img
                src="../../image/schedule/profile.png"
                class="speech_menu_icon" />
              <div class="speech_menu_text">프로필 확인</div>
            </button>
            <button id="set_theme_box" onclick="colorThemeMove()">
              <div id="theme_btn"></div>
              <div class="speech_menu_text">테마색 설정</div>
            </button>
          </div>
        </nav>
      </header>
      <div>
        <input id="choose_date" type="date" onchange="setPresentDate(event)" />
      </div>
      <table id="month"></table>
    <script src="../../js/schedule.js"></script>
  </body>
</html>

<script>
  var loginCheck= "<%=firstLogin%>";
  var colocCode="<%=color%>"
  stateColor="#"+colocCode
  colorSet();
  if (loginCheck=="T"){
    var modal = document.getElementById("modal_guide");
    makeOpacityBox(modal,0.5);
  }
  var position="<%=position%>"
  console.log(position)
  if (position=="팀장"){
    document.getElementById("watch_all_box").style.display="flex"
  }
  var day= "<%=date%>"
  var countDate="<%=countDateALL%>"
  getData(countDate)
  makeCalander(day)
</script>