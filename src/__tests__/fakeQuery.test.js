import $ from "../../src/fakeQuery";
test("$ takes in html as string", function () {
  const ko = $("<div>hello</div>");
  expect(ko[0].innerHTML).toBe("hello");
});
