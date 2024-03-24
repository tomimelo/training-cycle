import './style.css'

export class TrainingDayComponent {
  element;
  removed = () => {}

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
  
    const input = this._createInput()
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

  _createInput() {
    const input = document.createElement('input')
    input.setAttribute('type', 'text')
    input.setAttribute('required', '')
    return input
  }

  _createRemoveButton() {
    const button = document.createElement('button')
    button.setAttribute('type', 'button')
    button.innerText = '❌'
  
    return button
  } 
}
