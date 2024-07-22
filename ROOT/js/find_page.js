function makeInputFindId() {
  var fibdBox = document.getElementById("find_file_content");
  while (fibdBox.firstChild) {
    fibdBox.removeChild(fibdBox.firstChild);
  }
  fibdBox.appendChild(
    makePlacehorder("find_phone", "전화번호", "#EEEEEE", "black")
  );
  fibdBox.appendChild(makeInputError("find", "phone"));
  fibdBox.appendChild(makeSearchBtn());
}
function makeInputFindPw() {
  var fibdBox = document.getElementById("find_file_content");
  while (fibdBox.firstChild) {
    fibdBox.removeChild(fibdBox.firstChild);
  }
  fibdBox.appendChild(makePlacehorder("find_id", "아이디", "#EEEEEE", "black"));
  fibdBox.appendChild(makeInputError("find", "id"));
  var error = document.createElement("p");
  error.id = "find_id_error";
  fibdBox.appendChild(error);
  fibdBox.appendChild(
    makePlacehorder("find_phone", "전화번호", "#EEEEEE", "black")
  );
  fibdBox.appendChild(makeInputError("find", "phone"));

  fibdBox.appendChild(makeSearchBtn());
}

function tabIDClick() {
  var tabId = document.getElementById("find_tab_id_back");
  var tabPw = document.getElementById("find_tab_pw_back");
  tabId.style.backgroundColor = "#373A40";
  tabPw.style.cssText =
    "border-left: 9px solid transparent; border-right: 9px solid transparent; border-bottom: 25px solid #758694;";
  makeInputFindId();
}
function tabPWClick() {
  var tabId = document.getElementById("find_tab_id_back");
  var tabPw = document.getElementById("find_tab_pw_back");
  tabId.style.backgroundColor = "#758694";
  tabPw.style.cssText =
    "border-left: 9px solid transparent; border-right: 9px solid transparent; border-bottom: 25px solid #373A40;";
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
