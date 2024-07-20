function makePlacehorder(name, placeText, color, border) {
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
  placehorderBox.style.border = border;
  placehorderBox.setAttribute("autocomplete", "off");
  placehorderBox.id = name + "_box";

  container.appendChild(palcehorderText);
  container.appendChild(placehorderBox);
  placehorderBox.addEventListener("input", function () {
    palcehorderText.style.animation = "placehorder_to_small 0.3s forwards";
    placehorderBox.style.fontSize = "13px";
    placehorderBox.style.paddingTop = "25px";
    const inputValue = placehorderBox.value.trim();
    if (inputValue === "") {
      palcehorderText.style.animation = "placehorder_to_big 0.3s forwards";
      placehorderBox.style.fontSize = "15px";
      placehorderBox.style.paddingTop = "0px";
    }
  });
  return container;
}
