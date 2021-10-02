/**
 * @jest-environment jsdom
 */
const TemplateHandler = require("./TemplateHandler");

describe("CasparCG template data parser", () => {
  it("Should successfully parse valid template data from CasparCG", () => {
    let testHandler = new TemplateHandler();
    let parsedTemplateData = testHandler.parseTemplateData(
      '{"title": "Title", "subtitle": "Subtitle"}'
    );
    expect(parsedTemplateData["title"]).toBe("Title");
    expect(parsedTemplateData["subtitle"]).toBe("Subtitle");
  });

  it("Should return an empty object if template data is not valid JSON", () => {
    let testHandler = new TemplateHandler();
    let parsedTemplateData = testHandler.parseTemplateData(
      "<templateData></templateData>"
    );
    expect(parsedTemplateData).toEqual({});
  });

  it("Should return an empty object if template data is not passed.", () => {
    let testHandler = new TemplateHandler();
    let parsedTemplateData = testHandler.parseTemplateData();
    expect(parsedTemplateData).toEqual({});
  });
});

describe("Template parameter handler", () => {
  it("Should should successfully populate text for parameters that match", () => {
    document.body.innerHTML = `
            <div data-param="title"></div>
            <div data-param="subtitle"></div>
        `;
    expect(document.querySelector("[data-param='title']").textContent).toBe("");
    expect(document.querySelector("[data-param='subtitle']").textContent).toBe(
      ""
    );
    let testHandler = new TemplateHandler();
    testHandler.fillParameters({
      title: "Title",
      subtitle: "Subtitle"
    });

    expect(document.querySelector("[data-param='title']").textContent).toBe(
      "Title"
    );
    expect(document.querySelector("[data-param='subtitle']").textContent).toBe(
      "Subtitle"
    );
  });

  it("Should gracefully do nothing if there are no parameters in the template data.", () => {
    document.body.innerHTML = `
            <div data-param="title"></div>
            <div data-param="subtitle"></div>
        `;
    expect(document.querySelector("[data-param='title']").textContent).toBe("");
    expect(document.querySelector("[data-param='subtitle']").textContent).toBe(
      ""
    );
    let testHandler = new TemplateHandler();
    testHandler.fillParameters({});

    expect(document.querySelector("[data-param='title']").textContent).toBe("");
    expect(document.querySelector("[data-param='subtitle']").textContent).toBe(
      ""
    );
  });

  it("Should clear text and add empty-field class if parameter is empty", () => {
    document.body.innerHTML = `
            <div data-param="title">Some Title</div>
        `;
    expect(
      document
        .querySelector("[data-param='title']")
        .classList.contains("empty-field")
    ).toBe(false);
    expect(document.querySelector("[data-param='title']").textContent).toBe(
      "Some Title"
    );
    let testHandler = new TemplateHandler();
    testHandler.fillParameters({
      title: ""
    });

    expect(
      document
        .querySelector("[data-param='title']")
        .classList.contains("empty-field")
    ).toBe(true);
    expect(document.querySelector("[data-param='title']").textContent).toBe("");
  });

  it("Should remove empty-field class if new content is not empty", () => {
    document.body.innerHTML = `
            <div class="empty-field" data-param="title">Title</div>
        `;
    expect(
      document
        .querySelector("[data-param='title']")
        .classList.contains("empty-field")
    ).toBe(true);
    expect(document.querySelector("[data-param='title']").textContent).toBe(
      "Title"
    );
    let testHandler = new TemplateHandler();
    testHandler.fillParameters({
      title: "New Title"
    });

    expect(
      document
        .querySelector("[data-param='title']")
        .classList.contains("empty-field")
    ).toBe(false);
    expect(document.querySelector("[data-param='title']").textContent).toBe(
      "New Title"
    );
  });

  it("Should leave parent element alone by default if parameter is empty", () => {
    document.body.innerHTML = `
            <div id="titleParent">
                <div data-param="title">Title</div>
            </div>
        `;
    expect(
      document.querySelector("#titleParent").classList.contains("empty-wrapper")
    ).toBe(false);

    let testHandler = new TemplateHandler();
    testHandler.fillParameters({
      title: ""
    });

    expect(
      document.querySelector("#titleParent").classList.contains("empty-wrapper")
    ).toBe(false);
  });

  it("Should leave parent element alone if parameter is empty and hideParentOnEmpty flag is false", () => {
    document.body.innerHTML = `
            <div id="titleParent">
                <div data-param="title">Title</div>
            </div>
        `;
    expect(
      document.querySelector("#titleParent").classList.contains("empty-wrapper")
    ).toBe(false);

    let testHandler = new TemplateHandler();
    testHandler.fillParameters(
      {
        title: ""
      },
      false
    );

    expect(
      document.querySelector("#titleParent").classList.contains("empty-wrapper")
    ).toBe(false);
  });

  it("Should add empty-wrapper class to parent element if parameter is empty and hideParentOnEmpty flag is true", () => {
    document.body.innerHTML = `
            <div id="titleParent">
                <div data-param="title">Title</div>
            </div>
        `;
    expect(
      document.querySelector("#titleParent").classList.contains("empty-wrapper")
    ).toBe(false);

    let testHandler = new TemplateHandler();
    testHandler.fillParameters(
      {
        title: ""
      },
      true
    );

    expect(
      document.querySelector("#titleParent").classList.contains("empty-wrapper")
    ).toBe(true);
  });

  it("Should remove empty-wrapper class from parent element if parameter is populated and hideParentOnEmpty flag is true", () => {
    document.body.innerHTML = `
            <div id="titleParent" class="empty-wrapper">
                <div data-param="title"></div>
            </div>
        `;
    expect(
      document.querySelector("#titleParent").classList.contains("empty-wrapper")
    ).toBe(true);

    let testHandler = new TemplateHandler();
    testHandler.fillParameters(
      {
        title: "New Title"
      },
      true
    );

    expect(
      document.querySelector("#titleParent").classList.contains("empty-wrapper")
    ).toBe(false);
  });

  it("Should handle updating images in templates", () => {
    document.body.innerHTML = `
            <div id="imageWrapper">
                <img data-param="logo" src="logo.png">
            </div>
        `;
    expect(document.querySelector("[data-param='logo']").src).toContain(
      "logo.png"
    );

    let testHandler = new TemplateHandler();
    testHandler.fillParameters(
      {
        logo: "logo2.png"
      },
      true
    );

    expect(document.querySelector("[data-param='logo']").src).toContain(
      "logo2.png"
    );
  });

  it("Should gracefully handle not finding any elements", () => {
    let markup = `
            <div id="titleParent">
                <div>Title</div>
            </div>
        `;
    document.body.innerHTML = markup;

    let testHandler = new TemplateHandler();
    testHandler.fillParameters(
      {
        title: ""
      },
      false
    );

    expect(document.body.innerHTML).toBe(markup);
  });
});
