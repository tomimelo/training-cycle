import { pickRandom } from '../../utils/functions'
import './style.css'

const TRAINING_EXAMPLES = ['Push', 'Pull', 'Legs', 'Arms', 'Chest & Biceps', 'Back & Triceps', 'Full-body', 'Back', 'Chest', 'Cardio', 'Abs']

export class TrainingDayComponent {
  element
  removed = () => { }

  constructor(num) {
    this.element = this._create(num)
  }

  onRemove(listener) {
    this.removed = listener
  }

  _create(num) {
    const element = document.createElement('div')
    element.classList.add('training-day', 'flex-center')

    const label = this._createLabel(num)
    element.appendChild(label)

    const input = this._createInput(num)
    element.appendChild(input)

    const removeButton = this._createRemoveButton()
    element.appendChild(removeButton)

    removeButton.addEventListener('click', () => {
      this.element.remove()
      this.removed()
    })

    return element
  }

  _createLabel(num) {
    const span = document.createElement('span')
    span.classList.add('training-day-label')
    span.innerText = `Day ${num}`
    return span
  }

  _createInput(num) {
    const input = document.createElement('input')
    input.setAttribute('type', 'text')
    input.setAttribute('name', `day-${num}`)
    input.setAttribute('required', '')
    input.setAttribute('placeholder', pickRandom(TRAINING_EXAMPLES))
    return input
  }

  _createRemoveButton() {
    const button = document.createElement('button')
    button.setAttribute('type', 'button')
    button.innerText = '❌'

    return button
  }
}
