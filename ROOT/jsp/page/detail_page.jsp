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

public TeamResult tryGetTeamSchedule(Connection connection, String idx, String date,String state) {
    List<String> contentList = new ArrayList<>();
    List<String> scheduleList = new ArrayList<>();
    List<String> nameList = new ArrayList<>();
    List<String> userIDXList = new ArrayList<>();
    String getSelectSQL="";
    if (state.equals("USER")){
      getSelectSQL="SELECT content, schedule_time "+
                    "FROM Schedule "+
                    "WHERE user_idx = ? AND day = ? "+
                    "ORDER BY schedule_time";
    }
    else if (state.equals("TEAM"))
      getSelectSQL=  "SELECT content , schedule_time ,u.name , u.idx " +
                      "FROM Schedule s " +
                      "JOIN User u ON s.user_idx = u.idx " +
                      "WHERE u.team_name = ( " +
                      "    SELECT team_name " +
                      "    FROM User " +
                      "    WHERE idx = ? " +
                      ") " +
                      "AND s.day = ? "+
                      "ORDER BY schedule_time";
    try {
        PreparedStatement stmt = connection.prepareStatement(getSelectSQL);
        stmt.setString(1, idx);
        stmt.setString(2, date);
        ResultSet result = stmt.executeQuery();
        while (result.next()) {
            String content = result.getString("content");
            String time = result.getString("schedule_time");
            contentList.add("'"+content+"'");
            scheduleList.add("'"+time+"'");
            if (state.equals("TEAM")){
              String name=result.getString("u.name");
              String userIDX=result.getString("u.idx");
              nameList.add("'"+name+"'");
              userIDXList.add("'"+userIDX+"'");
            }
        }
    } catch (SQLException e) {
        e.printStackTrace(); // 예외를 로그로 기록합니다.
    }
    return new TeamResult(contentList, scheduleList,nameList,userIDXList);
}
%>

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
    String regexText=validateAll(day,watchState);
    if (!regexText.equals("true")){
        out.println("<script>alert('" + regexText + "'); history.back();</script>");
        return;
    }   
    String checkSession="";
    try {
        Class.forName("org.mariadb.jdbc.Driver");
        connection = DriverManager.getConnection("jdbc:mariadb://localhost:3306/web", "mannomi", "1234");
    } catch (Exception e) {
        e.printStackTrace();
    }

  TeamResult result = tryGetTeamSchedule(connection, userIDX, day, watchState);

  List<String> contentList = result.getContentList();
  List<String> scheduleList = result.getScheduleList();
  List<String> nameList = result.getNameList();
  List<String> userIDXList = result.getuserIDXList();
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