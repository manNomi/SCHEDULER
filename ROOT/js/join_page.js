function makeInputjoinID() {
  var joinBox = document.getElementById("join_file_back");
  while (joinBox.firstChild) {
    joinBox.removeChild(joinBox.firstChild);
  }
  joinBox.appendChild(
    makePlacehorder("join_id", "아이디", "#BDE3FF", "solid 1px #22B4FF")
  );
  joinBox.appendChild(
    makePlacehorder("join_pw", "비밀번호", "#BDE3FF", "solid 1px #22B4FF")
  );
  joinBox.appendChild(
    makePlacehorder(
      "join_pw_check",
      "비밀번호 확인",
      "#BDE3FF",
      "solid 1px #22B4FF"
    )
  );
  joinBox.querySelectorAll(".placehorder_box").forEach(function (e) {
    e.type = "password";
  });
  joinBox.appendChild(makeSearchBtn());
}
function makeInputJoinPrivacy() {
  var joinBox = document.getElementById("join_file_back");
  while (joinBox.firstChild) {
    joinBox.removeChild(joinBox.firstChild);
  }
  joinBox.appendChild(
    makePlacehorder("join_id", "아이디", "#BDE3FF", "solid 1px #22B4FF")
  );
  joinBox.appendChild(
    makePlacehorder("join_phone", "비밀번호", "#BDE3FF", "solid 1px #22B4FF")
  );
  joinBox.appendChild(
    makePlacehorder(
      "join_phone",
      "비밀번호 확인",
      "#BDE3FF",
      "solid 1px #22B4FF"
    )
  );
  joinBox.querySelectorAll(".placehorder_box").forEach(function (e) {
    e.type = "password";
  });
  joinBox.appendChild(makeSearchBtn());
}

function makeInputJoinProfile() {
  var joinBox = document.getElementById("join_file_back");
  while (joinBox.firstChild) {
    joinBox.removeChild(joinBox.firstChild);
  }
  joinBox.appendChild(
    makePlacehorder("join_id", "아이디", "#BDE3FF", "solid 1px #22B4FF")
  );
  joinBox.appendChild(
    makePlacehorder("join_phone", "비밀번호", "#BDE3FF", "solid 1px #22B4FF")
  );
  joinBox.appendChild(
    makePlacehorder(
      "join_phone",
      "비밀번호 확인",
      "#BDE3FF",
      "solid 1px #22B4FF"
    )
  );
  joinBox.querySelectorAll(".placehorder_box").forEach(function (e) {
    e.type = "password";
  });
  joinBox.appendChild(makeSearchBtn());
}

function makeNextBtn() {
  var searchBtnBox = document.createElement("div");
  searchBtnBox.id = "find_search_box";
  var findSearchBtn = document.createElement("button");
  findSearchBtn.id = "find_search_btn";
  searchBtnBox.appendChild(findSearchBtn);
  return searchBtnBox;
}

function setJoinPageEvent() {
  var tapIDBox = document.getElementById("join_tab_id_box");
  var tapPrivacyBox = document.getElementById("join_tab_privacy_box");
  var tapProfileBox = document.getElementById("join_tab_profile_box");
  tapIDBox.addEventListener("click", function (e) {
    tapIDBox.style.paddingLeft = "5px";
    tapPrivacyBox.style.paddingLeft = "0px";
    tapProfileBox.style.paddingLeft = "0px";
    makeInputjoinID();
    setJoinEvnet();
    tabState = "ID";
  });

  tapPrivacyBox.addEventListener("click", function (e) {
    tapIDBox.style.paddingLeft = "0px";
    tapPrivacyBox.style.paddingLeft = "5px";
    tapProfileBox.style.paddingLeft = "0px";
    makeInputJoinPrivacy();
    setJoinEvnet();
    tabState = "Privacy";
  });

  tapProfileBox.addEventListener("click", function (e) {
    tapIDBox.style.paddingLeft = "0px";
    tapPrivacyBox.style.paddingLeft = "0px";
    tapProfileBox.style.paddingLeft = "5px";
    makeInputJoinProfile();
    setJoinEvnet();
    tabState = "Profile";
  });

  var exitBtn = document.getElementById("join_btn_red");
  exitBtn.addEventListener("click", function () {
    location.href = "../html/index.html";
  });
}

setJoinPageEvent();
