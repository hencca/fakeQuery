// https://api.jquery.com/removeClass/

export function removeClass(el: HTMLElement, className: string) {
  el.classList.remove(className);
  return el;
}
