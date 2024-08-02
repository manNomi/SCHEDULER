var scrollState = "none";
var IdValue = "";
var PwValue = "";
var PwCheckValue = "";
var nameValue = "";
var phoneValue = "";
var classValue = "";
var teamValue = "";

var joinIDBox = document.getElementById("content_id_join");
var joinPrivacyBox = document.getElementById("content_privacy_join");
var joinProfileBox = document.getElementById("content_profile_join");
var tapIDBox = document.getElementById("join_tab_id_back");
var tapPrivacyBox = document.getElementById("join_tab_privacy_back");
var tapProfileBox = document.getElementById("join_tab_profile_back");

function initPlaceHorderJoin() {
  joinIDBox.replaceChild(
    makePlacehorder("join_id", "아이디", "#EEEEEE", "black"),
    document.getElementById("tmp_join_id")
  );

  joinIDBox.replaceChild(
    makePlacehorder("join_pw", "비밀번호 입력", "#EEEEEE", "black", "password"),
    document.getElementById("tmp_join_pw")
  );
  joinIDBox.replaceChild(
    makePlacehorder(
      "join_pw-check",
      "비밀번호 확인",
      "#EEEEEE",
      "black",
      "password"
    ),
    document.getElementById("tmp_join_pw_check")
  );
  joinPrivacyBox.replaceChild(
    makePlacehorder("join_name", "이름 입력", "#EEEEEE", "black"),
    document.getElementById("tmp_join_name")
  );
  joinPrivacyBox.replaceChild(
    makePlacehorder("join_phone", "전화번호 입력", "#EEEEEE", "black"),
    document.getElementById("tmp_join_phone")
  );
}

function initSelectBox(team) {
  var classNameList = team;
  var classScroll = document.getElementById("class_scroll");
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
  classScroll.style.display = "none";
  document.getElementById("select_container").appendChild(classScroll);
}

function initRadioBtn() {
  var classContainer = document.getElementById("class_container");
  var classTextList = ["팀장", "팀원"];
  for (let i = 0; i < classTextList.length; i++) {
    var classBox = document.createElement("div");
    classBox.classList.add("class_box");

    var classRadio = document.createElement("input");
    classRadio.type = "radio";
    classRadio.classList.add("class_radio");
    classRadio.id = classTextList[i];

    var classText = document.createElement("div");
    classText.classList.add("class_text");
    classText.innerHTML = classTextList[i];
    classText.style.fontSize = "15px";

    classBox.appendChild(classRadio);
    classBox.appendChild(classText);
    classContainer.appendChild(classBox);
  }
  raidoBtnRepeatCheck();
}

function raidoBtnRepeatCheck() {
  var radioBtns = document.querySelectorAll(".class_radio");
  radioBtns.forEach(function (radioBtn) {
    if (radioBtn.id == "팀원") {
      radioBtn.checked = true;
    }
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

function setIdTabEvent() {
  tapIDBox.style.backgroundColor = "#373A40";
  tapPrivacyBox.style.backgroundColor = "#758694";
  tapProfileBox.classList = "join_tab_profile_back";
  tabState = "ID";
  joinIDBox.style.display = "block";
  joinPrivacyBox.style.display = "none";
  joinProfileBox.style.display = "none";
}
function setPrivacyTabEvent() {
  tapIDBox.style.backgroundColor = "#758694";
  tapPrivacyBox.style.backgroundColor = "#373A40";
  tapProfileBox.classList = "join_tab_profile_back";
  tabState = "Privacy";
  joinIDBox.style.display = "none";
  joinPrivacyBox.style.display = "block";
  joinProfileBox.style.display = "none";
}
function setProfileTabEvent() {
  tapIDBox.style.backgroundColor = "#758694";
  tapPrivacyBox.style.backgroundColor = "#758694";
  tapProfileBox.classList = "join_tab_profile_back_click";
  tabState = "Profile";
  joinIDBox.style.display = "none";
  joinPrivacyBox.style.display = "none";
  joinProfileBox.style.display = "block";
}
function exitJoinBtnEvent() {
  location.href = "../../jsp/page/index.jsp";
}
function setSelectBoxEvnet() {
  var scroll = document.getElementById("class_scroll"); // 첫 번째 자식 요소를 선택
  if (scrollState == "block") {
    scroll.style.display = "none";
    scrollState = "none";
  } else {
    scroll.style.display = "block";
    scrollState = "block";
  }
}

function checkJoinError() {
  var comparisonId = ["id", "pw", "pw-check"];
  var comparisonPrivacy = ["id", "pw", "pw-check", "name", "phone"];
  var comparisonProfile = ["id", "pw", "pw-check"];
  if (tabState == "ID") {
    const inputSet = new Set(errorCount);
    const comparisonSet = new Set(comparisonId);
    const additionalValues = [...comparisonSet].filter(
      (value) => !inputSet.has(value)
    );
    if (errorCount.length >= 3) {
      setPrivacyTabEvent();
      tapPrivacyBox.addEventListener("click", function (e) {
        setPrivacyTabEvent();
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
    if (errorCount.length >= 5) {
      setProfileTabEvent();
      tapProfileBox.addEventListener("click", function (e) {
        setProfileTabEvent();
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
      var dataList = getPrsentData();
      var path = "../../jsp/action/joinAction.jsp?";
      for (const key in dataList) {
        if (dataList.hasOwnProperty(key)) {
          path += `${key}=${dataList[key]}&`;
        }
      }
      path = path.slice(0, -1);
      location.href = path;
    } else {
      if (teamValue == "") {
        alert("부서를 선택하세요");
      } else {
        alert(additionalValues + "를 입력해주세요");
      }
    }
  }
}

function getPrsentData() {
  var radioText = "";
  var radios = document.querySelectorAll(".class_radio");
  radios.forEach(function (radio) {
    if (radio.checked) {
      radioText = radio.id;
    }
  });
  const formData = {
    id: document.getElementById("join_id_box").value,
    pw: document.getElementById("join_pw_box").value,
    name: document.getElementById("join_name_box").value,
    phone: document.getElementById("join_phone_box").value,
    position: radioText,
    team: document.querySelector(".class_select").innerHTML,
  };
  return formData;
}

function joinBackEvent() {
  moveEvent(joinContainer, loginContainer);
}

initPlaceHorderJoin();
initRadioBtn();
setIdTabEvent();
