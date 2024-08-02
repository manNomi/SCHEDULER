var findIdContinaer = document.getElementById("find_id_container");
var findPwContainer = document.getElementById("find_pw_container");
var tabId = document.getElementById("find_tab_id_back");
var tabPw = document.getElementById("find_tab_pw_back");
var tapIDBox = document.getElementById("find_tab_id_box");
var tapPWBox = document.getElementById("find_tab_pw_box");

function initPlaceHorder() {
  findIdContinaer.style.display = "none";
  findIdContinaer.replaceChild(
    makePlacehorder("find_phone", "전화번호", "#EEEEEE", "black"),
    document.getElementById("tmp_find_id_phone")
  );
  findPwContainer.style.display = "none";
  findPwContainer.replaceChild(
    makePlacehorder("find_id", "아이디", "#EEEEEE", "black"),
    document.getElementById("tmp_find_pw_id")
  );
  findPwContainer.replaceChild(
    makePlacehorder("find_phone_pw", "전화번호", "#EEEEEE", "black"),
    document.getElementById("tmp_find_pw_phone")
  );
}

function replaceTabEvent() {
  Array.from(document.querySelectorAll("input")).forEach(function (input) {
    input.value = "";
  });
  errorCount = [];
}

function tabIdBoxClickEvent() {
  tapIDBox.style.paddingLeft = "5px";
  tapPWBox.style.paddingLeft = "0px";
  tabId.style.backgroundColor = "#373A40";
  tabPw.classList = "find_tab_pw";
  findIdContinaer.style.display = "block";
  findPwContainer.style.display = "none";
  replaceTabEvent();
}

function tabPWBoxClickEvent() {
  tapIDBox.style.paddingLeft = "0px";
  tapPWBox.style.paddingLeft = "5px";
  tabId.style.backgroundColor = "#758694";
  tabPw.classList = "find_tab_pw_click";
  findIdContinaer.style.display = "none";
  findPwContainer.style.display = "block";
  replaceTabEvent();
}

function exitBtnClickEvent() {
  location.href = "../../jsp/page/index.jsp";
}

function setFindIDEvnet() {
  if (errorCount.length == 1) {
    var phone = document.getElementById("find_phone_box").value;
    location.href = "../../jsp/action/findIDAction.jsp?phone=" + phone;
  } else {
    alert("잘못된 입력입니다");
  }
}

function setFindPWEvnet() {
  if (errorCount.length == 2) {
    var id = document.getElementById("find_id_box").value;
    var phone = document.getElementById("find_phone_pw_box").value;
    location.href =
      "../../jsp/action/findPWAction.jsp?id=" + id + "&phone=" + phone;
  } else {
    alert("잘못된 입력입니다");
  }
}

function findBackEvent() {
  moveEvent(findContainer, loginContainer);
}

initPlaceHorder();
