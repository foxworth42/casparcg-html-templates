var title = document.querySelector(".titleText");
var titleWrapper = document.querySelector(".titleWrapper");
var subtitle = document.querySelector(".subtitleText");
var subtitleWrapper = document.querySelector(".subtitleWrapper");
var outerWrapper = document.querySelector(".outerWrapper");
var logo = document.querySelector(".logo");
var templateData = {};
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
  try {
    templateData = JSON.parse(newTemplateData);
    if ("title" in templateData) {
      title.innerHTML = templateData.title;
      if (title.innerHTML.length === 0) {
        titleWrapper.style.display = "none";
      } else {
        titleWrapper.style.display = "block";
      }
    }
    if ("subtitle" in templateData) {
      subtitle.innerHTML = templateData.subtitle;
      if (subtitle.innerHTML.length === 0) {
        subtitleWrapper.style.display = "none";
      } else {
        subtitleWrapper.style.display = "block";
      }
    }
    if ("logo" in templateData) {
      logo.style.backgroundImage = "url(" + templateData.logo + ")";
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
