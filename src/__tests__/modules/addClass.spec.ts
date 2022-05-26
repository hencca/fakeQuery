import { addClass } from "../../modules/addClass";

test("css", function () {
  let el: HTMLElement = document.createElement("div");
  el = addClass(el, "monkey");
  el = addClass(el, "banana");
  expect(el.classList.contains("monkey")).toBe(true);
  expect(el.classList.contains("horse")).toBe(false);
  expect(el.classList.contains("banana")).toBe(true);
});
