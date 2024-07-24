var stateColor = "#ffcceb";

function colorSet() {
  var backColor = [document.querySelector("body")];
  backColor.forEach(function (ele) {
    ele.style.backgroundColor = stateColor;
  });
}

function setRotateEvent() {
  var front = document.getElementById("front_container");
  var back = document.getElementById("back_container");

  front.on("hover");
}

function rotateEvnet(e) {
  e.animate([{ transform: "rotateY(-180deg)" }], {
    duration: 1000,
    easing: "ease-in",
    fill: "forwards",
  });
}

colorSet();
