import { css } from "../../modules/css";

test("css", function () {
  let el: HTMLElement = document.createElement("div");
  el = css(el, { width: "20%" });
  expect(el.style.width).toBe("20%");
});
