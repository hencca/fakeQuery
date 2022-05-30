import { css } from "./modules/css";
import { addClass } from "./modules/addClass";
import { removeClass } from "./modules/removeClass";
import animate from "./modules/animate";
let num = 0;
// Using function because class gave me a bunch of
// typescript errors when trying to add methods dynamically
function fQueryObject() {}

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
        el();
      });
    });
  }
}

Anim.prototype.counter = 0;

fQueryObject.prototype.animate = function (
  obj: Record<string, any>,
  duration: number
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
        resolve();
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

fQueryObject.prototype.queryElements = function (str: string) {
  this.setElements(document.querySelectorAll(str));
  return this;
};

fQueryObject.prototype.setElements = function (ar: NodeList) {
  ar.forEach((el, num) => {
    this[num] = el;
  });
  this.length = ar.length;
};

export default function $(what: any) {
  if (typeof what === "string") {
    return new (fQueryObject as any)().queryElements(what);
  }
}
// Add new methods here. These are the one's
// we're creating: https://api.jquery.com/
const modifyingFunctions: Record<string, Function> = {
  css,
  addClass,
  removeClass,
};

// Loop through all of modifyingFunctions and
// adding them to fQueryObject prototype.
Object.keys(modifyingFunctions).forEach((functionName: string) => {
  fQueryObject.prototype[functionName] = function (...args: any[]) {
    // iterate through each object
    // and perform function on them
    for (let i = 0; i < this.length; i++) {
      let fn = modifyingFunctions[functionName];

      const element = this[i];

      // so in case function passed
      const newArgs = args.map((argument: any) => {
        if (typeof argument === "function") {
          const _function = argument;
          if (functionName === "addClass") {
            return _function(i, [...element.classList]);
          }
          return _function(i);
        }
        return argument;
      });
      this[i] = fn(element, ...newArgs);
    }
    return this;
  };
});

export function htmlToElement(str: string) {
  const template = document.createElement("template");
  str = str.trim();
  template.innerHTML = str;
  return template.content.firstChild;
}
