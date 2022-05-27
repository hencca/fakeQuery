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
    var el: HTMLElement = htmlToElement(
      "<div><h2 class='title'>welcome</h2>dwdwdw<h2 class='title'>go gjoe</h2></div>"
    ) as HTMLElement;
    document.body.append(el);
    const titles = document.querySelector(".title");

    expect(titles).not.toBeNull();
  });

  test("addClass selector", () => {
    document.body.innerHTML = `
    
    <div class="picture"></div>
    <div class="picture"></div>
    <div class="picture"></div>
    <div class="picture"></div>
    <div class="picture"></div>
    <div class="picture"></div>
    <div class="picture"></div>
    
    
    `;

    // @ts-ignore
    const el = $(".picture")
      // @ts-ignore
      .addClass(function (num: number, classList: any) {
        return "p" + num;
      })
      // @ts-ignore
      .addClass("just_text")
      // @ts-ignore
      .addClass(() => Math.random() + "_rand");

    expect(
      document.querySelectorAll(".picture")[0].classList.contains("just_text")
    ).toBe(true);
  });

  test("removeClass selector", () => {
    document.body.innerHTML = `
    
    <div class="picture"></div>
    <div class="picture"></div>
    <div class="picture"></div>
    <div class="picture"></div>
    <div class="picture"></div>
    <div class="picture"></div>
    <div class="picture"></div>
    
    
    `;

    // @ts-ignore
    const el = $(".picture").removeClass("picture");

    expect(
      document.querySelectorAll("div")[0].classList.contains("picture")
    ).toBe(false);

    expect(document.body.innerHTML.indexOf("picture")).toBe(-1);
  });
});
