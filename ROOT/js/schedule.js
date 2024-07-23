var color = ["body", "theme_btn"];
var watchState = "TEAM";

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
  });
}

function initDate() {
  const now = new Date();
  const year = now.getFullYear();
  const month = (now.getMonth() + 1).toString().padStart(2, "0"); // 두 자리 형식으로
  const day = now.getDate().toString().padStart(2, "0"); // 두 자리 형식으로
  const formattedDate = `${year}-${month}-${day}`;
  makeCalander(`${year}-${month}`);
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

function yellowBtnEvent() {
  var yellowBtn = document.getElementById("yellow_btn");
  var speechMenu = document.getElementById("speech_icon");

  yellowBtn.addEventListener("click", function () {
    makeOpacityBox(speechMenu, 0.5);
    speechMenu.style.display = "flex";
    setWatchAllBtn();
  });
}

function makeOpacityBox(madal, opacityNumber) {
  var opacityBox = document.createElement("div");
  opacityBox.classList = "opacity_box";
  opacityBox.style.opacity = opacityNumber;
  document.querySelector("body").appendChild(opacityBox);
  opacityBox.addEventListener("click", function () {
    madal.style.display = "none";
    opacityBox.remove();
  });
}

function opacitySpeachDone() {
  var speechMenu = document.getElementById("speech_icon");
  var opacityBox = document.querySelector(".opacity_box");
  speechMenu.style.display = "none";
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

initDate();
setChooseDate();
yellowBtnEvent();
