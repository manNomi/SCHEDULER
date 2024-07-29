var stateColor = "#ffcceb";
var profileBack = document.getElementById("profile_text_box");
var renameContainer = document.getElementById("profile_rename_container");
var presentState = "default";

function colorSet() {
  var backColor = [document.querySelector("body")];
  backColor.forEach(function (ele) {
    ele.style.backgroundColor = stateColor;
  });
}

var front = document.getElementById("front_container");
var back = document.getElementById("back_container");

function reNameEvent() {
  console.log("수정");
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
      console.log("Qwe");
      presentState = "default";
      profileBack.style.display = "block";
      renameContainer.style.display = "none";
      Array.from(renameContainer.children).forEach(function (tag) {
        tag.remove();
      });
      initPlacehorder();
    }, 1000);
  }
}
function initPlacehorder() {
  var btn = document.getElementById("rename_btn");
  renameContainer.insertBefore(
    makePlacehorder(
      "profile_pw-old",
      "이전 비밀번호",
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

function initText() {
  let User = {
    id: "",
    password: "",
    phone: "",
    class: "",
  };
  Object.entries(User).forEach(function (userData) {
    var text = document.createElement("p");
    text.innerHTML = `${userData[0]} : ${userData[1]}`;
    profileBack.appendChild(text);
  });
}

function renameBtnEvent() {
  var oldPw = document.getElementById("profile_pw-old_box").value;
  var newPw = document.getElementById("profile_pw_box").value;
  if (oldPw == newPw) {
    alert("비밀번호가 똑같습니다 ");
  } else if (errorCount.length == 3) {
    alert("수정 시도");
    location.href = "../../jsp/page/index.jsp";
  } else {
    alert("올바르게 입력하세요");
  }
}

function exitEvent() {
  location.href = "../../jsp/page/schedule_page.jsp";
}

function deleteOpenEvent() {
  var modalDelete = document.getElementById("delete_container");
  makeOpacityBox(modalDelete, 0.5);
}

function deleteEvent() {
  alert("삭제 시도 ");
  location.href = "../../jsp/page/index.jsp";
}

function cancleEvent() {}

function makeOpacityBox(modal, opacityNumber) {
  modal.style.display = "flex";
  var opacityBox = document.createElement("div");
  opacityBox.classList = "opacity_box";
  opacityBox.style.opacity = opacityNumber;
  document.querySelector("body").appendChild(opacityBox);
  opacityBox.addEventListener("click", function () {
    modal.style.display = "none";
    opacityBox.remove();
  });
}

colorSet();
initText();
initPlacehorder();
