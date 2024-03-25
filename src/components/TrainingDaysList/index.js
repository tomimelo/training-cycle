import './style.css'
import { $, $$ } from '../../utils/dom'
import { TrainingDayComponent } from '../TrainingDay'
import { ADD_TRAINING_DAY_BUTTON } from '../../constants/selectors'

export class TrainingDaysListComponent {
  _days = 0
  _element
  daysChanged = () => { }
  confirmed = () => { }

  get element() {
    if (this._element) {
      return this._element
    }
    this._setElement()
    return this._element
  }

  set element(e) {
    this._element = e
    const addTrainingDayButton = $(ADD_TRAINING_DAY_BUTTON)
    addTrainingDayButton.before(this._element)
  }

  static selector = 'form.training-days-list'

  addDay() {
    const trainingDay = new TrainingDayComponent(++this._days)
    const trainingDayElement = trainingDay.element

    trainingDay.onRemove(() => {
      this._days = Math.max(0, --this._days)
      this._recomputeDays()
      this._emitDaysChanged()
    })

    this.element.appendChild(trainingDayElement)
    this._emitDaysChanged()
  }

  onDaysChange(listener) {
    this.daysChanged = listener
  }

  onConfirm(listener) {
    this.confirmed = listener
  }

  _emitDaysChanged() {
    this.daysChanged(this._days)
  }

  _setElement() {
    const element = this._create()
    this.element = element
  }

  _recomputeDays() {
    const dayLabels = $$('span.training-day-label')
    dayLabels.forEach((label, index) => {
      label.innerText = `Day ${index + 1}`
    })
  }

  _create() {
    const form = document.createElement('form')
    form.classList.add('training-days-list', 'flex-column', 'flex-center')
    form.setAttribute('id', 'training-days-list')

    form.addEventListener('submit', (event) => {
      event.preventDefault()
      const formData = new FormData(form)
      this.confirmed(Array.from(formData.values()))
    })

    return form
  }
}
