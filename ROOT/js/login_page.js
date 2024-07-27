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
    location.href = "../html/schedule.html";
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
  loginContainer.style.display = "none";
  findContainer.style.display = "flex";
  errorCount = [];
}
function joinClickEvent() {
  loginContainer.style.display = "none";
  joinContainer.style.display = "flex";
  errorCount = [];
}
function logoClickEvent() {
  location.href = "../html/index.html";
}

initPlaceHorder();
