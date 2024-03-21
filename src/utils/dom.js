export function $(selector, context = document) {
  return context.querySelector(selector)
}


export function $$() {
  return Array.from(context.querySelectorAll(selector))
}