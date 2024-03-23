import './style.css'
import { $, replaceContent } from '../../utils/dom';
import { ADD_TRAINING_DAY_BUTTON, APP, CONFIRM_CYCLE } from '../../constants/selectors';
import { TrainingDaysList } from '../TrainingDaysList';

export function TrainingCycle() {
  const content = TrainingCycle.new()

  function createConfirmCycleButton() {
    const button = document.createElement('button')
    button.innerText = 'Continue'
    button.classList.add('confirm-cycle', 'button', 'full-width')

    return button
  }

  return {
    render: function () {
      const app = $(APP)
      replaceContent(app, content)
      this._init()
    },
    _init: function () {
      const trainingDaysList = new TrainingDaysList()
      const addTrainingDayButton = $(ADD_TRAINING_DAY_BUTTON)

      addTrainingDayButton.addEventListener('click', function () {
        trainingDaysList.addDay()
      })

      trainingDaysList.onDaysChanged((days) => {
        const button = $(CONFIRM_CYCLE)

        if (days && !button) {
          const createdButton = createConfirmCycleButton()
          $(TrainingCycle.selector).appendChild(createdButton)
        }

        if (!days && button) {
          button.remove()
        }
      })
    }
  }
}

TrainingCycle.new = function () {
  const wrapper = document.createElement('div')
  wrapper.innerHTML = `
      <h1>Training cycle 💪🏼</h1>
      <div class="training-cycle flex-column flex-center">
        <h2>Add your training cycle</h2>
        <button class="add-training-day full-width">+ Add day</button>
      </div>
  `

  return Array.from(wrapper.children)
}

TrainingCycle.selector = 'div.training-cycle'
