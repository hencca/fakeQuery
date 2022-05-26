import { css } from "./modules/css";
import { addClass } from "./modules/addClass";

export function htmlToElement(str: string) {
  const template = document.createElement("template");
  str = str.trim();
  template.innerHTML = str;
  return template.content.firstChild;
}

class fQueryObject {
  public length: number = 0;

  setElements(ar: NodeList) {
    ar.forEach((el, num) => {
      // @ts-ignore
      this[num] = el;
    });
    this.length = ar.length;
  }

  queryElements(str: string) {
    this.setElements(document.querySelectorAll(str));
    return this;
  }
}

export default function $(what: any) {
  if (typeof what === "string") {
    return new fQueryObject().queryElements(what);
  }
}

const modifyingFunctions = { css, addClass };

Object.keys(modifyingFunctions).forEach((functionName: string) => {
  // @ts-ignore
  fQueryObject.prototype[functionName] = function (...args: any[]) {
    for (let i = 0; i < this.length; i++) {
      // @ts-ignore
      let fn = modifyingFunctions[functionName];
      // @ts-ignore
      const element = this[i];

      // so incase function passed
      const newArgs = args.map((argument: any) => {
        if (typeof argument === "function") {
          if (functionName === "addClass") {
            return argument(i, [...element.classList]);
          }

          return argument(i);
        }

        return argument;
      });
      // @ts-ignore
      this[i] = fn(element, ...newArgs);
    }
    return this;
  };
});
