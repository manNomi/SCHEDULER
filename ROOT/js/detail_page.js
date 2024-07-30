var stateColor = "";
var modal = document.getElementById("modal_container");
var dateText = "";

function makeInputScroll(contentList, timeList) {
  console.log(contentList, timeList);

  var scheduleScroll = document.getElementById("schedule_scroll");
  contentList.forEach(function (content, index) {
    var scheduleContainer = document.createElement("div");
    scheduleContainer.classList = "schedule_list";

    var scheduleTime = document.createElement("input");
    scheduleTime.type = "time";
    var time = timeList[index].split(":");
    console.log(`${time[0]}:${time[1]}`);
    scheduleTime.value = `${time[0]}:${time[1]}`;
    scheduleTime.classList = "schedule_time";

    var scheduleText = document.createElement("input");
    scheduleText.value = content;
    scheduleText.classList = "schedule_text";
    scheduleContainer.appendChild(scheduleTime);
    scheduleContainer.appendChild(scheduleText);

    var btnBox = document.createElement("div");
    btnBox.classList = "schedule_box";

    var scheduleRename = document.createElement("button");
    scheduleRename.classList = "img_btn";
    scheduleRename.classList.add("schedule_rename");
    var scheduleDelete = document.createElement("button");
    scheduleDelete.classList = "img_btn";
    scheduleDelete.classList.add("schedule_delete");
    var scheduleSave = document.createElement("button");
    scheduleSave.classList = "img_btn";
    scheduleSave.classList.add("schedule_save");

    var scheduleBack = document.createElement("button");
    scheduleBack.classList = "img_btn";
    scheduleBack.classList.add("schedule_back");

    btnBox.appendChild(scheduleRename);
    btnBox.appendChild(scheduleDelete);
    btnBox.appendChild(scheduleSave);
    btnBox.appendChild(scheduleBack);
    scheduleSave.style.display = "none";
    scheduleBack.style.display = "none";
    scheduleContainer.appendChild(btnBox);
    scheduleBtnEvent(
      scheduleRename,
      scheduleDelete,
      scheduleSave,
      scheduleBack
    );
    scheduleContainer.style.borderColor = stateColor;
    scheduleScroll.appendChild(scheduleContainer);
  });
}

var clickTime = "";
var clickText = "";

function scheduleBtnEvent(renameBtn, deleteBtn, saveBtn, backBtn) {
  renameBtn.addEventListener("click", function () {
    renameBtn.style.display = "none";
    deleteBtn.style.display = "none";
    saveBtn.style.display = "block";
    backBtn.style.display = "block";
    var inputText =
      renameBtn.parentElement.parentElement.querySelectorAll("input");
    clickTime = inputText[0].value;
    clickText = inputText[1].value;
    inputText.forEach(function (ele) {
      ele.style.pointerEvents = "auto";
      ele.focus();
    });
  });
  deleteBtn.addEventListener("click", function () {
    makeOpacityBox("삭제하시겠습니까?", "삭제", 0.5);
  });

  saveBtn.addEventListener("click", function () {
    makeOpacityBox("수정하시겠습니까?", "수정", 0.5);
  });

  backBtn.addEventListener("click", function () {
    saveBtn.style.display = "none";
    backBtn.style.display = "none";
    renameBtn.style.display = "block";
    deleteBtn.style.display = "block";
    var inputText =
      renameBtn.parentElement.parentElement.querySelectorAll("input");
    inputText[0].value = clickTime;
    inputText[1].value = clickText;
    inputText.forEach(function (ele) {
      ele.style.pointerEvents = "none";
    });
  });
}

function makeOpacityBox(text, btnText, opacityNumber) {
  document.getElementById("modal_text").innerHTML = text;
  document.getElementById("event_btn").innerHTML = btnText;
  modal.style.display = "flex";
  var opacityBox = document.createElement("div");
  opacityBox.classList = "opacity_box";
  opacityBox.style.opacity = opacityNumber;
  document.querySelector("body").appendChild(opacityBox);
  opacityBox.addEventListener("click", function () {
    modalDoneEvnet();
  });
}

function saveEvent() {
  saveBtn.style.display = "none";
  backBtn.style.display = "none";
  renameBtn.style.display = "block";
  deleteBtn.style.display = "block";
  var inputText =
    renameBtn.parentElement.parentElement.querySelectorAll("input");
  inputText.forEach(function (ele) {
    ele.style.pointerEvents = "none";
  });
}

function deleteEvent() {
  location.reload(true);
}

function modalEvent(e) {
  if (e.target.innerHTML == "수정") {
    saveEvent();
  } else if (e.target.innerHTML == "삭제") {
    deleteEvent();
  }
}

function modalDoneEvnet() {
  modal.style.display = "none";
  var opacityBox = document.querySelector(".opacity_box");
  opacityBox.remove();
}

function setColor() {
  var changeColorListback = [
    document.querySelector("input[type='time']"),
    document.getElementById("detail_btn_list"),
    document.querySelector("body"),
    document.getElementById("schedule_text_box"),
    document.getElementById("modal_btn_list"),
  ];
  changeColorListback.forEach(function (elemet) {
    elemet.style.backgroundColor = stateColor;
  });

  var changeColorListBorder = [document.getElementById("insert_box")];
  changeColorListBorder.forEach(function (ele) {
    ele.style.borderColor = stateColor;
  });

  document.querySelectorAll(".schedule_list").forEach(function (ele) {
    ele.style.borderColor = stateColor;
  });
  var style = document.createElement("style");
  style.textContent = `
  ::-webkit-scrollbar-thumb {
    background-color: ${stateColor};}`;
  document.head.appendChild(style);
}

function exitBtnEvent() {
  location.href = "../../jsp/page/schedule_page.jsp?day=" + dateText;
}

function initTime(date_day) {
  var now = new Date();
  var hours = now.getHours().toString().padStart(2, "0");
  var minutes = now.getMinutes().toString().padStart(2, "0");
  var formattedTime = `${hours}:${minutes}`;
  document.getElementById("time_input").value = formattedTime;
  var date = document.getElementById("date");
  date.innerHTML = date_day;
}

function insertScheduleEvent() {
  var dateValue = document.getElementById("date").innerHTML;
  var timeValue = document.getElementById("time_input").value;
  var contentValue = document.getElementById("schedule_text_box").value;
  location.href =
    "../action/schInsertAction.jsp?day=" +
    dateValue +
    "&time=" +
    timeValue +
    "&content=" +
    contentValue;
}

function setPlacehorderSchedule() {
  var placeHorderBox = document.getElementById("placehorder");
  placeHorderBox.replaceChild(
    makePlacehorder("schedule_text", "스케줄", stateColor, "black", "text"),
    document.getElementById("schedule_input")
  );
  placeHorderBox.querySelector(".error_guide_message").style.display = "none";
  var scheduleContainer = document.getElementById("schedule_text_container");
  scheduleContainer.style.width = "100%";
  var scheduleBox = document.getElementById("schedule_text_box");
  scheduleBox.style.width = "100%";
}

setPlacehorderSchedule();
