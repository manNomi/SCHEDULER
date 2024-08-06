var color = ["body", "theme_btn"];
var watchState = "USER";
var stateColor = "";
var stateSize = "small";
const chooseDate = document.getElementById("choose_date");
var calander = document.getElementById("month");

var countMyList = [];
var countAllList = [];

//스케줄 개수 가져오기
function getData(countDate) {
  // 모든 스케줄을 날짜 형식으로 -(하이픈)을 연결해서 가져온다
  // 전제 스케줄과는 _(아래 하이폰으로 구분)
  // 예시
  // [본인]01-01-01-01-02-24-_[전체]01-01-01-01-01-01-01-01-02-02-24-
  var myCount = countDate.split("_")[0].split("]")[1];
  var allCount = "";
  if (countDate.split("_")[1] != null) {
    allCount = countDate.split("_")[1].split("]")[1];
  }
  if (allCount != null) {
    allCount = allCount.split("-");
    allCount.pop();
    // Set 객체는 증복을 허용하지 않는 점을 이용
    var processedCountsAll = new Set();
    for (var i = 0; i < allCount.length; i++) {
      var count = allCount[i];
      // 증복체크
      if (processedCountsAll.has(count)) {
        continue;
      }
      // 현재 날짜와 같은 스케줄을 모두 찾는다
      var countList = allCount.filter(function (ele) {
        return ele == count;
      });
      // 같은 스케줄을 리스트에서 삭제한다
      allCount = allCount.filter(function (ele) {
        return ele != count;
      });
      // 날짜와 날짜의 스케줄개수를 저장
      countAllList.push([count, countList.length]);
      // 증복체크 객체에 저장
      processedCountsAll.add(count);
      i = -1;
    }

    myCount = myCount.split("-");
    myCount.pop();
    var processedCountsMy = new Set();
    for (var i = 0; i < myCount.length; i++) {
      var count = myCount[i];
      if (processedCountsMy.has(count)) continue;
      var countList = myCount.filter(function (ele) {
        return ele === count;
      });
      myCount = myCount.filter(function (ele) {
        return ele !== count;
      });
      countMyList.push([count, countList.length]);
      processedCountsMy.add(count);
      i = -1;
    }
  }
}

// 달력 만들기
function makeCalander(date) {
  date = date.split("-");
  var year = date[0];
  var month = date[1];
  var day_format = date[2];
  var countDateList = [];

  // getData로 가져온 데이터
  if (watchState == "TEAM") {
    countDateList = countAllList;
  } else {
    countDateList = countMyList;
  }

  chooseDate.value = `${year}-${month}-${day_format}`;
  // 데이트 객체는 month -1 해줘야 그 달임 0 부터 시작해서
  const dateObj = new Date(year, month - 1, 1);
  const days = ["일", "월", "화", "수", "목", "금", "토"];
  // 그 달의 첫번째 날의 요일 인덱스를 가져옴
  // 0 -> 일요일
  var daysNum = dateObj.getDay();
  // 매달 마지막 날짜 저장
  var last = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  var dayNumber = 1;
  var dayList = [];
  firstWeekList = [];

  // 요일 숫자 보다 작으면 공백 아닐경우 숫자를 넣는다
  for (i = 0; i < last[month - 1] + daysNum; i++) {
    if (i < daysNum) {
      dayList.push("");
    } else {
      dayList.push(dayNumber);
      dayNumber++;
    }
  }
  var weeks = [];
  // 7일단위로 끊기
  for (var i = 0; i < dayList.length; i += 7) {
    weeks.push(dayList.slice(i, i + 7));
  }

  // 캘린더 초기화
  Array.from(calander.children).forEach(function (child) {
    child.remove();
  });

  // 요일 만들기
  days.forEach(function (day, index) {
    var weekOfDay = document.createElement("th");
    weekOfDay.innerHTML = day;
    weekOfDay.id = "day" + day;
    if (index == 0) {
      weekOfDay.classList.add("day_red");
    } else if (index == 6) {
      weekOfDay.classList.add("day_blue");
    }
    calander.appendChild(weekOfDay);
  });

  // 날짜 만들기
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
        // ele[0] 은 날짜 ele[0]은 값
        if (ele[0] == idxText) {
          plan = ele[1];
        }
      });
      // 너무 크면 ... 처리
      if (plan > 999) {
        plan = "999...";
      }
      // 스케줄이 있으면 표시
      if (plan >= 1) {
        if (watchState == "TEAM") {
          day.innerHTML = `${present_week} <br><br>전체일정 : ${plan}`;
        } else {
          day.innerHTML = `${present_week} <br><br>개인일정 : ${plan}`;
        }
      }

      if ((index == 0) & (present_week != "")) {
        day.classList.add("back_red");
      } else if ((index == 6) & (present_week != "")) {
        day.classList.add("back_blue");
      }
      // 클릭 이벤트 등록 디테일페이지 이동
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
          date +
          "&watchState=" +
          watchState;
        location.href = url;
      };
      dayOfWeek.appendChild(day);
    });
    calander.appendChild(dayOfWeek);
  });
}

// 로그아웃
function exitBtnEvent() {
  location.href = "../../jsp/action/logoutAction.jsp";
}

// 메뉴 모달창 생성
function menuBtnEvent() {
  var speechMenu = document.getElementById("speech_icon");
  makeOpacityBox(speechMenu, 0.5);
}

// 프로필 페이지로 이동
function setProfileMoveEvent() {
  location.href = "../../jsp/page/profile_page.jsp";
}

// 전체 보기 버튼 이벤트
function whatchAllBtnEvent(e) {
  var date = chooseDate.value;
  if (watchState == "TEAM") {
    e.target.children[0].src = "../../image/schedule/full_battery.png";
    e.target.children[1].innerHTML = "전체 보기";
    watchState = "USER";
    opacitySpeachDone();
    makeCalander(date);
  } else {
    e.target.children[0].src = "../../image/schedule/empty_battery.png";
    e.target.children[1].innerHTML = "나만 보기";
    watchState = "TEAM";
    opacitySpeachDone();
    makeCalander(date);
  }
}

// 모달창 바깥 영역 생성
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

// 메뉴 모달창 닫기
function opacitySpeachDone() {
  var speechMenu = document.getElementById("speech_icon");
  var opacityBox = document.querySelector(".opacity_box");
  speechMenu.style.display = "none";
  opacityBox.remove();
}

// 가이드 모달창 닫기
function opacityGuideDone() {
  var modal = document.getElementById("modal_guide");
  modal.style.display = "none";
  var opacityBox = document.querySelector(".opacity_box");
  opacityBox.remove();
}

// 컬레테마 페이지로 이동
function colorThemeMove() {
  location.href = "../../jsp/page/theme_page.jsp";
}

// 색상 세팅
function setColor(color) {
  color = "#" + color;
  var changeColorListBack = [
    document.querySelector("body"),
    document.getElementById("theme_btn"),
  ];
  changeColorListBack.forEach(function (ele) {
    ele.style.backgroundColor = color;
  });
}

// 달력 키우기 버튼 이벤트
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

// 달력 날짜 변경
function setPresentDate(e) {
  location.href = "../../jsp/page/schedule_page.jsp?day=" + e.target.value;
}
