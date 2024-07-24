var color = ["body", "theme_btn"];
var watchState = "TEAM";
var stateColor = "#ffcceb";

function makeCalander(date) {
  var year = date.split("-")[0];
  var month = date.split("-")[1];
  const dateObj = new Date(year, month - 1, 1);
  const days = ["일", "월", "화", "수", "목", "금", "토"];
  var day = days[dateObj.getDay()];
  var daysNum = dateObj.getDay();
  var last = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

  var dayNumber = 1;
  var dayList = [];
  firstWeekList = [];

  for (i = 0; i < last[month - 1] + daysNum; i++) {
    if (i < daysNum) {
      dayList.push("");
    } else {
      dayList.push(dayNumber);
      dayNumber++;
    }
  }
  console.log(dayList);
  console.log(last[month - 1]);

  var weeks = [];
  for (var i = 0; i < dayList.length; i += 7) {
    weeks.push(dayList.slice(i, i + 7));
  }

  var calander = document.getElementById("month");

  Array.from(calander.children).forEach(function (child) {
    child.remove();
  });

  days.forEach(function (day, index) {
    var weekOfDay = document.createElement("th");
    weekOfDay.innerHTML = day;
    weekOfDay.id = "day" + day;
    if (index == 0) {
      weekOfDay.style.color = "#F24822";
    } else if (index == 6) {
      weekOfDay.style.color = "#0D99FF";
    }
    calander.appendChild(weekOfDay);
  });

  weeks.forEach(function (week) {
    var dayOfWeek = document.createElement("tr");
    week.forEach(function (present_week, index) {
      var day = document.createElement("td");
      day.innerHTML = setShedule(year, month, present_week);
      if ((index == 0) & (present_week != "")) {
        day.style.backgroundColor = "#F4D4D4";
      } else if ((index == 6) & (present_week != "")) {
        day.style.backgroundColor = "#D2D8F4";
      }
      dayOfWeek.appendChild(day);
    });
    calander.appendChild(dayOfWeek);
  });
}

function setChooseDate() {
  var chooseDate = document.getElementById("choose_date");
  chooseDate.addEventListener("change", function () {
    makeCalander(chooseDate.value);
    setDateEvent();
  });
}

function initDate() {
  const now = new Date();
  const year = now.getFullYear();
  const month = (now.getMonth() + 1).toString().padStart(2, "0"); // 두 자리 형식으로
  const day = now.getDate().toString().padStart(2, "0"); // 두 자리 형식으로
  const formattedDate = `${year}-${month}-${day}`;
  makeCalander(`${year}-${month}`);
  setDateEvent();
  const chooseDate = document.getElementById("choose_date");
  chooseDate.value = formattedDate;
}

function setShedule(year, month, day) {
  var scheduleCOunt = 0;
  var text = day;
  if (scheduleCOunt >= 1) {
    text = `${day}<br><br>일정 : ${scheduleCOunt}`;
  }
  return text;
}

var stateSize = "small";

function btnListEvent() {
  var redBtn = document.getElementById("red_btn");
  var yellowBtn = document.getElementById("yellow_btn");
  var greenBtn = document.getElementById("green_btn");
  var speechMenu = document.getElementById("speech_icon");

  redBtn.addEventListener("click", function () {
    location.href = "../html/index.html";
  });

  yellowBtn.addEventListener("click", function () {
    makeOpacityBox(speechMenu, 0.5);
    speechMenu.style.display = "flex";
    setWatchAllBtn();
    setcolorThemeBtn();
    setProfileMoveBtn();
  });
  greenBtn.addEventListener("click", function () {
    reSizeCalander();
  });
}
function setProfileMoveBtn() {
  document.getElementById("watch_profile_box").onclick = function () {
    location.href = "../html/profile_page.html";
  };
}

function makeOpacityBox(modal, opacityNumber) {
  var opacityBox = document.createElement("div");
  opacityBox.classList = "opacity_box";
  opacityBox.style.opacity = opacityNumber;
  document.querySelector("body").appendChild(opacityBox);
  opacityBox.addEventListener("click", function () {
    modal.style.display = "none";
    opacityBox.remove();
  });
}

function opacitySpeachDone() {
  var speechMenu = document.getElementById("speech_icon");
  var opacityBox = document.querySelector(".opacity_box");
  speechMenu.style.display = "none";
  opacityBox.remove();
}

function opacityColorDone() {
  var colorMenu = document.getElementById("modal_theme");
  var opacityBox = document.querySelector(".opacity_box");
  colorMenu.style.display = "none";
  opacityBox.remove();
}

function opacityDetailDone() {
  var detailMenu = document.getElementById("modal_detail");
  var opacityBox = document.querySelector(".opacity_box");
  detailMenu.style.display = "none";
  opacityBox.remove();
}

