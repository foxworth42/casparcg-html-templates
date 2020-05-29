/*global TemplateHandler */
var outerWrapper = document.querySelector(".outerWrapper");
var templateHandler = new TemplateHandler();
var active = false;

// eslint-disable-next-line no-unused-vars
function play() {
  if (active === false) {
    outerWrapper.classList.remove("stop");
    outerWrapper.classList.add("play");
    active = true;
  }
}

// eslint-disable-next-line no-unused-vars,no-redeclare
function stop() {
  if (active === true) {
    outerWrapper.classList.remove("play");
    outerWrapper.classList.add("stop");
    active = false;
  }
}

// eslint-disable-next-line no-unused-vars
function update(newTemplateData) {
  if (typeof newTemplateData === "undefined") {
    return;
  }
  var templateData = templateHandler.parseTemplateData(newTemplateData);
  templateHandler.fillParameters(templateData, true);
}

// eslint-disable-next-line no-unused-vars
function next() {
  console.log("next");
}
