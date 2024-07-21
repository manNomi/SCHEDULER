// 플레이스 홀더 생성
var loginContainer = document.getElementById("main_container");
var findContainer = document.getElementById("find_container");
var joinContainer = document.getElementById("join_container");

function makeInputPlaceHorder() {
  var container = document.getElementById("box_container");
  // tmp 태그와 placehorder 새로 만들어 교체
  var idInput = makePlacehorder(
    "login_id",
    "아이디",
    "#425c73",
    "solid 0px #26303e"
  );
  container.replaceChild(idInput, document.getElementById("tmp_login_id"));
  var pwInput = makePlacehorder(
    "login_pw",
    "비밀번호",
    "#425c73",
    "solid 0px #b6b6b6"
  );
  console.log(pwInput);
  pwInput.querySelector(".placehorder_box").type = "password";
  container.replaceChild(pwInput, document.getElementById("tmp_login_pw"));
}

function setLoginEvent() {
  var loginBtn = document.getElementById("login_btn");
  loginBtn.addEventListener("click", function () {
    location.href = "../html/schedule.html";
  });
  var findBtn = document.getElementById("find_move_btn");
  findBtn.addEventListener("click", function () {
    loginContainer.style.display = "none";
    findContainer.style.display = "flex";
  });
  var joinBtn = document.getElementById("join_move_btn");
  joinBtn.addEventListener("click", function () {
    loginContainer.style.display = "none";
    joinContainer.style.display = "flex";
  });

  var logobtn = document.getElementById("login_logo_btn");
  logobtn.addEventListener("click", function () {
    location.href = "../html/index.html";
  });
}

makeInputPlaceHorder();
setLoginEvent();
