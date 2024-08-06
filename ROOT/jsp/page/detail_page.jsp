<%@ page language= "java" contentType="text/html" pageEncoding="utf-8" %>
<%@ page import="java.sql.DriverManager" %>
<%@ page import="java.sql.Connection" %>
<%@ page import="java.sql.PreparedStatement" %>
<%@ page import="java.sql.SQLException" %>
<%@ page import="java.sql.ResultSet" %>
<%@ page import="java.util.ArrayList" %>
<%@ page import="java.util.List" %>
<%@ page import=" java.util.regex.Pattern"%>
<%@ page import=" java.util.regex.Matcher"%>

<%-- 개인 데이터 가져오기 클래스 --%>
<%!
public class ScheduleResult {
    private List<String> contentList;
    private List<String> scheduleList;
    public ScheduleResult(List<String> contentList, List<String> scheduleList ) {
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
        String getSelectSQL = "SELECT content, schedule_time "+
                              "FROM Schedule "+
                              "WHERE user_idx = ? AND day = ? "+
                              "ORDER BY schedule_time";
        PreparedStatement stmt = connection.prepareStatement(getSelectSQL);
        stmt.setString(1, idx);
        stmt.setString(2, date);
        ResultSet result = stmt.executeQuery();
        while (result.next()) {
            String content = result.getString("content");
            String time = result.getString("schedule_time");
            contentList.add("'"+content+"'");
            scheduleList.add("'"+time+"'");
        }
    } catch (SQLException e) {
        e.printStackTrace(); // 예외를 로그로 기록합니다.
    }
    return new ScheduleResult(contentList, scheduleList);
}
%>

<%-- 팀 데이터 가져오기 클래스 --%>
<%!
public class TeamResult {
    private List<String> contentList;
    private List<String> scheduleList;
    private List<String> nameList;
    private List<String> userIDXList;
    public TeamResult(List<String> contentList, List<String> scheduleList, List<String> nameList, List<String> userIDXList) {
        this.contentList = contentList;
        this.scheduleList = scheduleList;
        this.nameList = nameList;
        this.userIDXList = userIDXList;
    }
    public List<String> getContentList() { return contentList; }
    public List<String> getScheduleList() { return scheduleList; }
    public List<String> getNameList() { return nameList; }
    public List<String> getuserIDXList() { return userIDXList; }
}

public TeamResult tryGetTeamSchedule(Connection connection, String idx, String date) {
    List<String> contentList = new ArrayList<>();
    List<String> scheduleList = new ArrayList<>();
    List<String> nameList = new ArrayList<>();
    List<String> userIDXList = new ArrayList<>();
    try {
      String getSelectSQL=  "SELECT content , schedule_time ,u.name , u.idx " +
                            "FROM Schedule s " +
                            "JOIN User u ON s.user_idx = u.idx " +
                            "WHERE u.team_name = ( " +
                            "    SELECT team_name " +
                            "    FROM User " +
                            "    WHERE idx = ? " +
                            ") " +
                            "AND s.day = ? "+
                            "ORDER BY schedule_time";
        PreparedStatement stmt = connection.prepareStatement(getSelectSQL);
        stmt.setString(1, idx);
        stmt.setString(2, date);
        ResultSet result = stmt.executeQuery();
        while (result.next()) {
            String content = result.getString("content");
            String time = result.getString("schedule_time");
            String name=result.getString("u.name");
            String userIDX=result.getString("u.idx");
            contentList.add("'"+content+"'");
            scheduleList.add("'"+time+"'");
            nameList.add("'"+name+"'");
            userIDXList.add("'"+userIDX+"'");
        }
    } catch (SQLException e) {
        e.printStackTrace(); // 예외를 로그로 기록합니다.
    }
    return new TeamResult(contentList, scheduleList,nameList,userIDXList);
}
%>

<%!
public String validateAll(String day) {
    final Pattern regex_day = Pattern.compile("^\\d{4}-\\d{2}-\\d{2}$");
    if (!regex_day.matcher(day).matches()) {
        return "날짜 오류";
    }
    return "true";
}
%>

<%
    request.setCharacterEncoding("utf-8");
    Connection connection = null;
    HttpSession session_detail = request.getSession(false);
    String userIDX = (session_detail != null) ? (String) session_detail.getAttribute("idx") : null;
    if (userIDX==null){
      out.println("<script>alert('세션 오류'); location.href='../action/logoutAction.jsp';</script>");
      return;
    }
    String position = (session_detail != null) ? (String) session_detail.getAttribute("position") : null;
    String colorCode = (session_detail != null) ? (String) session_detail.getAttribute("color") : null;
    String day = request.getParameter("day");
    String watchState = request.getParameter("watchState");
    String regexText=validateAll(day);
    if (!regexText.equals("true")){
        out.println("<script>alert('" + regexText + " 오류'); history.back();</script>");
        return;
    }   
    String checkSession="";
    try {
        Class.forName("org.mariadb.jdbc.Driver");
        connection = DriverManager.getConnection("jdbc:mariadb://localhost:3306/web", "mannomi", "1234");
    } catch (Exception e) {
        e.printStackTrace();
    }

    List<String> contentList = new ArrayList<>(); 
    List<String> scheduleList = new ArrayList<>(); 
    List<String> nameList = new ArrayList<>(); 
    List<String> userIDXList = new ArrayList<>(); 
    
    // 유저 보기 상태이면 
    if (watchState.equals("USER")){
      ScheduleResult resultUser = tryGetSchedule(connection, userIDX, day);
      contentList = resultUser.getContentList();
      scheduleList = resultUser.getScheduleList();
    }
    // 팀장보기 상태이면 팀장권한 있는지 확인 
    else if (watchState.equals("TEAM") & position.equals("팀장")){
      TeamResult result = tryGetTeamSchedule(connection, userIDX, day);
      contentList = result.getContentList();
      scheduleList = result.getScheduleList();
      nameList = result.getNameList();
      userIDXList = result.getuserIDXList();
    }
    else{
        out.println("<script>alert('권한이 없습니다'); history.back();</script>");
        return;
    }
%>

<!DOCTYPE html>
<html lang="kr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" type="text/css" href="../../reset/reset.css">
    <link rel="stylesheet" type="text/css" href="../../rootCSS/rootCSS.css">
    <link rel="stylesheet" type="text/css" href="../../component/button/button.css"/>
    <link rel="stylesheet" type="text/css" href="../../component/placeHorder/placeHorder.css"/>
    <link rel="stylesheet" type="text/css" href="../../css/detail_page.css" />
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
  var userIDXList=<%=userIDXList%>
  var contentList=<%=contentList%>
  var scheduleList=<%=scheduleList%> 

  var watchState= "<%=watchState%>"
  var date ="<%=day%>"
  var colorCode="<%=colorCode%>"
  var userIDX="<%=userIDX%>"

  var nameList=[]
  if (watchState=="TEAM"){
    nameList=<%=nameList%>
  }
  initTime(date)
  dateText=date
  stateColor="#"+colorCode
  setColor(colorCode);
  makeInputScroll(contentList,scheduleList,nameList,userIDXList);
</script>