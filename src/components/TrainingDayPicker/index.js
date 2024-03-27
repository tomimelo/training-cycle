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
    const { trainings, startDate } = this._trainingCycle

    const wrapper = document.createElement('div')
    wrapper.innerHTML = `
      <div class="flex-center training-description">
        <p>Your training: <span>${trainings.length} days</span> starting on <span>${startDate}</span></p>
        <button type="button" class="edit-button">🖊</button>
      </div>
      <div class="flex-center date-picker">
        <span>Select date:</span>
        <input class="date-input" type="date" name="date" min="${startDate}" required>
      </div>
    `

    return wrapper
  }

  _setupListeners() {
    const editButton = $('button.edit-button', this._wrapper)

    editButton.addEventListener('click', () => {
      this._edited()
    })

    const dateInput = $('input[name="date"]', this._wrapper)

    dateInput.addEventListener('change', (event) => {
      const date = event.target.value || undefined
      this._updateWorkout(date)
    })
  }

  _updateWorkout(date) {
    if (date) {
      const nextWorkout = this._calculateNextWorkout(date)
      this._showNextWorkout(nextWorkout)
      return
    }

    this._removeNextWorkout()
  }

  _calculateNextWorkout(date) {
    const { trainings, startDate } = this._trainingCycle
    const daysDifference = Math.ceil((date.getTime() - startDate.getTime()) / 1000 / 60 / 60 / 24)
    const index = daysDifference % trainings.length
    const training = trainings[index]
    return {name: training, index}
  }

  _showNextWorkout({name, index}) {}

  _removeNextWorkout() {}
}