// https://api.jquery.com/addClass/

export function addClass(el: HTMLElement, className: string) {
  el.classList.add(className);
  return el;
}
