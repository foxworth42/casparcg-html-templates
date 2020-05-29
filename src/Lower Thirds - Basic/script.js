/*global TemplateHandler */
var wrappers = document.querySelectorAll(".wrappers");
var active = false;
var templateHandler = new TemplateHandler();

// eslint-disable-next-line no-unused-vars
function play() {
  if (active === false) {
    wrappers.forEach(function(element) {
      element.classList.remove("slideOut");
      element.classList.add("slideIn");
    });
    active = true;
  }
}

// eslint-disable-next-line no-unused-vars,no-redeclare
function stop() {
  if (active === true) {
    wrappers.forEach(function(element) {
      element.classList.remove("slideIn");
      element.classList.add("slideOut");
    });
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
