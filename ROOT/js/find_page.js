var findIdBox = document.getElementById("find_id_box");
var findPwBox = document.getElementById("find_pw_box");
var tabId = document.getElementById("find_tab_id_back");
var tabPw = document.getElementById("find_tab_pw_back");
var tapIDBox = document.getElementById("find_tab_id_box");
var tapPWBox = document.getElementById("find_tab_pw_box");

function initPlaceHorder() {
  findIdBox.style.display = "none";
  findIdBox.replaceChild(
    makePlacehorder("find_phone", "전화번호", "#EEEEEE", "black"),
    document.getElementById("tmp_find_id_phone")
  );
  findPwBox.style.display = "none";
  findPwBox.replaceChild(
    makePlacehorder("find_id", "아이디", "#EEEEEE", "black"),
    document.getElementById("tmp_find_pw_id")
  );
  findPwBox.replaceChild(
    makePlacehorder("find_phone", "전화번호", "#EEEEEE", "black"),
    document.getElementById("tmp_find_pw_phone")
  );
}

function tabIdBoxClickEvent() {
  tapIDBox.style.paddingLeft = "5px";
  tapPWBox.style.paddingLeft = "0px";
  tabId.style.backgroundColor = "#373A40";
  tabPw.classList = "find_tab_pw";
  findIdBox.style.display = "block";
  findPwBox.style.display = "none";
}

function tabPWBoxClickEvent() {
  tapIDBox.style.paddingLeft = "0px";
  tapPWBox.style.paddingLeft = "5px";
  tabId.style.backgroundColor = "#758694";
  tabPw.classList = "find_tab_pw_click";
  findIdBox.style.display = "none";
  findPwBox.style.display = "block";
}

function exitBtnClickEvent() {
  location.href = "../../jsp/page/index.jsp";
}

function setFindIDEvnet() {
  console.log(errorCount);
  if (errorCount.length == 1) {
    alert("찾으시려는 아이디는 이겁니다");
    errorCount = [];
    location.href = "../../jsp/page/index.jsp";
  } else {
    alert("잘못된 입력입니다");
  }
}

function setFindPWEvnet() {
  if (errorCount.length == 2) {
    alert("찾으시려는 비밀번호는 이겁니다");
    errorCount = [];
    location.href = "../../jsp/page/index.jsp";
  } else {
    alert("잘못된 입력입니다");
  }
}

function findBackEvent() {
  moveEvent(findContainer, loginContainer);
}

initPlaceHorder();
