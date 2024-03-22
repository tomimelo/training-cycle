import { TrainingDay } from './components/TrainingDay'
import { ADD_DAYS_BUTTON, DAYS_LIST } from './constants/selectors'
import './style.css'
import { $, $$ } from './utils/dom'

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
    })

    daysListElement.appendChild(trainingDayElement)
  })
}

function recomputeDays() {
  const dayLabels = $$('span.training-day-label')
  dayLabels.forEach((label, index) => {
    label.innerText = `Day ${index+1}`
  })
}

setupAddDaysButton()