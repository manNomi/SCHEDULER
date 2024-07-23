var scrollState = "none";
var IdValue = "";
var PwValue = "";
var PwCheckValue = "";
var nameValue = "";
var phoneValue = "";
var classValue = "";
var teamValue = "";

function joinTabReset(type) {
  var joinIDBox = document.getElementById("tab_id_join");
  var joinPrivacyBox = document.getElementById("tab_privacy_join");
  var joinProfileBox = document.getElementById("tab_profile_join");
  var boxList = [joinIDBox, joinPrivacyBox, joinProfileBox];
  boxList.forEach(function (element) {
    element.style.display = "none";
  });
  var joinBox = document.getElementById("tab_" + type + "_join");

  if (type != null) {
    joinBox.style.display = "block";
  }
}

function makeInputjoinID() {
  var joinContainer = document.getElementById("join_file_content");
  var joinBox = document.getElementById("tab_id_join");
  joinBox.classList = "join_file_content";
  var IDBox = makePlacehorder("join_id", "아이디 입력", "#EEEEEE", "black");

  joinBox.appendChild(IDBox);

  var PWBox = makePlacehorder("join_pw", "비밀번호 입력", "#EEEEEE", "black");
  joinBox.appendChild(PWBox);

  var PwCheckBox = makePlacehorder(
    "join_pw-check",
    "비밀번호 확인",
    "#EEEEEE",
    "black"
  );
  joinBox.appendChild(PwCheckBox);

  joinBox.querySelectorAll(".placehorder_box").forEach(function (e) {
    e.type = "password";
  });
  IDBox.querySelector("input").type = "text";
  joinBox.appendChild(makeNextBtn());
  joinContainer.appendChild(joinBox);
}

function makeInputJoinPrivacy() {
  var joinContainer = document.getElementById("join_file_content");

  var joinBox = document.getElementById("tab_privacy_join");

  joinBox.classList = "join_file_content";
  var nameBox = makePlacehorder("join_name", "이름 입력", "#EEEEEE", "black");
  joinBox.appendChild(nameBox);
  var phoneBox = makePlacehorder(
    "join_phone",
    "전화번호 입력",
    "#EEEEEE",
    "black"
  );
  joinBox.appendChild(phoneBox);

  joinBox.appendChild(makeNextBtn());
  joinContainer.appendChild(joinBox);
}

function makeInputJoinProfile() {
  var joinContainer = document.getElementById("join_file_content");

  var joinBox = document.getElementById("tab_profile_join");
  joinBox.classList = "join_file_content";

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

  joinBox.appendChild(makeJoinRadioBtn());
  joinBox.appendChild(makeNextBtn());
  joinBox.appendChild(selectContainer);

  setSelectBoxEvnet();
  raidoBtnRepeatCheck();

  joinContainer.appendChild(joinBox);
}

function makeInputSelect() {
  var classNameList = [
    "욜로 부서",
    "재걸 부서",
    "재걸3 부서",
    "재걸4 부서",
    "재걸5 부서",
    "재걸6 부서",
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
      teamValue = element;
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

function errorCheck() {
  var comparisonId = ["id", "pw", "pw-check"];
  var comparisonPrivacy = ["id", "pw", "pw-check", "name", "phone"];
  var comparisonProfile = ["id", "pw", "pw-check"];
  console.log(errorCount);
  if (tabState == "ID") {
    const inputSet = new Set(errorCount);
    const comparisonSet = new Set(comparisonId);
    const additionalValues = [...comparisonSet].filter(
      (value) => !inputSet.has(value)
    );
    if (errorCount.length == 3) {
      setPrivacyTab();
      tapPrivacyBox.addEventListener("click", function (e) {
        setPrivacyTab();
      });
    } else {
      alert(additionalValues + "를 입력해주세요");
    }
  } else if (tabState == "Privacy") {
    const inputSet = new Set(errorCount);
    const comparisonSet = new Set(comparisonPrivacy);
    const additionalValues = [...comparisonSet].filter(
      (value) => !inputSet.has(value)
    );
    if (errorCount.length == 5) {
      setProfileTab();
      tapProfileBox.addEventListener("click", function (e) {
        setProfileTab();
      });
    } else {
      alert(additionalValues + "를 입력해주세요");
    }
  } else if (tabState == "Profile") {
    const inputSet = new Set(errorCount);
    const comparisonSet = new Set(comparisonProfile);
    const additionalValues = [...comparisonSet].filter(
      (value) => !inputSet.has(value)
    );
    if (errorCount.length == 5 && teamValue != "") {
      alert("회원가입 성공");
      location.href = "../html/index.html";
    } else {
      if (teamValue == "") {
        alert("부서를 선택하세요");
      } else {
        alert(additionalValues + "를 입력해주세요");
      }
    }
  }
}

function makeNextBtn() {
  var nextBtnBox = document.createElement("div");
  nextBtnBox.id = "join_next_box";
  var joinnextBtn = document.createElement("button");
  joinnextBtn.id = "join_next_btn";
  nextBtnBox.appendChild(joinnextBtn);
  joinnextBtn.onclick = function () {
    errorCheck();
  };
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
  joinTabReset("id");
  tabState = "ID";
}
function setPrivacyTab() {
  tapIDBox.style.backgroundColor = "#758694";
  tapPrivacyBox.style.backgroundColor = "#373A40";
  tapProfileBox.style.cssText =
    "  width: 120px;height: 0px;border-left: 9px solid transparent;border-right: 9px solid transparent;border-bottom: 25px solid #758694;";
  joinTabReset("privacy");
  tabState = "Privacy";
}
function setProfileTab() {
  tapIDBox.style.backgroundColor = "#758694";
  tapPrivacyBox.style.backgroundColor = "#758694";
  tapProfileBox.style.cssText =
    "  width: 120px;height: 0px;border-left: 9px solid transparent;border-right: 9px solid transparent;border-bottom: 25px solid #373A40;";
  joinTabReset("profile");
  tabState = "Profile";
}

function setJoinPageEvent() {
  tapIDBox.addEventListener("click", function (e) {
    setIdTab();
  });

  var exitBtn = document.getElementById("join_btn_red");
  exitBtn.addEventListener("click", function () {
    location.href = "../html/index.html";
  });
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

makeInputjoinID();
makeInputJoinPrivacy();
makeInputJoinProfile();
joinTabReset();
setIdTab();
setJoinPageEvent();
