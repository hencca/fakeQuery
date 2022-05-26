import $, { htmlToElement } from "../fakeQuery";

describe("first", () => {
  test("css selector", () => {
    document.body.innerHTML =
      "<div>" +
      '  <span class="username" />' +
      '  <button id="button" />' +
      "</div>";

    const el = $(".username");

    // @ts-ignore
    expect(el.length).toBe(1);
  });

  test("htmlToElement", function () {
    var el = htmlToElement(
      "<div><h2 class='title'>welcome</h2>dwdwdw<h2 class='title'>go gjoe</h2></div>"
    );
    document.body.append(el);
    const titles = document.querySelector(".title");

    expect(titles).not.toBeNull();
  });
});

describe("first", () => {
  const ko: number = 2;
  console.log(document);
  test("css selector", () => {
    expect(1).toBe(1);
  });
});
