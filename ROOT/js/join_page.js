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
var classContainer = document.getElementById("class_container");
var selectClass = document.querySelector(".class_select");

// 플레이스 홀더 생성
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

// 셀렉트 인풋 세팅
function initSelectBox(team) {
  var classNameList = team;
  var classScroll = document.getElementById("class_scroll");
  classNameList.forEach(function (element) {
    var className = document.createElement("div");
    className.innerHTML = element;
    className.classList = "class_list";
    className.addEventListener("click", function () {
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

// 라디오 버튼 세팅
function initRadioBtn() {
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
    classText.classList.add("font_size_medium");
    classBox.appendChild(classRadio);
    classBox.appendChild(classText);
    classContainer.appendChild(classBox);
  }
  raidoBtnRepeatCheck();
}

// 라디오 버튼 증복 클릭 방지
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

// 이벤트가 클릭이면 클릭 단어를 넣어주는게 좋다
// 아이디 탭 클릭 이벤트
function setIdTabEvent() {
  tapIDBox.classList = "tab_click";
  tapPrivacyBox.classList = "tab_non_click";
  tapProfileBox.classList = "join_tab_profile_back";
  tabState = "ID";
  joinIDBox.style.display = "block";
  joinPrivacyBox.style.display = "none";
  joinProfileBox.style.display = "none";
}

// 개인정보 탭 클릭 이벤트
function setPrivacyTabEvent() {
  tapIDBox.classList = "tab_non_click";
  tapPrivacyBox.classList = "tab_click";
  tapProfileBox.classList = "join_tab_profile_back";
  tabState = "Privacy";
  joinIDBox.style.display = "none";
  joinPrivacyBox.style.display = "block";
  joinProfileBox.style.display = "none";
}

// 프로필 탭 클릭 이벤트
function setProfileTabEvent() {
  tapIDBox.classList = "tab_non_click";
  tapPrivacyBox.classList = "tab_non_click";
  tapProfileBox.classList = "join_tab_profile_back_click";
  tabState = "Profile";
  joinIDBox.style.display = "none";
  joinPrivacyBox.style.display = "none";
  joinProfileBox.style.display = "block";
}

// 나가기 이벤트
function exitJoinBtnEvent() {
  location.href = "../../jsp/page/index.jsp";
}

// 인풋 셀렉트 클릭 이벤트
function setSelectBoxEvnet() {
  var scroll = document.getElementById("class_scroll");
  if (scrollState == "block") {
    scroll.style.display = "none";
    scrollState = "none";
  } else {
    scroll.style.display = "block";
    scrollState = "block";
  }
}

// 정규표현식 검사
function checkJoinError() {
  var comparisonId = ["id", "pw", "pw-check"];
  var comparisonPrivacy = ["id", "pw", "pw-check", "name", "phone"];
  var comparisonProfile = ["id", "pw", "pw-check"];
  console.log(errorCount);
  // 아이디 탭일때 증복체크
  if (tabState == "ID") {
    // 증복 제거
    // 플레이스 홀더에서 자체 적으로 error카운트 배열을 만든다
    // 정규표현식에 맞을경우 errorCount에 자기 id를 add 해준다
    const inputSet = new Set(errorCount);
    const comparisonSet = new Set(comparisonId);
    // 증복 제거 한 배열 배열화 후 값이 있는지 확인
    const additionalValues = [...comparisonSet].filter(
      (value) => !inputSet.has(value)
    );
    // 아이디 탭의 정규표현식 검사는 3개이므로 3이상이면 통과
    if ([...inputSet].length >= 3) {
      setPrivacyTabEvent();
      tapPrivacyBox.addEventListener("click", setPrivacyTabEvent);
    } else {
      alert(additionalValues + "를 입력해주세요");
    }
  } else if (tabState == "Privacy") {
    const inputSet = new Set(errorCount);
    const comparisonSet = new Set(comparisonPrivacy);
    const additionalValues = [...comparisonSet].filter(
      (value) => !inputSet.has(value)
    );
    if ([...inputSet].length >= 5) {
      setProfileTabEvent();
      tapProfileBox.addEventListener("click", setProfileTabEvent);
    } else {
      alert(additionalValues + "를 입력해주세요");
    }
  } else if (tabState == "Profile") {
    const inputSet = new Set(errorCount);
    const comparisonSet = new Set(comparisonProfile);
    const additionalValues = [...comparisonSet].filter(
      (value) => !inputSet.has(value)
    );
    if ([...inputSet].length == 5 && teamValue != "") {
      var dataList = getPrsentData();
      var path = "../../jsp/action/joinAction.jsp?";
      for (const key in dataList) {
        if (dataList.hasOwnProperty(key)) {
          path += `${key}=${dataList[key]}&`;
        }
      }
      // & 잘라내기
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

// 현재 입력 데이터 가져오기
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
    "pw-check": document.getElementById("join_pw-check_box").value,
    name: document.getElementById("join_name_box").value,
    phone: document.getElementById("join_phone_box").value,
    position: radioText,
    team: document.querySelector(".class_select").innerHTML,
  };
  return formData;
}

// 가입 페이지 닫기
function joinBackEvent() {
  moveEvent(joinContainer, loginContainer);
  tapPrivacyBox.removeEventListener("click", setPrivacyTabEvent);
  tapProfileBox.removeEventListener("click", setProfileTabEvent);
  joinContainer.querySelectorAll("input").forEach(function (tag) {
    tag.value = "";
    // input 이벤트를 수동으로 트리거합니다.
    var event = new Event("input", {
      bubbles: true,
      cancelable: true,
    });
    tag.dispatchEvent(event);
  });
  selectClass.innerHTML = "부서 선택";
  setIdTabEvent();
}

// -------------------------함수
initPlaceHorderJoin();
initRadioBtn();
// -------------------------이벤트 함수
setIdTabEvent();
