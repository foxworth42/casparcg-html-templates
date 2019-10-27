var title = document.querySelector("#title");
var subtitle = document.querySelector("#subtitle");
var wrappers = document.querySelectorAll(".wrappers");
var templateData = {};

// eslint-disable-next-line no-unused-vars
function play() {
  wrappers.forEach(function(element) {
    element.classList.remove("slideOut");
    element.classList.add("slideIn");
  });
}

// eslint-disable-next-line no-unused-vars,no-redeclare
function stop() {
  wrappers.forEach(function(element) {
    element.classList.remove("slideIn");
    element.classList.add("slideOut");
  });
}

// eslint-disable-next-line no-unused-vars
function update(newTemplateData) {
  try {
    templateData = JSON.parse(newTemplateData);
    if ("title" in templateData) {
      title.innerHTML = templateData.title;
    }
    if ("subtitle" in templateData) {
      subtitle.innerHTML = templateData.subtitle;
    }
  } catch (e) {
    console.error("Error parsing template data: ");
    console.error(newTemplateData);
    console.error(e);
  }
}

// eslint-disable-next-line no-unused-vars
function next() {
  console.log("next");
}
