function makePlacehorder(name, placeText, color, text, inputType) {
  var container = document.createElement("div");
  container.style.position = "relative";
  container.id = name + "_container";
  var palcehorderText = document.createElement("p");
  palcehorderText.innerHTML = placeText;
  palcehorderText.className = "placehorder";
  palcehorderText.id = name + "_text";
  var placehorderBox = document.createElement("input");
  placehorderBox.className = "placehorder_box";
  placehorderBox.style.backgroundColor = color;
  placehorderBox.style.color = text;
  placehorderBox.setAttribute("autocomplete", "off");
  placehorderBox.id = name + "_box";
  placehorderBox.type = inputType;
  container.appendChild(palcehorderText);
  placehorderBox.addEventListener("input", handleInputBlur);
  placehorderBox.addEventListener("change", handleInputBlur);
  function handleInputBlur() {
    palcehorderText.style.animation = "placehorder_to_small 0.3s forwards";
    placehorderBox.style.fontSize = "13px";
    placehorderBox.style.paddingTop = "25px";
    const inputValue = placehorderBox.value.trim();
    if (inputValue === "") {
      palcehorderText.style.animation = "placehorder_to_big 0.3s forwards";
      placehorderBox.style.fontSize = "15px";
      placehorderBox.style.paddingTop = "0px";
    }
  }
  container.appendChild(placehorderBox);

  var nameList = name.split("_");
  var error = makeInputError(nameList[0], nameList[1], placehorderBox);

  if (nameList[0] != "login") {
    container.appendChild(error);
  }
  return container;
}

var errorCount = [];
function makeInputError(page, type, box) {
  const regexID = /^[0-9]{6,20}$/;
  const validID = "6~20자 숫자만 ";
  const regexPhone = /^01([0|1|6|7|8|9]?)([0-9]{3,4})([0-9]{4})$/;
  const validPhone = "예시)01012345678";
  const regexPassword = /^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d]{6,20}$/;
  const validPassword = "영어 숫자 포함, 길이가 6에서 20자 사이";
  var regexName = /^[가-힣]{2,10}$/;
  const validName = "예시)홍길동";

  var regexPWCheck = "";
  const validPWCheck = "비밀번호가 일치하지 않습니다";

  var error = document.createElement("p");
  error.id = page + "_" + type + "_error";
  error.classList = "error_guide_message";
  var regex = "";
  var valid = "";
  if (type == "id") {
    regex = regexID;
    valid = validID;
  } else if (type == "phone") {
    regex = regexPhone;
    valid = validPhone;
  } else if (type == "pw") {
    regex = regexPassword;
    valid = validPassword;
  } else if (type == "name") {
    regex = regexName;
    valid = validName;
  } else if (type == "pw-check") {
    regex = regexPWCheck;
    valid = validPWCheck;
  } else if (type == "pw-old") {
    regex = regexPassword;
    valid = validPassword;
  } else {
    regex = /.*|[\s\S]*/;
    valid = "모든 입력 가능";
  }

  if (type == "pw-check") {
    var pw_box = document.getElementById(page + "_pw_box");
    function handleBlur(event) {
      if (pw_box.value == box.value) {
        error.innerHTML = "";
        box.style.border = "none";
        if (errorCount[0] != null) {
          var count = 0;
          errorCount.forEach(function (element) {
            if (element == type) {
              count++;
            }
          });
          if (count == 0) {
            errorCount.push(type);
          }
        } else {
          errorCount.push(type);
        }
      } else {
        error.innerHTML = valid;
        box.style.border = "solid 1px #DC5F00";
        var newErrorCount = errorCount.filter(function (value) {
          return value !== type; // 값이 2가 아닌 요소들만 남김
        });
        errorCount = newErrorCount;
      }
      if (event.target.value == "") {
        error.innerHTML = "";
        box.style.border = "none";
      }
    }
    box.addEventListener("blur", handleBlur);
    pw_box.addEventListener("blur", handleBlur);
  } else {
    box.addEventListener("blur", function (event) {
      if (regex.test(event.target.value)) {
        error.innerHTML = "";
        box.style.border = "none";
        if (errorCount[0] != null) {
          var count = 0;
          errorCount.forEach(function (element) {
            if (element == type) {
              count++;
            }
          });
          if (count == 0) {
            errorCount.push(type);
          }
        } else {
          errorCount.push(type);
        }
      } else {
        error.innerHTML = valid;
        box.style.border = "solid 1px #DC5F00";
        var newErrorCount = errorCount.filter(function (value) {
          return value !== type; // 값이 2가 아닌 요소들만 남김
        });
        errorCount = newErrorCount;
      }
      if (event.target.value == "") {
        error.innerHTML = "";
        box.style.border = "none";
      }
    });
  }
  return error;
}
