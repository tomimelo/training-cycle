export function $(selector, context = document) {
  return context.querySelector(selector)
}

export function $$(selector, context = document) {
  return Array.from(context.querySelectorAll(selector))
}

export function render(context, content) {
  context.innerHtml = ''
  content.forEach((element) => {
    context.appendChild(element)
  })
}
