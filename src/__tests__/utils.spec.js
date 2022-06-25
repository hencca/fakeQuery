import { isHTML } from "../fakeQuery";

test("isHTML", function () {
  expect(isHTML("<hr/>")).toBe(true);
  expect(isHTML("<div>wdwjdijwdiwjij</div>")).toBe(true);
  expect(isHTML("<hr/")).toBe(false);
});
