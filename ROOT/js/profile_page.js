var profileBack = document.getElementById("profile_text_box");
var renameContainer = document.getElementById("profile_rename_container");
var modalDelete = document.getElementById("delete_container");
var presentState = "default";
var front = document.getElementById("front_container");
var back = document.getElementById("back_container");

function setColor(color) {
  color = "#" + color;
  console.log(color);
  var backColor = [document.querySelector("body")];
  backColor.forEach(function (ele) {
    ele.style.backgroundColor = color;
  });
}

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

function exitEvent() {
  location.href = "../../jsp/page/schedule_page.jsp";
}

function deleteDoneEvent() {
  var opa = document.querySelector(".opacity_box");
  modalDelete.style.display = "none";
  opa.remove();
}

function deleteOpenEvent() {
  makeOpacityBox(0.5);
}

function deleteEvent() {
  location.href = "../../jsp/action/profileDeleteAction.jsp";
}

function makeOpacityBox(opacityNumber) {
  modalDelete.style.display = "flex";
  var opacityBox = document.createElement("div");
  opacityBox.classList = "opacity_box";
  opacityBox.style.opacity = opacityNumber;
  document.querySelector("body").appendChild(opacityBox);
  opacityBox.addEventListener("click", function () {
    deleteDoneEvent();
  });
}

initPlacehorder();
