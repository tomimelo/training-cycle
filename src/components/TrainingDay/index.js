import './style.css'

export function TrainingDay(day) {
  let onRemove = () => {}

  const element = document.createElement('div')
  element.classList.add('training-day', 'flex-center')

  const label = createTrainingDayLabel(day)
  element.appendChild(label)

  const input = createTrainingDayInput()
  element.appendChild(input)

  const removeButton = createRemoveButton()
  element.appendChild(removeButton)

  removeButton.addEventListener('click', () => {
    element.remove()
    onRemove()
  })

  return {
    getElement: function () {
      return element
    },
    onRemove: function (listener) {
      onRemove = listener
    }
  }
}

function createTrainingDayLabel(day) {
  const span = document.createElement('span')
  span.classList.add('training-day-label')
  span.innerText = `Day ${day}`
  return span
}

function createTrainingDayInput() {
  const input = document.createElement('input')
  input.setAttribute('type', 'text')
  input.setAttribute('required', '')
  return input
}

function createRemoveButton() {
  const button = document.createElement('button')
  button.setAttribute('type', 'button')
  button.innerText = '❌'

  return button
} 