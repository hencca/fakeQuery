// @ts-nocheck

import $ from "../../fakeQuery";

beforeEach(() => {
  document.body.innerHTML = `

    <a href="#">logo</a>
  <div id="header"><a href="http://localhost/wdjiwjd">one</a><a href="/wjddjw">two</a></div>
  <a>lddk</a>
  
    <p class="footer">dwijwdi</p>
  `;
});

test("queryElements", function () {
  var footer = $(".footer");
  expect(footer.length).toBe(1);

  var header = $("#header");

  const linksinheader = $("a", header[0]);

  expect(linksinheader[0].innerHTML).toBe("one");
  expect(linksinheader[0].href).toBe("http://localhost/wdjiwjd");

  const linksinheader1 = $("a", header);

  expect(linksinheader1[0].innerHTML).toBe("one");
  expect(linksinheader1[0].href).toBe("http://localhost/wdjiwjd");

  expect($("a")[0].innerHTML).toBe("logo");

  $("a").addClass("linko");

  console.log(document.body.innerHTML);
});
