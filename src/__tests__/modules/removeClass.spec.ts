import { removeClass } from "../../modules/removeClass";

test("removeClass", function () {
  document.body.innerHTML = `
  <div id="fireman" class="hero">Fireman</div>
  <div id="robber" class="hero">Fireman</div>
  `;

  const el = document.getElementById("robber") as HTMLDivElement;
  expect(el.classList.contains("hero")).toBe(true);
  removeClass(el, "hero");
  expect(el.classList.contains("hero")).toBe(false);
});
