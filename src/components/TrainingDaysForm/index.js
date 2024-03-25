import './style.css'
import { $, $$ } from '../../utils/dom';
import { TrainingDayComponent } from '../TrainingDay'
import { ADD_TRAINING_DAY_BUTTON, CONFIRM_CYCLE } from '../../constants/selectors';

export class TrainingDaysFormComponent {
  _days = 0
  _addTrainingDayButton
  element
  confirmed = () => { }

  static selector = 'form.training-days-form'

  constructor() {
    this.element = $(TrainingDaysFormComponent.selector)
    this._addTrainingDayButton = $(ADD_TRAINING_DAY_BUTTON)
    this._setupListeners()
  }

  onConfirm(listener) {
    this.confirmed = listener
  }

  _setupListeners() {
    this._addTrainingDayButton.addEventListener('click', () => { this._addDay() })

    this.element.addEventListener('submit', (event) => {
      event.preventDefault()
      this.confirmed(this._getFormValues())
    })
  }

  _getFormValues() {
    const formData = new FormData(this.element)
    return Array.from(formData.values())
  }

  _addDay() {
    const trainingDay = new TrainingDayComponent(++this._days)
    const trainingDayElement = trainingDay.element

    trainingDay.onRemove(() => {
      this._days = Math.max(0, --this._days)
      this._recomputeDays()
      this._updateConfirmCycleButton()
    })

    this._addTrainingDayButton.before(trainingDayElement)
    this._updateConfirmCycleButton()
  }

  _recomputeDays() {
    const dayLabels = $$('span.training-day-label')
    dayLabels.forEach((label, index) => {
      label.innerText = `Day ${index + 1}`
    })
  }

  _updateConfirmCycleButton() {
    const button = $(CONFIRM_CYCLE)

    if (this._days && !button) {
      const createdButton = this._createConfirmCycleButton()
      this.element.appendChild(createdButton)
    }

    if (!this._days && button) {
      button.remove()
    }
  }

  _createConfirmCycleButton() {
    const button = document.createElement('button')
    button.innerText = 'Continue'
    button.classList.add('confirm-cycle', 'button', 'full-width')
    button.setAttribute('type', 'submit')

    return button
  }

}
