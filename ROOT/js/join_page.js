function makeInputjoinID() {
  var joinBox = document.getElementById("join_file_content");
  if (joinBox.children.length != 0) {
    while (joinBox.firstChild) {
      joinBox.removeChild(joinBox.firstChild);
    }
  }

  joinBox.appendChild(
    makePlacehorder("join_id", "아이디 입력", "#EEEEEE", "black")
  );
  joinBox.appendChild(makeInputError("join", "id"));

  joinBox.appendChild(
    makePlacehorder("join_pw", "비밀번호 입력", "#EEEEEE", "black")
  );
  joinBox.appendChild(makeInputError("join", "pw"));

  joinBox.appendChild(
    makePlacehorder("join_pw_check", "비밀번호 확인", "#EEEEEE", "black")
  );
  joinBox.appendChild(makeInputError("join", "pw_check"));

  joinBox.querySelectorAll(".placehorder_box").forEach(function (e) {
    e.type = "password";
  });
  document.getElementById("join_id_box").type = "text";
  joinBox.appendChild(makeSearchBtn());
}
function makeInputJoinPrivacy() {
  var joinBox = document.getElementById("join_file_content");
  if (joinBox.children.length != 0) {
    while (joinBox.firstChild) {
      joinBox.removeChild(joinBox.firstChild);
    }
  }
  joinBox.appendChild(
    makePlacehorder("join_name", "이름 입력", "#EEEEEE", "black")
  );
  joinBox.appendChild(makeInputError("join", "name"));

  joinBox.appendChild(
    makePlacehorder("join_phone", "전화번호 입력", "#EEEEEE", "black")
  );
  joinBox.appendChild(makeInputError("join", "phone"));

  joinBox.appendChild(makeSearchBtn());
}

function makeInputJoinProfile() {
  var selectContainer = document.createElement("div");
  selectContainer.id = "select_container";
  var selectClass = document.createElement("div");
  selectClass.innerHTML = "부서 선택";
  selectClass.classList = "class_select";
  selectContainer.appendChild(selectClass);

  var checkImg = document.createElement("p");
  checkImg.innerHTML = ">";
  checkImg.id = "check_img";
  selectContainer.appendChild(checkImg);

  var joinBox = document.getElementById("join_file_content");
  if (joinBox.children.length != 0) {
    while (joinBox.firstChild) {
      joinBox.removeChild(joinBox.firstChild);
    }
  }
  joinBox.appendChild(makeJoinRadioBtn());
  joinBox.appendChild(makeSearchBtn());
  joinBox.appendChild(selectContainer);
  joinBox.appendChild(makeInputSelect());
  raidoBtnRepeatCheck();
}

function makeInputSelect() {
  var classNameList = ["욜로 부서", "욜로 부서", "욜로 부서", "욜로 부서"];

  var classScroll = document.createElement("div");

  classNameList.forEach(function (element) {
    var className = document.createElement("div");
    className.innerHTML = element;
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
  var searchBtnBox = document.createElement("div");
  searchBtnBox.id = "join_search_box";
  var joinSearchBtn = document.createElement("button");
  joinSearchBtn.id = "join_search_btn";
  searchBtnBox.appendChild(joinSearchBtn);
  return searchBtnBox;
}

function setJoinPageEvent() {
  var tapIDBox = document.getElementById("join_tab_id_back");
  var tapPrivacyBox = document.getElementById("join_tab_privacy_back");
  var tapProfileBox = document.getElementById("join_tab_profile_back");
  tapIDBox.addEventListener("click", function (e) {
    tapIDBox.style.backgroundColor = "#373A40";
    tapPrivacyBox.style.backgroundColor = "#758694";
    tapProfileBox.style.cssText =
      "  width: 120px;height: 0px;border-left: 9px solid transparent;border-right: 9px solid transparent;border-bottom: 25px solid #758694;";
    makeInputjoinID();
    tabState = "ID";
  });

  tapPrivacyBox.addEventListener("click", function (e) {
    tapIDBox.style.backgroundColor = "#758694";
    tapPrivacyBox.style.backgroundColor = "#373A40";
    tapProfileBox.style.cssText =
      "  width: 120px;height: 0px;border-left: 9px solid transparent;border-right: 9px solid transparent;border-bottom: 25px solid #758694;";
    makeInputJoinPrivacy();
    tabState = "Privacy";
  });

  tapProfileBox.addEventListener("click", function (e) {
    tapIDBox.style.backgroundColor = "#758694";
    tapPrivacyBox.style.backgroundColor = "#758694";
    tapProfileBox.style.cssText =
      "  width: 120px;height: 0px;border-left: 9px solid transparent;border-right: 9px solid transparent;border-bottom: 25px solid #373A40;";
    makeInputJoinProfile();
    tabState = "Profile";
  });

  var exitBtn = document.getElementById("join_btn_red");
  exitBtn.addEventListener("click", function () {
    location.href = "../html/index.html";
  });
}

setJoinPageEvent();
