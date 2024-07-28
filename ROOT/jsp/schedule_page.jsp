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

<!DOCTYPE html>
<html lang="kr">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>스케줄러</title>
    <link rel="stylesheet" type="text/css" href="../component/reset.css" />
    <link rel="stylesheet" type="text/css" href="../rootCSS/rootCSS.css">

    <link rel="stylesheet" type="text/css" href="../css/schedule_page.css" />
  </head>
  <body>
    <main id="page_container">
      <header id="btn_list">
        <button id="red_btn" onclick="exitBtnEvent()"></button>
        <button id="yellow_btn" onclick="menuBtnEvent()"></button>
        <button id="green_btn" onclick="reSizeCalanderEvent()"></button>
        <nav id="speech_icon">
          <div id="speech_menu_container">
            <button id="watch_all_box" onclick="whatchAllBtnEvent()">
              <img
                src="../image/schedule/full_battery.png"
                class="speech_menu_icon" />
              <div class="speech_menu_text">전체 보기</div>
            </button>
            <button id="watch_profile_box" onclick="setProfileMoveEvent()">
              <img
                src="../image/schedule/profile.png"
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
        <input id="choose_date" type="date" />
      </div>
      <table id="month"></table>
    <script src="../js/schedule.js"></script>
  </body>
</html>
