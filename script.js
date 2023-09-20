let BASE_URL = "https://codequotient.com/api/";
let languageSelector = document.querySelector("#languageSelector");
var editor = ace.edit("editor");
let compileBtn = document.querySelector("#compile");
let h2 = document.querySelector("#h2");

var languageId;
var writtenCode;

compileBtn.addEventListener("click", function () {
  setLanguageID();
  getCode();
  sendCodeForCompilation();
});
var codeId = "";
function sendCodeForCompilation() {
  var url = BASE_URL + "executeCode";
  var request = new XMLHttpRequest();

  request.open("POST", url);
  request.setRequestHeader("Content-Type", "application/json");

  var objToSend = {
    code: writtenCode,
    langId: languageId,
  };
  request.send(JSON.stringify(objToSend));

  request.addEventListener("load", function () {
    var response = JSON.parse(request.responseText);
    console.log(response);
    if ("codeId" in response) {
      codeId = response.codeId;
      setTimeout(checkCodeResult, 3000);
      h2.innerHTML = "Copiling ... 📀📀📀";
    } else {
      alert("Something Went Wrong");
    }
  });
}

function checkCodeResult() {
  var urlToCheck = BASE_URL + "codeResult/" + codeId;
  var request = new XMLHttpRequest();
  request.open("GET", urlToCheck);
  request.send();

  request.addEventListener("load", function () {
    var response = JSON.parse(request.responseText);
    console.log(response);
    var data = JSON.parse(response.data);

    console.log(data);

    if (data.errors != "") {
      h2.innerHTML = data.errors;
    } else {
      h2.innerHTML = data.output;
    }
  });
}

function getCode() {
  writtenCode = editor.getValue();
  console.log(writtenCode);
}

function setLanguageID() {
  let selectedLang = languageSelector.value;

  //( Python : 0 , JavaScript : 4 , C : 7 , C++ : 77 , Java : 8)

  switch (selectedLang) {
    case "Java":
      languageId = "8";
      break;
    case "C":
      languageId = "7";
      break;
    case "C++":
      languageId = "77";
      break;
    case "JavaScript":
      languageId = "4";
      break;
    case "Python":
      languageId = "0";
      break;
  }
  console.log("Language ID " + languageId);
}
