import $ from "./src/fakeQuery";
const $el = $(" .helloText");

console.log($el);

$el.css({ backgroundColor: "green" }).addClass("bobby");

// $("p").css("backgroundColor", "red");
