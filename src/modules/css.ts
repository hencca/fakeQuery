export function css(el: HTMLElement, ...args: any[]) {
  const obj = args[0];
  for (let o in obj) {
    // @ts-ignore
    el.style[o] = obj[o];
  }
  return el;
}
