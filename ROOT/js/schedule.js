var color = ["body", "theme_btn"];
var watchState = "TEAM";
var stateColor = "";
var stateSize = "small";
const chooseDate = document.getElementById("choose_date");

function makeCalander(date, countDate) {
  date = date.split("-");
  var year = date[0];
  var month = date[1];
  var day_format = date[2];
  var myCount = countDate.split("_")[0].split("]")[1];
  var allCount = countDate.split("_")[1].split("]")[1];
  myCount = myCount.split("-");
  allCount = allCount.split("-");
  myCount.pop();
  allCount.pop();
  var countDateList = [];
  var processedCounts = new Set();
  myCount.forEach(function (count) {
    // 이미 처리된 항목은 무시
    if (processedCounts.has(count)) return;
    // 현재 항목과 일치하는 항목을 필터링하여 countList를 생성
    var countList = myCount.filter(function (ele) {
      return ele === count;
    });
    // myCount에서 countList 요소들을 제거합니다.
    myCount = myCount.filter(function (ele) {
      return ele !== count;
    });
    // countList와 해당 항목을 countDateList에 추가합니다.
    countDateList.push([count, countList.length]);

    // 현재 항목을 처리된 항목 세트에 추가합니다.
    processedCounts.add(count);
  });

  console.log(countDateList);

  chooseDate.value = `${year}-${month}-${day_format}`;
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
      day.innerHTML = present_week;
      day.id = present_week;
      var plan = 0;

      countDateList.forEach(function (ele) {
        var idxText = "";
        if (present_week < 10) {
          idxText = "0" + present_week;
        }
        if (ele[0] == idxText) {
          plan = ele[1];
        }
      });
      if (plan >= 1) {
        day.innerHTML = `${present_week} <br><br>일정 : ${plan}`;
      }

      if ((index == 0) & (present_week != "")) {
        day.style.backgroundColor = "#F4D4D4";
      } else if ((index == 6) & (present_week != "")) {
        day.style.backgroundColor = "#D2D8F4";
      }
      day.onclick = function (ele) {
        var chooseDateValue = chooseDate.value.split("-");
        var date = ele.target.id;
        if (date < 10) {
          date = "0" + date;
        }
        var url =
          "../../jsp/page/detail_page.jsp?day=" +
          chooseDateValue[0] +
          "-" +
          chooseDateValue[1] +
          "-" +
          date;
        location.href = url;
      };
      dayOfWeek.appendChild(day);
    });
    calander.appendChild(dayOfWeek);
  });
}

function exitBtnEvent() {
  location.href = "../../jsp/action/logoutAction.jsp";
}

function menuBtnEvent() {
  var speechMenu = document.getElementById("speech_icon");
  makeOpacityBox(speechMenu, 0.5);
}

function setProfileMoveEvent() {
  location.href = "../../jsp/page/profile_page.jsp";
}

function whatchAllBtnEvent() {
  var watchAllBtn = document.getElementById("watch_all_box");
  watchAllBtn.onclick = function () {
    if (watchState == "TEAM") {
      watchAllBtn.children[0].src = "../../image/schedule/empty_battery.png";
      watchAllBtn.children[1].innerHTML = "팀원만 보기";
      watchState = "USER";
      opacitySpeachDone();
    } else {
      watchAllBtn.children[0].src = "../../image/schedule/full_battery.png";
      watchAllBtn.children[1].innerHTML = "전체 보기";
      watchState = "TEAM";
      opacitySpeachDone();
    }
  };
}

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

function opacitySpeachDone() {
  var speechMenu = document.getElementById("speech_icon");
  var opacityBox = document.querySelector(".opacity_box");
  speechMenu.style.display = "none";
  opacityBox.remove();
}

function opacityGuideDone() {
  var modal = document.getElementById("modal_guide");
  modal.style.display = "none";
  var opacityBox = document.querySelector(".opacity_box");
  opacityBox.remove();
}

function colorThemeMove() {
  location.href = "../../jsp/page/theme_page.jsp";
}

function colorSet() {
  var changeColorListBack = [
    document.querySelector("body"),
    document.getElementById("theme_btn"),
  ];
  changeColorListBack.forEach(function (ele) {
    ele.style.backgroundColor = stateColor;
  });
}

function reSizeCalanderEvent() {
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
function setPresentDate(e) {
  location.href = "../../jsp/page/schedule_page.jsp?day=" + e.target.value;
}
