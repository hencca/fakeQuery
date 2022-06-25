// https://api.jquery.com/animate/

function getUnit(str) {
  const s = /%|[a-z]+/g.exec(str);
  return s[0];
}

function animateProp(el, prop, endVal, duration) {
  const computed = window.getComputedStyle(el);

  const startUnit = getUnit(computed[prop].toString());
  const endUnit = getUnit(endVal.toString());

  const startValue = Number(computed[prop].replace(startUnit, ""));
  const endValue = Number(endVal.replace(startUnit, ""));

  const distanceToTravel = endValue - startValue;

  return new Promise((resolve) => {
    let start;

    function step(deltaTime) {
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
export const animate = async function (
  el,
  obj,
  duration = 1400,
  easing = "ease",
  onComplete
) {
  const promises = [];
  for (let name in obj) {
    promises.push(animateProp(el, name, obj[name], duration));
  }

  await Promise.all(promises);
};

class Anim {
  constructor(fn) {
    this.thenFunctions = [];
    this.animFunction = fn;
  }

  then(fn) {
    this.thenFunctions.push(fn);
  }

  start() {
    console.log("start anim " + Anim.prototype.counter);
    Anim.prototype.counter++;
    this.animFunction().then(() => {
      this.thenFunctions.forEach((el) => {
        console.log(el);
        el();
      });
    });
  }
}

// @ts-ignore
Anim.prototype.counter = 0;

let num;
export function addAnimModule(fQueryObject) {
  fQueryObject.prototype.animate = function (
    obj,
    duration,
    easing,
    onComplete
  ) {
    const fn = () => {
      num++;
      return new Promise((resolve) => {
        const promises = [];
        for (let i = 0; i < this.length; i++) {
          const el = this[i];
          promises.push(animate(el, obj, duration));
        }
        Promise.all(promises).then(() => {
          // @ts-ignore
          resolve();
          if (onComplete) {
            onComplete();
          }
        });
      });
    };

    // return new Promise((resolve) => {});

    if (!this.animations) {
      this.animations = [];
    }

    this.animations.push(new Anim(fn));

    if (this.animations.length === 1) {
      this.animations[0].start();
    } else {
      const prevAnim = this.animations[this.animations.length - 2];
      const nextAnim = this.animations[this.animations.length - 1];
      prevAnim.then(() => {
        nextAnim.start();
      });
    }

    return this;
  };
}
