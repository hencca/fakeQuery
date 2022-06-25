import { css } from "./modules/css";
import { addClass } from "./modules/addClass";
import { removeClass } from "./modules/removeClass";
import { addAnimModule } from "./modules/animate";

// Using function because class gave me a bunch of
// typescript errors when trying to add methods dynamically
function fQueryObject() {}

addAnimModule(fQueryObject);

fQueryObject.prototype.fQuery = "1";

fQueryObject.prototype.queryElements = function (str, context) {
  if (typeof str === "string") {
    if (!context) {
      this.setElements(document.querySelectorAll(str));
      return this;
    } else {
      if (context.fQuery) {
        context = context[0];
      }

      this.setElements(context.querySelectorAll(str));
      return this;
    }
  }
};

fQueryObject.prototype.setElements = function (ar) {
  ar.forEach((el, num) => {
    this[num] = el;
  });
  this.length = ar.length;
  return this;
};

export default function $(what, context = undefined) {
  if (typeof what === "string") {
    if (isHTML(what)) {
      return new fQueryObject().setElements([htmlToElement(what)]);
    }

    return new fQueryObject().queryElements(what, context);
  }
}
// Add new methods here. These are the one's
// we're creating: https://api.jquery.com/
const modifyingFunctions = {
  css,
  addClass,
  removeClass,
};

// Loop through all of modifyingFunctions and
// adding them to fQueryObject prototype.
Object.keys(modifyingFunctions).forEach((functionName) => {
  fQueryObject.prototype[functionName] = function (...args) {
    // iterate through each object
    // and perform function on them
    for (let i = 0; i < this.length; i++) {
      let fn = modifyingFunctions[functionName];

      const element = this[i];

      // so in case function passed
      const newArgs = args.map((argument) => {
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

export function isHTML(str) {
  // todo: make better
  return /<.*>/.test(str);
}

export function htmlToElement(str) {
  const template = document.createElement("template");
  str = str.trim();
  template.innerHTML = str;
  return template.content.firstChild;
}
