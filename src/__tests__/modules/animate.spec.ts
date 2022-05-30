import animate from "../../modules/animate";

test("one", async function () {
  document.body.innerHTML = `
  <div id="fireman" class="hero">Fireman</div>
  <div id="robber" style="height:900px" class="hero">Fireman</div>
  `;

  await new Promise((resolve) => setTimeout(resolve, 1000));

  // @ts-ignore
  console.log(document.getElementById("robber").getBoundingClientRect());

  const el = document.getElementById("fireman") as HTMLElement;
  animate(el, { height: 400 });

  console.log(document.body.innerHTML);
});
