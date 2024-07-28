var stateColor = "#ffcceb";

function checkBtnEvent() {
  var themePresentColor = document.getElementById("color_choose_input");
  stateColor = themePresentColor.value;
  colorSet();
}

function colorSet() {
  var changeColorListBack = [
    document.getElementById("btn_lsit"),
    document.getElementById("color_check_btn"),
  ];
  changeColorListBack.forEach(function (ele) {
    ele.style.backgroundColor = stateColor;
  });
  document.getElementById("color_choose_input").value = stateColor;
}

function exitBtnEvent() {
  location.href = "../html/schedule_page.html";
}

colorSet();
