var stateColor = "#ffcceb";

var scheduleList = [
  "일정 입니다 1",
  "일정 입니다 12",
  "일정 입니다 13",
  "일정 입니다 14",
  "일정 입니다 15",
  "일정 입니다 16",
];

function makeInputScroll() {
  var scheduleScroll = document.getElementById("schedule_scroll");
  scheduleList.forEach(function (element) {
    var scheduleContainer = document.createElement("div");
    scheduleContainer.classList = "schedule_list";
    var scheduleText = document.createElement("input");
    scheduleText.value = element;
    scheduleText.style.marginLeft = "10px";
    scheduleText.classList = "schedule_text";
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
    scheduleScroll.appendChild(scheduleContainer);
  });
}

function scheduleBtnEvent(renameBtn, deleteBtn, saveBtn, backBtn) {
  renameBtn.addEventListener("click", function () {
    renameBtn.style.display = "none";
    deleteBtn.style.display = "none";
    saveBtn.style.display = "block";
    backBtn.style.display = "block";
    var inputText =
      renameBtn.parentElement.parentElement.querySelector("input");
    inputText.style.pointerEvents = "auto";
    inputText.focus();
  });
  deleteBtn.addEventListener("click", function () {
    alert("삭제되었습니다");
    deleteBtn.parentElement.parentElement.remove();
  });

  saveBtn.addEventListener("click", function () {
    saveBtn.style.display = "none";
    backBtn.style.display = "none";
    renameBtn.style.display = "block";
    deleteBtn.style.display = "block";
    var inputText =
      renameBtn.parentElement.parentElement.querySelector("input");
    inputText.style.pointerEvents = "none";
  });

  backBtn.addEventListener("click", function () {
    saveBtn.style.display = "none";
    backBtn.style.display = "none";
    renameBtn.style.display = "block";
    deleteBtn.style.display = "block";
    var inputText =
      renameBtn.parentElement.parentElement.querySelector("input");
    inputText.style.pointerEvents = "none";
  });
}

function setColor() {
  var changeColorListback = [
    document.querySelector("input[type='time']"),
    document.getElementById("detail_btn_list"),
    document.querySelector("body"),
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
  location.href = "../html/schedule_page.html";
}

function initTime() {
  var now = new Date();
  var hours = now.getHours().toString().padStart(2, "0");
  var minutes = now.getMinutes().toString().padStart(2, "0");
  var formattedTime = `${hours}:${minutes}`;
  document.getElementById("time_input").value = formattedTime;
  var date = document.getElementById("date");
  date.innerHTML = `2020년 12월`;
}

function insertScheduleEvent() {
  alert("추가되었습니다");
}

function setPlacehorderSchedule() {
  var insertBox = document.getElementById("insert_box");
  insertBox.replaceChild(
    makePlacehorder("schedule_text", "스케줄", stateColor, "black", "text"),
    document.getElementById("schedule_input")
  );
}

initTime();
setColor();
makeInputScroll();
setPlacehorderSchedule();
