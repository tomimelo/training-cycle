import { $ } from '../../utils/dom'
import './style.css'

export class TrainingDayPickerComponent {
  _trainingCycle
  _wrapper
  content
  _edited = () => { }

  constructor(trainingCycle) {
    this._trainingCycle = trainingCycle
    this._wrapper = this._create()
    this.content = Array.from(this._wrapper.children)
    this._setupListeners()
  }

  onEdit(listener) {
    this._edited = listener
  }

  _create() {
    const {trainings, startDate} = this._trainingCycle

    const wrapper = document.createElement('div')
    wrapper.innerHTML = `
      <div class="flex-center training-description">
        <p>Your training: <span>${trainings.length} days</span> starting on <span>${startDate}</span></p>
        <button type="button" class="edit-button">🖊</button>
      </div>
    `

    return wrapper
  }

  _setupListeners() {
    const editButton = $('button.edit-button', this._wrapper)

    editButton.addEventListener('click', () => {
      this._edited()
    })
  }
}