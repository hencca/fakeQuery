export function htmlToElement(str: string) {
  const template = document.createElement("template");
  str = str.trim();
  template.innerHTML = str;
  return template.content.firstChild;
}

class fQueryObject {
  private name: string = "";
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

function css(...args: any[]) {
  const obj = args[0];
  for (let o in obj) {
    // @ts-ignore
    this.style[o] = obj[o];
  }
}

function addClass(className: string) {
  this.classList.add(className);
}

var functions = { css, addClass };

Object.keys(functions).forEach((name) => [
  (fQueryObject.prototype[name] = function (...args: any[]) {
    for (let i = 0; i < this.length; i++) {
      let fn = functions[name];
      fn.call(this[i], ...args);
    }
    return this;
  }),
]);
