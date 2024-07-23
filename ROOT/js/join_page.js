var scrollState = "none";
var IdValue = "";
var PwValue = "";
var PwCheckValue = "";
var nameValue = "";
var phoneValue = "";
var classValue = "";
var teamValue = "";

function makeInputjoinID() {
  var joinBox = document.getElementById("join_file_content");
  if (joinBox.children.length != 0) {
    while (joinBox.firstChild) {
      joinBox.removeChild(joinBox.firstChild);
    }
  }
  var IDBox = makePlacehorder("join_id", "아이디 입력", "#EEEEEE", "black");

  joinBox.appendChild(IDBox);
  joinBox.appendChild(makeInputError("join", "id"));

  var PWBox = makePlacehorder("join_pw", "비밀번호 입력", "#EEEEEE", "black");
  joinBox.appendChild(PWBox);
  joinBox.appendChild(makeInputError("join", "pw"));

  var PwCheckBox = makePlacehorder(
    "join_pw_check",
    "비밀번호 확인",
    "#EEEEEE",
    "black"
  );
  joinBox.appendChild(PwCheckBox);
  joinBox.appendChild(makeInputError("join", "pw_check"));

  joinBox.querySelectorAll(".placehorder_box").forEach(function (e) {
    e.type = "password";
  });
  document.getElementById("join_id_box").type = "text";
  joinBox.appendChild(makeNextBtn());
}
function makeInputJoinPrivacy() {
  var joinBox = document.getElementById("join_file_content");
  if (joinBox.children.length != 0) {
    while (joinBox.firstChild) {
      joinBox.removeChild(joinBox.firstChild);
    }
  }
  var nameBox = makePlacehorder("join_name", "이름 입력", "#EEEEEE", "black");
  joinBox.appendChild(nameBox);
  joinBox.appendChild(makeInputError("join", "name"));
  var phoneBox = makePlacehorder(
    "join_phone",
    "전화번호 입력",
    "#EEEEEE",
    "black"
  );
  joinBox.appendChild(phoneBox);
  joinBox.appendChild(makeInputError("join", "phone"));

  joinBox.appendChild(makeNextBtn());
}

function setSelectBoxEvnet() {
  var selectBox = document.getElementById("select_box");
  selectBox.addEventListener("click", function (element) {
    var scroll = document.getElementById("class_scroll"); // 첫 번째 자식 요소를 선택
    if (scrollState == "block") {
      scroll.style.display = "none";
      scrollState = "none";
    } else {
      scroll.style.display = "block";
      scrollState = "block";
    }
  });
}

function makeInputJoinProfile() {
  var selectContainer = document.createElement("div");
  selectContainer.id = "select_container";

  var selectBox = document.createElement("div");
  selectBox.id = "select_box";

  var selectClass = document.createElement("div");
  selectClass.innerHTML = "부서 선택";
  selectClass.classList = "class_select";
  selectBox.appendChild(selectClass);

  var checkImg = document.createElement("p");
  checkImg.innerHTML = ">";
  checkImg.id = "check_img";
  selectBox.appendChild(checkImg);
  selectContainer.appendChild(selectBox);
  var slectList = makeInputSelect();
  slectList.style.display = "none";
  selectContainer.appendChild(slectList);

  var joinBox = document.getElementById("join_file_content");
  if (joinBox.children.length != 0) {
    while (joinBox.firstChild) {
      joinBox.removeChild(joinBox.firstChild);
    }
  }
  joinBox.appendChild(makeJoinRadioBtn());
  joinBox.appendChild(makeNextBtn());
  joinBox.appendChild(selectContainer);
  setSelectBoxEvnet();
  raidoBtnRepeatCheck();
}

function makeInputSelect() {
  var classNameList = [
    "욜로 부서",
    "예빈 부서",
    "예머니 부서",
    "예라버니 부서",
    "예버지 부서",
    "욜로 부서",
  ];

  var classScroll = document.createElement("div");
  classScroll.id = "class_scroll";

  classNameList.forEach(function (element) {
    var className = document.createElement("div");
    className.innerHTML = element;
    className.classList = "class_list";
    className.addEventListener("click", function () {
      var selectClass = document.querySelector(".class_select");
      selectClass.innerHTML = element;
      classScroll.style.display = "none";
      scrollState = "none";
    });
    classScroll.appendChild(className);
  });

  return classScroll;
}

