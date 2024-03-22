export function TrainingDay(day) {
  let onRemove = () => {}

  const element = document.createElement('div')
  element.classList.add('training-day', 'flex-center')

  const label = createTrainingDayLabel(day)
  element.appendChild(label)

  const input = createTrainingDayInput()
  element.appendChild(input)

  const button = createRemoveButton()
  element.appendChild(button)

  button.addEventListener('click', () => {
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
  return input
}

function createRemoveButton() {
  const button = document.createElement('button')
  button.setAttribute('type', 'button')
  button.classList.add('button')
  button.innerText = '❌'

  return button
} 