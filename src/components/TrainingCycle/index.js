import './style.css'
import { $, replaceContent } from '../../utils/dom';
import { ADD_TRAINING_DAY_BUTTON, APP, CONFIRM_CYCLE } from '../../constants/selectors';
import { TrainingDaysList } from '../TrainingDaysList';

export class TrainingCycle {
  static selector = 'div.training-cycle'

  content;

  constructor() {
    this.content = this._create()
  }

  _create() {
    const wrapper = document.createElement('div')
    wrapper.innerHTML = `
      <h1>Training cycle 💪🏼</h1>
      <div class="training-cycle flex-column flex-center">
        <h2>Add your training cycle</h2>
        <button class="add-training-day full-width">+ Add day</button>
      </div>
    `

    const trainingDaysList = new TrainingDaysList()
    const addTrainingDayButton = $(ADD_TRAINING_DAY_BUTTON, wrapper)
  
    addTrainingDayButton.addEventListener('click', function () {
      trainingDaysList.addDay()
    })
  
    trainingDaysList.onDaysChanged((days) => {
      const button = $(CONFIRM_CYCLE)
  
      if (days && !button) {
        const createdButton = this._createConfirmCycleButton()
        $(TrainingCycle.selector).appendChild(createdButton)
      }
  
      if (!days && button) {
        button.remove()
      }
    })

    return Array.from(wrapper.children)
  }

  _createConfirmCycleButton() {
    const button = document.createElement('button')
    button.innerText = 'Continue'
    button.classList.add('confirm-cycle', 'button', 'full-width')

    return button
  }
}
