import './style.css'
import { TrainingDaysFormComponent } from '../../components/TrainingDaysForm'
import { $, render } from '../../utils/dom'

const TRAINING_CYCLE_KEY = 'training-cycle'

export class TrainingCyclePage {
  static selector = 'div.training-cycle'
  trainingCycle
  content
  _wrapper

  constructor() {
    this.trainingCycle = this._loadTrainingCycle()
    this.content = this._create()
  }

  _create() {
    this._wrapper = this._createWrapper()

    if (!this.trainingCycle) {
      this._initForm()
    }

    return Array.from(this._wrapper.children)
  }

  _initForm() {
    const trainingDaysForm = new TrainingDaysFormComponent()

    trainingDaysForm.onConfirm((values) => {
      localStorage.setItem('training-cycle', JSON.stringify(values))
      console.log({ values });
    })

    const context = $(TrainingCyclePage.selector, this._wrapper)
    render(context, trainingDaysForm.content)
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
