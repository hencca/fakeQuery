import $ from "./src/fakeQuery";
import animate from "./src/modules/animate";
const $el = $(" .helloText");

console.log($el);

$el.css({ backgroundColor: "red" }).addClass("bobby");

// $("p").css("backgroundColor", "red");

// @ts-ignore
// jQuery("#animateMe")
//   .animate({ width: "1500px" }, 1200)
//   .animate({ height: "600" });

const el = document.getElementById("animateMe");
el.style.height = "600px";
// animate(el, { height: "200px", width: "100px", marginTop: "300px" }, 2000).then(
//   () => console.log("DOONE")
// );
$("#animateMe")
  .animate({ height: "200px", width: "100px", marginTop: "300px" }, 1000)
  .animate({ height: "100px", width: "700px", marginTop: "10px" }, 1000)
  .animate(
    { height: "300px", width: "300px", marginTop: "10px", marginLeft: "400px" },
    500
  )
  .animate({ height: "200px", width: "100px", marginTop: "300px" }, 1000);
