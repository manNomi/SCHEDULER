// 플레이스 홀더 생성
var loginContainer = document.getElementById("main_container");
var findContainer = document.getElementById("find_container");
var joinContainer = document.getElementById("join_container");
var container = document.getElementById("box_container");

// 플레이스 홀더 생성
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

// 로그인 클릭 이벤트
function setLoginEvent() {
  if (checkLoginError() == true) {
    var idValue = document.getElementById("login_id_box").value;
    var pwValue = document.getElementById("login_pw_box").value;
    location.href =
      "../../jsp/action/loginAction.jsp?id=" + idValue + "&pw=" + pwValue;
  } else {
    alert("입력이 올바르지 않습니다");
  }
}

// 로그인 정규표현식 검사
function checkLoginError() {
  var loginSuccess = false;
  if (errorCount.length == 2) {
    loginSuccess = true;
  }
  return loginSuccess;
}

// 찾기버튼 클릭 이벤트
function findClickEvent() {
  moveEvent(loginContainer, findContainer);
}

// 가입버튼 클릭 이벤트
function joinClickEvent() {
  moveEvent(loginContainer, joinContainer);
}

// 로고 클릭 이벤트
function logoClickEvent() {
  location.href = "../../jsp/page/index.jsp";
}

// 페이지 시작이벤트
function startPage() {
  loginContainer.style.animation = "start_container 1.5s forwards";
}

// 페이지 이동 애니메이션
function moveEvent(del, mk) {
  del.style.animation = "width_to_0 1s forwards";
  mk.style.animation = "width_to_100 1s forwards";
  errorCount = [];
}

initPlaceHorder();
startPage();
