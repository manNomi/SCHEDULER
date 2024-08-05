function checkBtnEvent() {
  var themePresentColor = document.getElementById("color_choose_input");
  var clickColor = themePresentColor.value;
  clickColor = clickColor.split("#")[1];
  location.href = "../action/colorUpdateAction.jsp?colorCode=" + clickColor;
}

function setColor(color) {
  color = "#" + color;
  var changeColorListBack = [
    document.getElementById("btn_lsit"),
    document.getElementById("color_check_btn"),
  ];
  changeColorListBack.forEach(function (ele) {
    ele.style.backgroundColor = color;
  });
  document.getElementById("color_choose_input").value = color;
}

function exitBtnEvent() {
  location.href = "../../jsp/page/schedule_page.jsp";
}