function makeJoinRadioBtn() {
  var classContainer = document.createElement("div");
  classContainer.id = "class_container";

  var classTextList = ["팀장", "팀원"];

  for (let i = 0; i < classTextList.length; i++) {
    var classBox = document.createElement("div");
    classBox.classList.add("class_box");

    var classRadio = document.createElement("input");
    classRadio.type = "radio";
    classRadio.classList.add("class_radio");
    classRadio.id = classTextList[i]; // 라디오 버튼의 id를 클래스 텍스트로 설정

    var classText = document.createElement("div");
    classText.classList.add("class_text");
    classText.innerHTML = classTextList[i];
    classText.style.fontSize = "15px";

    classBox.appendChild(classRadio);
    classBox.appendChild(classText);
    classContainer.appendChild(classBox);
  }
  return classContainer;
}

function raidoBtnRepeatCheck() {
  var radioBtns = document.querySelectorAll(".class_radio");
  radioBtns[1].checked = true;

  radioBtns.forEach(function (radioBtn) {
    radioBtn.addEventListener("change", function (event) {
      var presentRadio = event.target.id;
      radioBtns.forEach(function (btn) {
        if (presentRadio !== btn.id) {
          btn.checked = false; // 올바른 속성은 checked입니다
        }
      });
    });
  });
}

function makeNextBtn() {
  var nextBtnBox = document.createElement("div");
  nextBtnBox.id = "join_next_box";
  var joinnextBtn = document.createElement("button");
  joinnextBtn.id = "join_next_btn";
  nextBtnBox.appendChild(joinnextBtn);
  return nextBtnBox;
}

var tapIDBox = document.getElementById("join_tab_id_back");
var tapPrivacyBox = document.getElementById("join_tab_privacy_back");
var tapProfileBox = document.getElementById("join_tab_profile_back");
function setIdTab() {
  tapIDBox.style.backgroundColor = "#373A40";
  tapPrivacyBox.style.backgroundColor = "#758694";
  tapProfileBox.style.cssText =
    "  width: 120px;height: 0px;border-left: 9px solid transparent;border-right: 9px solid transparent;border-bottom: 25px solid #758694;";
  makeInputjoinID();
  setNextBtnEvnet();
  tabState = "ID";
}
function setPrivacyTab() {
  tapIDBox.style.backgroundColor = "#758694";
  tapPrivacyBox.style.backgroundColor = "#373A40";
  tapProfileBox.style.cssText =
    "  width: 120px;height: 0px;border-left: 9px solid transparent;border-right: 9px solid transparent;border-bottom: 25px solid #758694;";
  makeInputJoinPrivacy();
  setNextBtnEvnet();
  tabState = "Privacy";
}
function setProfileTab() {
  tapIDBox.style.backgroundColor = "#758694";
  tapPrivacyBox.style.backgroundColor = "#758694";
  tapProfileBox.style.cssText =
    "  width: 120px;height: 0px;border-left: 9px solid transparent;border-right: 9px solid transparent;border-bottom: 25px solid #373A40;";
  makeInputJoinProfile();
  setNextBtnEvnet();
  tabState = "Profile";
}

function setJoinPageEvent() {
  tapIDBox.addEventListener("click", function (e) {
    setIdTab();
  });

  tapPrivacyBox.addEventListener("click", function (e) {
    setPrivacyTab();
  });

  tapProfileBox.addEventListener("click", function (e) {
    setProfileTab();
  });

  var exitBtn = document.getElementById("join_btn_red");
  exitBtn.addEventListener("click", function () {
    location.href = "../html/index.html";
  });
}

function setNextBtnEvnet() {
  var nextBtn = document.getElementById("join_next_box");
  nextBtn.addEventListener("click", function () {
    if (tabState == "ID") {
      console.log(errorCount);

      setPrivacyTab();
    } else if (tabState == "Privacy") {
      setProfileTab();
    }
  });
}

setJoinPageEvent();
