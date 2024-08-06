<%@ page language= "java" contentType="text/html" pageEncoding="utf-8" %>
<%@ page import="java.sql.DriverManager" %>
<%@ page import="java.sql.Connection" %>
<%@ page import="java.sql.PreparedStatement" %>
<%@ page import="java.sql.SQLException" %>
<%@ page import="java.sql.ResultSet" %>
<%@ page import="java.time.LocalDate, java.time.YearMonth" %>
<%@ page import=" java.util.regex.Pattern"%>
<%@ page import=" java.util.regex.Matcher"%>
<%@ page import="java.util.ArrayList" %>
<%@ page import="java.util.List" %>
<%-- 데이터 가져오기  --%>
<%! 
public List<String> tryGetDate(Connection connection, String userIDX , String date, String position,String state) {
    String year = date.split("-")[0];
    String month = date.split("-")[1];
    YearMonth yearMonth = YearMonth.of(Integer.parseInt(year), Integer.parseInt(month));
    String startDate = yearMonth.atDay(1).toString();
    String endDate = yearMonth.atEndOfMonth().toString();
    List<String> dayList = new ArrayList<>(); 
    String sql="";
    if (state.equals("TEAM") && position.equals("팀장")){
              sql="SELECT day , COUNT(*) " +
              "FROM Schedule s " +
              "JOIN User u ON s.user_idx = u.idx " +
              "WHERE u.team_name = ( " +
              "    SELECT team_name " +
              "    FROM User " +
              "    WHERE idx = ? " +
              ") " +
              "AND s.day BETWEEN ? AND ? " +
              "GROUP BY day "+
              "ORDER BY s.day ASC;";
    }
    else if (state.equals("USER")){
        sql="SELECT day , COUNT(*) "+
              "FROM Schedule "+
              "WHERE user_idx = ? "+
              "AND day BETWEEN ? AND ? " +
              "GROUP BY day "+
              "ORDER BY day ASC;";
    }
      try {
        PreparedStatement post = connection.prepareStatement(sql);
        post.setString(1,userIDX);
        post.setString(2,startDate);
        post.setString(3,endDate);
        ResultSet result = post.executeQuery();
        while (result.next()) {
            String day ="'"+result.getString("day")+"'";
            String dayCount = "'"+result.getString("COUNT(*)")+"'";
            dayList.add("["+day+","+dayCount+"]");
          }
      }
    catch (SQLException e) {
      dayList.add(e.getMessage());
    }
    return dayList;
}
%>

<%-- 유저 데이터 가져오는 클래스 --%>
<%!
public String validateAll(String day,String watchState) {
    final Pattern regex_day = Pattern.compile("^\\d{4}-\\d{2}-\\d{2}$");
    if (!regex_day.matcher(day).matches()) {
        return "날짜 오류";
    }
    if (watchState.equals("USER") || watchState.equals("TEAM")){}
    else{
      return "상태 오류";
    }
    return "true";
}
%>

<%
    request.setCharacterEncoding("utf-8");
    Connection connection = null;
    HttpSession session_schedule = request.getSession(false);
    String userIDX = (session_schedule != null) ? (String) session_schedule.getAttribute("idx") : null;
    if (userIDX==null){
      out.println("<script>alert('세션 오류'); location.href='../action/logoutAction.jsp';</script>");
      return;
    }
    String position = (session_schedule != null) ? (String) session_schedule.getAttribute("position") : null;
    String colorCode = (session_schedule != null) ? (String) session_schedule.getAttribute("color") : null;
    String date = request.getParameter("day");
    String watchState = request.getParameter("watchState");
    String firstLogin ="";
    List<String> countDateALL = new ArrayList<>(); 

    // 페이지에 파라미터 없이 접속시 기본은 USER 
    if (watchState==null){
      watchState="USER";
    }
    // 페이지에 파라미터 없이 접속시 기본 날짜 설정 
    if(date==null){
      java.util.Calendar now = java.util.Calendar.getInstance();
      int year = now.get(java.util.Calendar.YEAR);
      int month = now.get(java.util.Calendar.MONTH) + 1; // Month is 0-based in Calendar
      int day = now.get(java.util.Calendar.DAY_OF_MONTH);
      String monthStr = String.format("%02d", month);
      String dayStr = String.format("%02d", day);
      date = year + "-" + monthStr + "-" + dayStr;
    }
    // 이상하게 입력시 뒤로 가도록
    String regexText=validateAll(date,watchState);
    if (!regexText.equals("true")){
        out.println("<script>alert('" + regexText + " 오류'); history.back();</script>");
        return;
    }   
    Class.forName("org.mariadb.jdbc.Driver");
    connection = DriverManager.getConnection("jdbc:mariadb://localhost:3306/web", "mannomi", "1234");
    countDateALL=tryGetDate(connection,userIDX,date,position,watchState);
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
    <script src="../../js/schedule_page.js"></script>
  </body>
</html>

<script>
  var userIDX="<%=userIDX%>"
  setCookie(userIDX)
  var colocCode="<%=colorCode%>"
  setColor(colocCode);

  var position="<%=position%>"
  if (position=="팀장"){
    document.getElementById("watch_all_box").style.display="flex"
  }

  var watchState= "<%=watchState%>";
  var countDate=<%=countDateALL%>
  var day= "<%=date%>"
  initwatchAllBtn(watchState);
  makeCalander(day,countDate)
</script>