function setWatchAllBtn() {
  var watchAllBtn = document.getElementById("watch_all_box");
  watchAllBtn.onclick = function () {
    if (watchState == "TEAM") {
      watchAllBtn.children[0].src = "../image/schedule/empty_battery.png";
      watchAllBtn.children[1].innerHTML = "팀원만 보기";
      watchState = "USER";
      opacitySpeachDone();
    } else {
      watchAllBtn.children[0].src = "../image/schedule/full_battery.png";
      watchAllBtn.children[1].innerHTML = "전체 보기";
      watchState = "TEAM";
      opacitySpeachDone();
    }
  };
}

function setcolorThemeBtn() {
  var themeBtn = document.getElementById("set_theme_box");
  themeBtn.onclick = function () {
    opacitySpeachDone();
    colorThemeModal();
  };

  var themeCheckBtn = document.getElementById("color_check_btn");
  themeCheckBtn.onclick = function () {
    var themePresentColor = document.getElementById("color_choose_input");
    stateColor = themePresentColor.value;
    opacityColorDone();
    colorSet();
  };

  var colorModalRedBtn = document.getElementById("modal_red_btn");
  colorModalRedBtn.onclick = function () {
    opacityColorDone();
  };
}
function colorThemeModal() {
  var themeContainer = document.getElementById("modal_theme");
  themeContainer.style.display = "flex";
  makeOpacityBox(themeContainer, 0.5);
}

function colorSet() {
  var changeColorListBack = [
    document.querySelector("body"),
    document.getElementById("modal_btn_lsit"),
    document.getElementById("theme_btn"),
    document.getElementById("detail_btn_list"),
    document.querySelector("input[type='time']"),
  ];
  changeColorListBack.forEach(function (ele) {
    ele.style.backgroundColor = stateColor;
  });
  document.getElementById("color_choose_input").value = stateColor;

  var changeColorListBorder = [document.getElementById("insert_box")];
  changeColorListBorder.forEach(function (elemet) {
    elemet.style.borderColor = stateColor;
  });
  document.querySelectorAll(".schedule_list").forEach(function (ele) {
    ele.style.borderColor = stateColor;
  });

  var style = document.createElement("style");
  style.textContent = `
  ::-webkit-scrollbar-thumb {
    background-color: ${stateColor};
  }
`;
  // Append the style element to the head of the document
  document.head.appendChild(style);
}

function reSizeCalander() {
  var calander = document.getElementById("month");
  var inputClander = document.getElementById("choose_date");
  if (stateSize == "small") {
    calander.style.width = "90%";
    calander.style.height = "90%";
    stateSize = "big";
    inputClander.style.display = "none";
  } else if (stateSize == "big") {
    calander.style.width = "80%";
    calander.style.height = "80%";
    stateSize = "small";
    inputClander.style.display = "block";
  }
}

var scheduleList = [
  "일정 입니다 1",
  "일정 입니다 12",
  "일정 입니다 13",
  "일정 입니다 14",
  "일정 입니다 15",
  "일정 입니다 16",
];

function makeInputScroll() {
  var scheduleContainer = document.getElementById("shcedule_container");

  var scheduleScroll = document.createElement("div");
  scheduleScroll.id = "schedule_scroll";

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

    scheduleText.addEventListener("click", function () {
      var selectschedule = document.querySelector(".schedule_select");
    });
    scheduleScroll.appendChild(scheduleContainer);
  });
  scheduleContainer.appendChild(scheduleScroll);
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
function openModalScehdule(day) {
  console.log(day);
  var shceduleModal = document.getElementById("modal_detail");
  shceduleModal.style.display = "flex";
  var now = new Date();
  var hours = now.getHours().toString().padStart(2, "0");
  var minutes = now.getMinutes().toString().padStart(2, "0");
  var formattedTime = `${hours}:${minutes}`;
  shceduleModal.querySelector("input").value = formattedTime;
  var date = document.getElementById("date");
  var chooseDate = document.getElementById("choose_date");
  var chooseDateValue = chooseDate.value.split("-");
  date.innerHTML = `${chooseDateValue[0]}년 ${chooseDateValue[1]}월`;
  makeOpacityBox(shceduleModal, 0.5);
}

function doneModalSchedule() {
  document.getElementById("modal_detail").style.display = "none";
}

function setDateEvent() {
  var dateList = document.getElementById("month").querySelectorAll("td");
  dateList.forEach(function (day) {
    day.onclick = function () {
      openModalScehdule(day.innerHTML);
    };
  });
}

function setRedBtnEvent() {
  var redBtn = document.getElementById("detail_red_btn");
  redBtn.onclick = function () {
    opacityDetailDone();
  };
}

initDate();
setChooseDate();
btnListEvent();
makeInputScroll();
colorSet();
setRedBtnEvent();
