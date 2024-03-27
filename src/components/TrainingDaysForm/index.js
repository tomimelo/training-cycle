import './style.css'
import { $, $$ } from '../../utils/dom';
import { TrainingDayComponent } from '../TrainingDay'
import { ADD_TRAINING_DAY_BUTTON, CONFIRM_CYCLE } from '../../constants/selectors';

export class TrainingDaysFormComponent {
  _days = 0
  _addTrainingDayButton
  _confirmButton
  confirmed = () => { }
  _form
  content

  constructor(trainingCycle) {
    const wrapper = this._create()
    this.content = Array.from(wrapper.children)
    this._form = $('form', wrapper)
    this._addTrainingDayButton = $(ADD_TRAINING_DAY_BUTTON, this._form)
    this._confirmButton = $(CONFIRM_CYCLE, this._form)
    this._init(trainingCycle)
  }

  onConfirm(listener) {
    this.confirmed = listener
  }

  _init(trainingCycle) {
    if (trainingCycle) {
      this._populateForm(trainingCycle)
    } else {
      Array.from({ length: 4 }).forEach(() => { this._addDay() })
    }
    this._setupListeners()
  }

  _populateForm(trainingCycle) {
    const {startDate, trainings} = trainingCycle

    const startDateInput = $('input[name="start-date"]', this._form)
    startDateInput.value = startDate

    trainings.forEach((training, i) => {
      this._addDay()
      const input = $(`input[name="day-${i+1}"]`, this._form)
      input.value = training
    })
  }

  _setupListeners() {
    this._addTrainingDayButton.addEventListener('click', () => { this._addDay() })

    this._form.addEventListener('submit', (event) => {
      event.preventDefault()
      this.confirmed(this._getFormValues())
    })
  }

  _getFormValues() {
    const formData = new FormData(this._form)
    const [startDate, ...trainings] = Array.from(formData.values())
    return { startDate, trainings }
  }

  _addDay() {
    const trainingDay = new TrainingDayComponent(++this._days)
    const trainingDayElement = trainingDay.element

    trainingDay.onRemove(() => {
      this._days = Math.max(0, --this._days)
      this._recomputeDays()
    })

    this._addTrainingDayButton.before(trainingDayElement)
  }

  _recomputeDays() {
    const dayLabels = $$('span.training-day-label', this._form)
    dayLabels.forEach((label, index) => {
      label.innerText = `Day ${index + 1}`
    })
  }

  _create() {
    const wrapper = document.createElement('div')
    wrapper.innerHTML = `
      <h2>Add your training split</h2>
      <form class="training-days-form flex-column flex-center full-width" autocomplete="off">
        <label class="flex-center start-date-label">
          <span>Start date:</span>
          <input class="date-input" type="date" name="start-date" required>
        </label>
        <button type="button" class="add-training-day full-width">+ Add day</button>
        <button type="submit" class="confirm-cycle full-width">Continue</button>
      </form>
    `
    return wrapper
  }
}
