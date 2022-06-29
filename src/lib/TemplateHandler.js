function TemplateHandler() {
  this.config = {
    emptyElementClass: "empty-field",
    emptyParentElementClass: "empty-wrapper"
  };
}

TemplateHandler.prototype.fillParameters = function (
  params = {},
  hideParentOnEmpty = false
) {
  var self = this;
  Object.keys(params).forEach(function (parameter) {
    var elements = document.querySelectorAll(
      "[data-param='" + parameter + "']"
    );

    if (elements.length === 0) {
      return;
    }

    elements.forEach(function (element) {
      if (element.tagName.toLowerCase() === "img") {
        element.src = params[parameter];
      } else {
        element.innerHTML = params[parameter];
      }
      self._toggleDisplayClasses(params[parameter], element, hideParentOnEmpty);
    });
  });
};

TemplateHandler.prototype.parseTemplateData = function (templateData) {
  try {
    return JSON.parse(templateData);
  } catch (err) {
    console.error("Error parsing template data: ");
    console.error(templateData);
    console.error(err);
    return {};
  }
};

TemplateHandler.prototype._toggleDisplayClasses = function (
  paramValue,
  element,
  hideParentOnEmpty
) {
  if (paramValue === "") {
    element.classList.add(this.config["emptyElementClass"]);
    if (hideParentOnEmpty === true) {
      element.parentElement.classList.add(
        this.config["emptyParentElementClass"]
      );
    }
  } else {
    element.classList.remove(this.config["emptyElementClass"]);
    if (hideParentOnEmpty === true) {
      element.parentElement.classList.remove(
        this.config["emptyParentElementClass"]
      );
    }
  }
};

if ("module" in window === false) {
  window.module = {};
}
module.exports = TemplateHandler;
