import './style.css'
import { TrainingDaysFormComponent } from '../TrainingDaysForm'
import { $, render } from '../../utils/dom'
import { TrainingDayPickerComponent } from '../TrainingDayPicker'

const TRAINING_CYCLE_KEY = 'training-cycle'

export class TrainingCycleComponent {
  static selector = 'div.training-cycle'
  trainingCycle
  content
  _wrapper

  constructor() {
    this.trainingCycle = this._loadTrainingCycle()
    this.content = this._create()
    this._element = $(TrainingCycleComponent.selector, this._wrapper)
    this._init()
  }

  _create() {
    this._wrapper = this._createWrapper()
    return Array.from(this._wrapper.children)
  }

  _init() {
    if (!this.trainingCycle) {
      this._initForm()
    } else {
      this._initDayPicker(this.trainingCycle)
    }
  }

  _initForm() {
    const trainingDaysForm = new TrainingDaysFormComponent()

    trainingDaysForm.onConfirm((values) => {
      localStorage.setItem('training-cycle', JSON.stringify(values))
      this._initDayPicker(values)
    })

    render(this._element, trainingDaysForm.content)
  }

  _initDayPicker(trainingCycle) {
    const trainingDayPicker = new TrainingDayPickerComponent(trainingCycle)

    render(this._element, trainingDayPicker.content)
  }

  _loadTrainingCycle() {
    const rawTrainingCycle = localStorage.getItem(TRAINING_CYCLE_KEY)
    if (!rawTrainingCycle) {
      return
    }

    try {
      const trainingCycle = JSON.parse(rawTrainingCycle)
      if (this._isTrainingCycleValid(trainingCycle)) {
        return trainingCycle
      } else {
        localStorage.removeItem(TRAINING_CYCLE_KEY)
      }
    } catch (e) {
      localStorage.removeItem(TRAINING_CYCLE_KEY)
    }
  }

  _isTrainingCycleValid(trainingCycle) {
    const trainingsAreValid = Array.isArray(trainingCycle.trainings) && trainingCycle.trainings.length && trainingCycle.trainings.every(t => typeof t === 'string')
    const startDateIsValid = !isNaN(new Date(trainingCycle.startDate))

    return trainingsAreValid && startDateIsValid
  }

  _createWrapper() {
    const wrapper = document.createElement('div')
    wrapper.innerHTML = `
      <h1>Training cycle 💪🏼</h1>
      <div class="training-cycle flex-column flex-center"></div>
    `

    return wrapper
  }
}
