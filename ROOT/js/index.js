// 플레이스 홀더 생성
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

function setEvent() {
  var loginBtn = document.getElementById("login_btn");
  loginBtn.addEventListener("click", function () {
    location.href = "../html/schedule.html";
  });
  var findBtn = document.getElementById("find_move_btn");
  findBtn.addEventListener("click", function () {
    location.href = "../html/find_page.html";
  });
  var joinBtn = document.getElementById("join_move_btn");
  joinBtn.addEventListener("click", function () {
    location.href = "../html/join_page.html";
  });

  var tapIDBox = document.getElementById("find_tab_id_box");
  var tapPWBox = document.getElementById("find_tab_pw_box");
  tapIDBox.addEventListener("click", function (e) {
    tapIDBox.style.paddingLeft = "5px";
    tapPWBox.style.paddingLeft = "0px";
    tabIDClick();
    makeInputFindId();
  });

  tapPWBox.addEventListener("click", function (e) {
    tapIDBox.style.paddingLeft = "0px";
    tapPWBox.style.paddingLeft = "5px";
    tabPWClick();
    makeInputFindPw();
  });
}

function tabIDClick() {
  var tabId = document.getElementById("find_tab_id_back");
  var tabPw = document.getElementById("find_tab_pw_back");
  tabId.style.backgroundColor = "#425c73";
  tabPw.style.cssText =
    "border-left: 9px solid transparent; border-right: 9px solid transparent; border-bottom: 25px solid #89ccf6;";
  makeInputFindId();
}
function tabPWClick() {
  var tabId = document.getElementById("find_tab_id_back");
  var tabPw = document.getElementById("find_tab_pw_back");
  tabId.style.backgroundColor = "#89ccf6";
  tabPw.style.cssText =
    "border-left: 9px solid transparent; border-right: 9px solid transparent; border-bottom: 25px solid #425c73;";
  makeInputFindPw();
}

function makeInputFindId() {
  var fibdBox = document.getElementById("find_file_back");
  while (fibdBox.firstChild) {
    fibdBox.removeChild(fibdBox.firstChild);
  }
  fibdBox.appendChild(
    makePlacehorder("find_phone", "전화번호", "#BDE3FF", "solid 1px #22B4FF")
  );
}

function makeInputFindPw() {
  var fibdBox = document.getElementById("find_file_back");
  while (fibdBox.firstChild) {
    fibdBox.removeChild(fibdBox.firstChild);
  }
  fibdBox.appendChild(
    makePlacehorder("find_id", "아이디", "#BDE3FF", "solid 1px #22B4FF")
  );
  fibdBox.appendChild(
    makePlacehorder("find_phone", "전화번호", "#BDE3FF", "solid 1px #22B4FF")
  );
}

makeInputPlaceHorder();
setEvent();
