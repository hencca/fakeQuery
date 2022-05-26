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
      .addClass("ldldl")
      // @ts-ignore
      .addClass(() => Math.random() + "dlldl");

    console.log(document.body.innerHTML);
  });
});
