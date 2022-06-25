describe("A suite", function () {
  it("contains spec with an expectation", function () {
    const div = document.createElement("div");
    // expect(1).toBe(1);
    div.id = "janne";
    div.innerHTML = "Hello World";
    document.body.append(div);
    $("#janne").addClass("kkoko");
    expect(document.getElementById("janne").innerHTML).toBe("Hello World");
  });

  it("makes stuff animate", async function () {
    const el = document.createElement("div");
    el.id = "animateMe";
    document.body.append(el);
    el.style.height = "600px";
    el.style.backgroundColor = "red";

    await new Promise((resolve) => {
      $("#animateMe")
        .animate({ height: "200px", width: "100px", marginTop: "100px" }, 500)
        .animate(
          { height: "200px", width: "100px", marginTop: "10px" },
          1000,
          "",
          resolve
        );
    });

    expect($("#animateMe")[0].style.marginTop).toBe("10px");
  });
});
