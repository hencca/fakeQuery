// https://api.jquery.com/animate/

function getUnit(str: string) {
  const s = /%|[a-z]+/g.exec(str);
  return s[0];
}

function animateProp(
  el: HTMLElement,
  prop: string,
  endVal: string | number,
  duration: number
) {
  const computed = window.getComputedStyle(el);

  const startUnit = getUnit(computed[prop].toString());
  const endUnit = getUnit(endVal.toString());

  const startValue: number = Number(computed[prop].replace(startUnit, ""));
  const endValue: number = Number(endVal.replace(startUnit, ""));

  const distanceToTravel = endValue - startValue;

  return new Promise<void>((resolve) => {
    var start: any;

    function step(deltaTime: number) {
      if (start === undefined) {
        start = deltaTime;
      }
      const elapsed = deltaTime - start;

      el.style[prop] =
        startValue + (elapsed / duration) * distanceToTravel + "px";

      if (elapsed < duration) {
        window.requestAnimationFrame(step);
      } else {
        resolve();
      }
    }
    window.requestAnimationFrame(step);
  });
}

// this should return a promise
export default async function animate(
  el: HTMLElement,
  obj: Record<string, number | string>,
  duration: number = 1400
) {
  const promises = [];
  for (let name in obj) {
    // @ts-ignore
    promises.push(animateProp(el, name, obj[name], duration));
  }
  await Promise.all(promises);
}
