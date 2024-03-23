import { $, $$, replaceContent } from '../../utils/dom'
import { TrainingDay } from '../TrainingDay'
import { APP, ADD_DAYS_BUTTON, CONFIRM_CYCLE, DAYS_LIST } from '../../constants/selectors'
import './style.css'

export function TrainingCycle() {
  const content = TrainingCycle.new()

  return {
    render: function () {
      const app = $(APP)
      replaceContent(app, content)
      this._init()
    },
    _init: function () {
      setupAddDaysButton()
    }
  }
}

TrainingCycle.new = function () {
  const wrapper = document.createElement('div')
  wrapper.innerHTML = `
      <h1>Training cycle 💪🏼</h1>
      <div class="training-cycle flex-column flex-center">
        <h2>Add your training cycle</h2>
        <button class="add-day full-width">+ Add day</button>
      </div>
  `

  return Array.from(wrapper.children)
}

function getDaysListElement() {
  const currentDaysList = $(DAYS_LIST)
  return currentDaysList ? currentDaysList : createDaysList()
}

function createDaysList() {
  const trainingCycleDescription = $('div.training-cycle h2')
  const daysList = document.createElement('form')
  daysList.classList.add('days-cycle-list', 'flex-column', 'flex-center')

  trainingCycleDescription.after(daysList)
  return daysList
}

function setupAddDaysButton() {
  let days = 0
  const addDaysButton = $(ADD_DAYS_BUTTON)

  addDaysButton.addEventListener('click', function () {
    const daysListElement = getDaysListElement()
    const trainingDay = TrainingDay(++days)
    const trainingDayElement = trainingDay.getElement()

    trainingDay.onRemove(() => {
      trainingDayElement.remove()
      days = Math.max(0, --days)
      recomputeDays()
      updateContinueButton(days)
    })

    daysListElement.appendChild(trainingDayElement)
    updateContinueButton(days)
  })
}

function recomputeDays() {
  const dayLabels = $$('span.training-day-label')
  dayLabels.forEach((label, index) => {
    label.innerText = `Day ${index + 1}`
  })
}

function updateContinueButton(days) {
  const button = $(CONFIRM_CYCLE)

  if (days && !button) {
    const createdButton = createConfirmCycleButton()
    $(ADD_DAYS_BUTTON).after(createdButton)
  }

  if (!days && button) {
    button.remove()
  }
}

function createConfirmCycleButton() {
  const button = document.createElement('button')
  button.innerText = 'Continue'
  button.classList.add('confirm-cycle', 'button', 'full-width')

  return button
}
