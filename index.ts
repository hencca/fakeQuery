import $ from "./src/fakeQuery";
const $el = $(" .helloText");

console.log($el);

$el.css({ backgroundColor: "red" }).addClass("bobby");

// $("p").css("backgroundColor", "red");

$(".footer").css({ border: "4px dotted red" }).addClass("footer1");
