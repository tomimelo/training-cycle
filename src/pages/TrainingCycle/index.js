import './style.css'
import { $ } from '../../utils/dom'
import {
  ADD_TRAINING_DAY_BUTTON,
  CONFIRM_CYCLE,
} from '../../constants/selectors'
import { TrainingDaysListComponent } from '../../components/TrainingDaysList'

export class TrainingCyclePage {
  static selector = 'div.training-cycle'

  content

  constructor() {
    this.content = this._create()
  }

  _create() {
    const wrapper = this._createWrapper()
    const trainingDaysList = new TrainingDaysListComponent()
    const addTrainingDayButton = $(ADD_TRAINING_DAY_BUTTON, wrapper)

    addTrainingDayButton.addEventListener('click', function () {
      trainingDaysList.addDay()
    })

    trainingDaysList.onDaysChange((days) => {
      const button = $(CONFIRM_CYCLE)

      if (days && !button) {
        const createdButton = this._createConfirmCycleButton()
        $(TrainingCyclePage.selector).appendChild(createdButton)
      }

      if (!days && button) {
        button.remove()
      }
    })

    trainingDaysList.onConfirm((values) => {
      console.log({values});
    })

    return Array.from(wrapper.children)
  }

  _createConfirmCycleButton() {
    const button = document.createElement('button')
    button.innerText = 'Continue'
    button.classList.add('confirm-cycle', 'button', 'full-width')
    button.setAttribute('form', 'training-days-list')
    button.setAttribute('type', 'submit')

    return button
  }

  _createWrapper() {
    const wrapper = document.createElement('div')
    wrapper.innerHTML = `
      <h1>Training cycle 💪🏼</h1>
      <div class="training-cycle flex-column flex-center">
        <h2>Add your training cycle</h2>
        <button class="add-training-day full-width">+ Add day</button>
      </div>
    `
    return wrapper
  }
}
