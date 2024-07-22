function makeInputFindId() {
  var fibdBox = document.getElementById("find_file_back");
  while (fibdBox.firstChild) {
    fibdBox.removeChild(fibdBox.firstChild);
  }
  fibdBox.appendChild(
    makePlacehorder("find_phone", "전화번호", "#BDE3FF", "solid 1px #22B4FF")
  );
  fibdBox.appendChild(makeSearchBtn());
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
  fibdBox.appendChild(makeSearchBtn());
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

function makeSearchBtn() {
  var searchBtnBox = document.createElement("div");
  searchBtnBox.id = "find_search_box";
  var findSearchBtn = document.createElement("button");
  findSearchBtn.id = "find_search_btn";
  searchBtnBox.appendChild(findSearchBtn);
  return searchBtnBox;
}
function setFindPageEvent() {
  var tapIDBox = document.getElementById("find_tab_id_box");
  var tapPWBox = document.getElementById("find_tab_pw_box");
  tapIDBox.addEventListener("click", function (e) {
    tapIDBox.style.paddingLeft = "5px";
    tapPWBox.style.paddingLeft = "0px";
    tabIDClick();
    makeInputFindId();
    setFindEvnet();
    tabState = "ID";
  });

  tapPWBox.addEventListener("click", function (e) {
    tapIDBox.style.paddingLeft = "0px";
    tapPWBox.style.paddingLeft = "5px";
    tabPWClick();
    makeInputFindPw();
    setFindEvnet();
    tabState = "PW";
  });

  var exitBtn = document.getElementById("find_btn_red");
  exitBtn.addEventListener("click", function () {
    location.href = "../html/index.html";
  });
}

function setFindEvnet() {
  var findBtn = document.getElementById("find_search_btn");
  findBtn.addEventListener("click", function (e) {
    if (tabState == "ID") {
      alert("찾으시려는 아이디는 이겁니다");
    } else if (tabState == "PW") {
      alert("찾으시려는 비밀번호는 이겁니다");
    }
  });
}

var tabState = "";
setFindPageEvent();