var findIdContinaer = document.getElementById("find_id_container");
var findPwContainer = document.getElementById("find_pw_container");
var tabId = document.getElementById("find_tab_id_back");
var tabPw = document.getElementById("find_tab_pw_back");
var tapIDBox = document.getElementById("find_tab_id_box");
var tapPWBox = document.getElementById("find_tab_pw_box");

// 플레이스 홀더 생성
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

// 인풋 태그 초기화
function replaceTabEvent() {
  Array.from(document.querySelectorAll("input")).forEach(function (input) {
    input.value = "";
  });
  errorCount = [];
}

// 아이디 탭 클릭 이벤트
function tabIdBoxClickEvent() {
  tapIDBox.classList = "tab_padding_click";
  tapPWBox.classList = "tab_padding_none_click";
  tabId.classList = "tab_click";
  tabPw.classList = "find_tab_pw";
  findIdContinaer.style.display = "block";
  findPwContainer.style.display = "none";
  replaceTabEvent();
}

// 비밀번호 탭 클릭 이벤트
function tabPWBoxClickEvent() {
  tapIDBox.classList = "tab_padding_none_click";
  tapPWBox.classList = "tab_padding_click";
  tabId.classList = "tab_non_click";
  tabPw.classList = "find_tab_pw_click";
  findIdContinaer.style.display = "none";
  findPwContainer.style.display = "block";
  replaceTabEvent();
}

// 나가기 버튼
function exitBtnClickEvent() {
  location.href = "../../jsp/page/index.jsp";
}

// 아이디 찾기 이벤트
function setFindIDEvnet() {
  if (errorCount.length == 1) {
    var phone = document.getElementById("find_phone_box").value;
    location.href = "../../jsp/action/findIDAction.jsp?phone=" + phone;
  } else {
    alert("잘못된 입력입니다");
  }
}

// 비밀번호 찾기 이벤트
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

// 뒤로가기 이벤트
function findBackEvent() {
  moveEvent(findContainer, loginContainer);
}

initPlaceHorder();
