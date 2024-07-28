// 플레이스 홀더 생성
var loginContainer = document.getElementById("main_container");
var findContainer = document.getElementById("find_container");
var joinContainer = document.getElementById("join_container");
var container = document.getElementById("box_container");

function initPlaceHorder() {
  container.replaceChild(
    makePlacehorder("login_id", "아이디", "#425c73", "white", "text"),
    document.getElementById("tmp_login_id")
  );
  container.replaceChild(
    makePlacehorder("login_pw", "비밀번호", "#425c73", "white", "password"),
    document.getElementById("tmp_login_pw")
  );
}
function setLoginEvent() {
  if (checkLoginError() == true) {
    alert("로그인 시도");
    location.href = "../html/schedule_page.html";
  } else {
    alert("입력이 올바르지 않습니다");
  }
}
function checkLoginError() {
  var loginSuccess = false;
  if (errorCount.length == 2) {
    loginSuccess = true;
  }
  return loginSuccess;
}

function findClickEvent() {
  moveEvent(loginContainer, findContainer);
}
function joinClickEvent() {
  moveEvent(loginContainer, joinContainer);
}
function logoClickEvent() {
  location.href = "../html/index.html";
}

function startPage() {
  loginContainer.style.animation = "start_container 1.5s forwards";
}

function moveEvent(del, mk) {
  del.style.animation = "width_to_0 1s forwards";
  mk.style.animation = "width_to_100 1s forwards";
  errorCount = [];
}

initPlaceHorder();
startPage();
