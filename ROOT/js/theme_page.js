// 확인 버튼 클릭
function checkBtnEvent() {
  var themePresentColor = document.getElementById("color_choose_input");
  var clickColor = themePresentColor.value;
  clickColor = clickColor.split("#")[1];
  location.href = "../action/colorUpdateAction.jsp?colorCode=" + clickColor;
}

// 데이터베이스 컬러 셋팅
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
