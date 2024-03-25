import './style.css'
import { $, $$ } from '../../utils/dom'
import { TrainingDayComponent } from '../TrainingDay'

export class TrainingDaysListComponent {
  _days = 0
  _element
  daysChanged = () => {}

  get element() {
    if (this._element) {
      return this._element
    }
    this._setElement()
    return this._element
  }

  set element(e) {
    this._element = e
    const trainingCycleDescription = $('div.training-cycle h2')
    trainingCycleDescription.after(this._element)
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

  onDaysChanged(listener) {
    this.daysChanged = listener
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
    return form
  }
}
