var profileBack = document.getElementById("profile_text_box");
var renameContainer = document.getElementById("profile_rename_container");
var modalDelete = document.getElementById("delete_container");
var presentState = "default";
var front = document.getElementById("front_container");
var back = document.getElementById("back_container");

// 색상 설정
function setColor(color) {
  color = "#" + color;
  console.log(color);
  var backColor = [document.querySelector("body")];
  backColor.forEach(function (ele) {
    ele.style.backgroundColor = color;
  });
}

// 수정 상태로 변경 이벤트
function reNameEvent() {
  if (presentState == "default") {
    front.style.transform = "rotateY(-180deg)";
    back.style.transform = "rotateY(-0deg)";
    presentState = "rename";
    profileBack.style.display = "none";
    renameContainer.style.display = "block";
  } else {
    front.style.transform = "rotateY(0deg)";
    back.style.transform = "rotateY(-180deg)";
    setTimeout(function () {
      front.style.transform = "";
      back.style.transform = "";
      presentState = "default";
      profileBack.style.display = "block";
      renameContainer.style.display = "none";
      Array.from(renameContainer.querySelectorAll("input")).forEach(function (
        tag
      ) {
        tag.parentNode.remove();
      });
      initPlacehorder();
    }, 1000);
  }
}

// 플레이스 홀더 생성
function initPlacehorder() {
  var btn = document.getElementById("rename_btn");
  renameContainer.insertBefore(
    makePlacehorder(
      "profile_pw-old",
      "현재 비밀번호",
      "#EEEEEE",
      "black",
      "password"
    ),
    btn
  );
  renameContainer.insertBefore(
    makePlacehorder(
      "profile_pw",
      "새 비밀번호 ",
      "#EEEEEE",
      "black",
      "password"
    ),
    btn
  );
  renameContainer.insertBefore(
    makePlacehorder(
      "profile_pw-check",
      "새 비밀번호 확인",
      "#EEEEEE",
      "black",
      "password"
    ),
    btn
  );
  renameContainer.style.display = "none";
}

// 데이터 가져와서 프로필 텍스트 세팅
function initText(id, name, phone, position, teamName) {
  var nameTag = document.getElementById("user_name");
  nameTag.innerHTML = name;
  var teamTag = document.getElementById("team_name");
  teamTag.innerHTML = teamName;
  let User = {
    id: id,
    phone: phone,
    class: position,
  };
  Object.entries(User).forEach(function (userData) {
    var text = document.createElement("p");
    text.innerHTML = `${userData[0]} : ${userData[1]}`;
    profileBack.appendChild(text);
  });
}

// 수정 버튼 클릭 이벤트
function renameBtnEvent() {
  var oldPw = document.getElementById("profile_pw-old_box").value;
  var newPw = document.getElementById("profile_pw_box").value;
  if (oldPw == newPw) {
    alert("비밀번호가 똑같습니다 ");
  } else if (errorCount.length == 3) {
    if (pw != oldPw) {
      alert("현재 비밀번호가 틀립니다");
    } else {
      location.href =
        "../../jsp/action/profileRenameAction.jsp?old-pw=" +
        oldPw +
        "&new-pw=" +
        newPw;
    }
  } else {
    alert("올바르게 입력하세요");
  }
}

// 나가기 버튼 이벤트
function exitEvent() {
  location.href = "../../jsp/page/schedule_page.jsp";
}

// 모달창 닫기 이벤트
function deleteDoneEvent() {
  var opa = document.querySelector(".opacity_box");
  modalDelete.style.display = "none";
  opa.remove();
}

function deleteEvent() {
  location.href = "../../jsp/action/profileDeleteAction.jsp";
}

// 모달창 열기 이벤트
function makeOpacityBoxEvent() {
  modalDelete.style.display = "flex";
  var opacityBox = document.createElement("div");
  opacityBox.classList = "opacity_box";
  opacityBox.style.opacity = 0.5;
  document.querySelector("body").appendChild(opacityBox);
  opacityBox.addEventListener("click", function () {
    deleteDoneEvent();
  });
}

initPlacehorder();
