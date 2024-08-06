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

<%-- 부서 가져오기 --%>
<%!
public String tryGetSelect(Connection connection) {
    String team = "";
    try {
        String getSelectSQL = "SELECT name FROM Team";
        PreparedStatement stmt = connection.prepareStatement(getSelectSQL);
        ResultSet result = stmt.executeQuery();
        while (result.next()) {
                team +=result.getString("name")+"-";
            }
    } 
    catch (SQLException e) {
        team = "";
    }
    return team;
}
%>

<%
    request.setCharacterEncoding("utf-8");
    Connection connection = null;
    // 세션이 있으면 스케줄 페이지로 이동 
    HttpSession session_index = request.getSession(false);
    if (session_index != null) {
      String userIDX = (session_index != null) ? (String) session_index.getAttribute("idx") : null;
      if (userIDX!=null){
        out.println("<script>location.href='./schedule_page.jsp';</script>");
        return;
      }
    }
    try {
        Class.forName("org.mariadb.jdbc.Driver");
        connection = DriverManager.getConnection("jdbc:mariadb://localhost:3306/web", "mannomi", "1234");
    } catch (Exception e) {
        e.printStackTrace();
    }
    String team = tryGetSelect(connection);
%>


<!DOCTYPE html>
<html lang="kr">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="stylesheet" href="../../common/reset.css">
    <link rel="stylesheet" type="text/css" href="../../common/rootCSS.css">
    <link rel="stylesheet" type="text/css" href="../../component/placeHorder/placeHorder.css">
    <link rel="stylesheet" type="text/css" href="../../component/button/button.css">
    <link rel="stylesheet" type="text/css" href="../../css/login_page.css">
    <link rel="stylesheet" type="text/css" href="../../css/find_page.css">
    <link rel="stylesheet" type="text/css" href="../../css/join_page.css">
    <title>스케줄러</title>
  </head>
  <body>
    <main id="join_container"">
      <header id="join_header_list">
        <button id="join_btn_red" class="btn_red" onclick="exitJoinBtnEvent()"></button>
        <button id="join_btn_gray" class="btn_gray"></button>
        <button id="join_btn_gray" class="btn_gray"></button>
      </header>
      <article id="join_main_list">
        <section id="join_file_container">
          <nav id="join_tab_box">
            <section id="join_tab_id_box" onclick="setIdTabEvent()">
              <p id="join_tab_id_content" >아이디</p>
              <div id="join_tab_id_back" class="tab_click"></div>
            </section>
            <section id="join_tab_privacy_box" >
              <p id="join_tab_privacy_content">개인정보</p>
              <div id="join_tab_privacy_back" class="tab_non_click"></div>
            </section>
            <section id="join_tab_profile_box">
              <p id="join_tab_profile_content">프로필</p>
              <div id="join_tab_profile_back" class="join_tab_profile_back"></div>
            </section>
          </nav>
          <section id="join_file_shape">
            <article id="join_file_content">
              <section id="content_id_join" class="join_file_content" >
                <input id="tmp_join_id">
                <input id="tmp_join_pw">
                <input id="tmp_join_pw_check">
                <div id="join_next_box" onclick="checkJoinError()">
                  <button id="join_next_btn">1/3 다음</button>
                </div>
              </section>
              <section id="content_privacy_join" class="join_file_content" >
                <input id="tmp_join_name">
                <input id="tmp_join_phone">
                <div id="join_next_box" onclick="checkJoinError()">
                  <button id="join_next_btn">2/3 다음</button>
                </div>
              </section>
              <section id="content_profile_join" class="join_file_content" >
                <div id="class_container"></div>
                <div id="select_container">
                  <div id="select_box" onclick="setSelectBoxEvnet()">
                    <div class="class_select">부서 선택</div>
                    <p id="check_img">></p>
                  </div>
                  <div id="slectList">
                    <div id="class_scroll">
                    </div>
                  </div>
                </div>
                <div id="join_next_box" onclick="checkJoinError()">
                  <button id="join_next_btn">3/3 가입</button>
                </div>
              </section>
            </article>
          </section>
        </section>
        <button id="join_back_btn" onclick="joinBackEvent()"></button>
      </article>
    </main>

    <main id="main_container" >
      <img id="login_logo_btn" src="../../image/login/strageus_logo.png" onclick="logoClickEvent()"></img>
      <article id="box_container">
          <input id="tmp_login_id">
          <input id="tmp_login_pw">
        <button id="login_btn" onclick="setLoginEvent()">로그인</button>
        <section id="move_btn_box">
          <button id="find_move_btn" class="move_btn" onclick="findClickEvent()">비밀번호를 잊으셨나요?</button>
          <button id="join_move_btn" class="move_btn" onclick="joinClickEvent()">새로 가입하기</button>
        </section>
      </article>
    </main>
    
    <div id="find_container">
      <nav id="find_header_list">
        <button id="find_btn_red" class="btn_red" onclick="exitBtnClickEvent()"></button>
        <button id="find_btn_gray" class="btn_gray"></button>
        <button id="find_btn_gray" class="btn_gray"></button>
      </nav>
      <main id="find_main_list" >
        <button id="find_back_btn" onclick="findBackEvent()"></button>
        <article id="find_file_container">
          <header id="find_tab_box">
            <nav id="find_tab_id_box"  onclick="tabIdBoxClickEvent()">
              <p id="find_tab_id_content">아이디</p>
              <div id="find_tab_id_back" class="tab_non_click"></div>
            </nav>
            <nav id="find_tab_pw_box" onclick="tabPWBoxClickEvent()">
              <p id="find_tab_pw_content">비밀번호</p>
              <div id="find_tab_pw_back" class="find_tab_pw"></div>
            </nav>
          </header>
            <section id ="find_file_shape">
              <article id="find_file_content">
                <section id="find_id_container">
                  <input id="tmp_find_id_phone">
                  <section id="find_search_id_box" class="find_search_box">
                    <button id="find_search_id_btn" class="find_search_btn" onclick="setFindIDEvnet()"></button>
                  </section>
                </section>
                <section id="find_pw_container">
                  <input id="tmp_find_pw_id">
                  <input id="tmp_find_pw_phone">
                  <section id="find_search_pw_box" class="find_search_box">
                    <button id="find_search_pw_btn" class="find_search_btn" onclick="setFindPWEvnet()"></button>
                  </section>
                </section>
              </article>
            </section>
        </article>
      </main>
    </div>
    <script src="../../component/placeHorder/placeHorder.js"></script>
    <script src="../../js/login_page.js"></script>
    <script src="../../js/find_page.js"></script>
    <script src="../../js/join_page.js"></script>
</html>

<script>
  var teamList = "<%=team%>".split("-")
  teamList.pop()
  initSelectBox(teamList)
</script>