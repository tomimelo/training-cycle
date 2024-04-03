import { $ } from '../../utils/dom'
import './style.css'

export class TrainingDayPickerComponent {
  _trainingCycle
  content
  _datePicker
  _edited = () => { }

  constructor(trainingCycle) {
    this._trainingCycle = trainingCycle
    const wrapper = this._create()
    this._datePicker = $('div.date-picker', wrapper)
    this.content = Array.from(wrapper.children)
    this._setupListeners(wrapper)
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

  _setupListeners(wrapper) {
    const editButton = $('button.edit-button', wrapper)

    editButton.addEventListener('click', () => {
      this._edited()
    })

    const dateInput = $('input[name="date"]', wrapper)

    dateInput.addEventListener('change', (event) => {
      const date = event.target.value || undefined
      this._updateWorkout(date)
    })
  }

  _updateWorkout(date) {
    this._removeNextWorkout()
    if (date) {
      const nextWorkout = this._calculateNextWorkout(new Date(date))
      this._showNextWorkout(nextWorkout)
    }
  }

  _calculateNextWorkout(date) {
    const { trainings, startDate } = this._trainingCycle
    const daysDifference = Math.ceil((date.getTime() - new Date(startDate).getTime()) / 1000 / 60 / 60 / 24)
    const index = daysDifference % trainings.length
    const training = trainings[index]
    const microcycle = Math.ceil(daysDifference / trainings.length)
    return { name: training, day: index + 1, microcycle }
  }

  _showNextWorkout({ name, day, microcycle }) {
    const div = document.createElement('div')
    div.classList.add('flex-center', 'next-workout-wrapper')

    const span = document.createElement('span')
    span.innerText = 'Your workout will be:'

    const workoutSpan = document.createElement('span')
    workoutSpan.classList.add('next-workout')
    workoutSpan.innerText = `${name} (Day ${day} - Microcycle ${microcycle})`

    div.append(span, workoutSpan)

    this._datePicker.after(div)
  }

  _removeNextWorkout() {
    const nextWorkout = $('div.next-workout-wrapper')
    nextWorkout?.remove()
  }
}