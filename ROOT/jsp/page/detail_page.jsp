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

<%@ page import="java.util.ArrayList" %>
<%@ page import="java.util.List" %>

<%!
public class ScheduleResult {
    private List<String> contentList;
    private List<String> scheduleList;
    public ScheduleResult(List<String> contentList, List<String> scheduleList) {
        this.contentList = contentList;
        this.scheduleList = scheduleList;
    }
    public List<String> getContentList() { return contentList; }
    public List<String> getScheduleList() { return scheduleList; }
}

public ScheduleResult tryGetSchedule(Connection connection, String idx, String date) {
    List<String> contentList = new ArrayList<>();
    List<String> scheduleList = new ArrayList<>();
    try {
        String getSelectSQL = "SELECT content, schedule_time FROM Schedule WHERE user_idx = ? AND day = ?";
        PreparedStatement stmt = connection.prepareStatement(getSelectSQL);
        stmt.setString(1, idx);
        stmt.setString(2, date);
        ResultSet result = stmt.executeQuery();
        while (result.next()) {
            String content = result.getString("content");
            String time = result.getString("schedule_time");
            contentList.add(content);
            scheduleList.add(time);
        }
    } catch (SQLException e) {
        e.printStackTrace(); // 예외를 로그로 기록합니다.
    }
    return new ScheduleResult(contentList, scheduleList);
}
%>

<%
    request.setCharacterEncoding("utf-8");
    Connection connection = null;
    HttpSession session_detail = request.getSession(false);
    String userIDX = (session_detail != null) ? (String) session_detail.getAttribute("idx") : null;
    String color = (session_detail != null) ? (String) session_detail.getAttribute("color") : null;
    String date = request.getParameter("day");
    try {
        Class.forName("org.mariadb.jdbc.Driver");
        connection = DriverManager.getConnection("jdbc:mariadb://localhost:3306/web", "mannomi", "1234");
    } catch (Exception e) {
        e.printStackTrace();
    }
    ScheduleResult result = tryGetSchedule(connection, userIDX, date);
    List<String> contentList = result.getContentList();
    List<String> scheduleList = result.getScheduleList();
%>

<!DOCTYPE html>
<html lang="kr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" type="text/css" href="../../reset/reset.css">
    <link rel="stylesheet" type="text/css" href="../../rootCSS/rootCSS.css">

    <link rel="stylesheet" type="text/css" href="../../css/detail_page.css" />
    <link rel="stylesheet" type="text/css" href="../../component/button/button.css"/>
    <link rel="stylesheet" type="text/css" href="../../component/placeHorder/placeHorder.css"/>
    <title>스케줄러</title>
</head>
<body>
    <main id="detail_container">
        <nav id="detail_btn_list" class="detail_btn_list">
          <button id="red_btn" class="btn_red" onclick="exitBtnEvent()"></button>
          <button class="btn_gray"></button>
          <button class="btn_gray"></button>
        </nav>
        <nav id="date"></nav>
        <article id="insert_container">
          <div id="insert_box">
            <input type="time" id="time_input"/>
            <div id="placehorder">
              <input type="text" id="schedule_input" />
            </div>
          </div>
          <button id="insert_btn" class="img_btn" onclick="insertScheduleEvent()"></button>
        </article>
        <div id="shcedule_container">
          <div id="schedule_scroll"></div>
        </div>
      </main>
      <main id="modal_container">
        <nav id="modal_btn_list" class="detail_btn_list">
          <button id="red_btn" class="btn_red" onclick="modalDoneEvnet()"></button>
          <button class="btn_gray"></button>
          <button class="btn_gray"></button>
        </nav>
        <article id="modal_content">
          <p id="modal_text"></p>
          <div id="btn_box">
            <button id="event_btn" class="modal_btn" onclick="modalEvent(event)"></button>
            <button class="modal_btn" onclick="modalDoneEvnet()">취소</button>
          </div>
        </article>
    </main>

    </div>
    <script src="../../component/placeHorder/placeHorder.js"></script>
    <script src="../../js/detail_page.js"></script>
</body>
</html>

<script>
  var contentList = [
      <% for (int i = 0; i < contentList.size(); i++) { %>
          "<%= contentList.get(i)%>"<%= i < contentList.size() - 1 ? "," : "" %>
      <% } %>];
  var scheduleList = [
      <% for (int i = 0; i < scheduleList.size(); i++) { %>
          "<%= scheduleList.get(i) %>"<%= i < scheduleList.size() - 1 ? "," : "" %>
      <% } %>]
  var date ="<%=date%>"
  initTime(date)
  dateText=date
  var colocCode="<%=color%>"
  stateColor="#"+colocCode;
  setColor();
  makeInputScroll(contentList,scheduleList);
</script>