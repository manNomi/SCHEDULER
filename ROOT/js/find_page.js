function makeInputFindId() {
  var fibdBox = document.getElementById("find_file_content");
  var findIdBox = document.createElement("div");
  findIdBox.id = "find_id_box";
  findIdBox.style.display = "none";
  findIdBox.appendChild(
    makePlacehorder("find_phone", "전화번호", "#EEEEEE", "black")
  );
  findIdBox.appendChild(makeSearchBtn());
  fibdBox.appendChild(findIdBox);
}
function makeInputFindPw() {
  var fibdBox = document.getElementById("find_file_content");
  var findPwBox = document.createElement("div");
  findPwBox.id = "find_pw_box";
  findPwBox.style.display = "none";

  findPwBox.appendChild(
    makePlacehorder("find_id", "아이디", "#EEEEEE", "black")
  );
  findPwBox.appendChild(
    makePlacehorder("find_phone", "전화번호", "#EEEEEE", "black")
  );

  findPwBox.appendChild(makeSearchBtn());
  fibdBox.appendChild(findPwBox);
}

function tabIDClick() {
  var tabId = document.getElementById("find_tab_id_back");
  var tabPw = document.getElementById("find_tab_pw_back");
  tabId.style.backgroundColor = "#373A40";
  tabPw.style.cssText =
    "border-left: 9px solid transparent; border-right: 9px solid transparent; border-bottom: 25px solid #758694;";
  document.getElementById("find_id_box").style.display = "block";
  document.getElementById("find_pw_box").style.display = "none";
}
function tabPWClick() {
  var tabId = document.getElementById("find_tab_id_back");
  var tabPw = document.getElementById("find_tab_pw_back");
  tabId.style.backgroundColor = "#758694";
  tabPw.style.cssText =
    "border-left: 9px solid transparent; border-right: 9px solid transparent; border-bottom: 25px solid #373A40;";
  document.getElementById("find_id_box").style.display = "none";
  document.getElementById("find_pw_box").style.display = "block";
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
    tabState = "ID";
  });

  tapPWBox.addEventListener("click", function (e) {
    tapIDBox.style.paddingLeft = "0px";
    tapPWBox.style.paddingLeft = "5px";
    tabPWClick();
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
      console.log(errorCount);
      if (errorCount.length == 1) {
        alert("찾으시려는 아이디는 이겁니다");
        errorCount = [];
        location.href = "../html/index.html";
      } else {
        alert("잘못된 입력입니다");
      }
    } else if (tabState == "PW") {
      console.log(errorCount);
      if (errorCount.length == 2) {
        alert("찾으시려는 비밀번호는 이겁니다");
        errorCount = [];
        location.href = "../html/index.html";
      } else {
        alert("잘못된 입력입니다");
      }
    }
  });
}

var tabState = "";
setFindPageEvent();
makeInputFindId();
makeInputFindPw();
setFindEvnet();
