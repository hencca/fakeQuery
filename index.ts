import $ from "./src/fakeQuery";
const $el = $(".abs .helloText");

console.log($el);

$el.css({ backgroundColor: "yellow" }).addClass("bobby");

// $("p").css("backgroundColor", "red");
