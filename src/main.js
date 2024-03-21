import { ADD_DAYS_BUTTON, DAYS_LIST } from './constants/selectors'
import './style.css'
import { $ } from './utils/dom'

function getDaysListElement() {
  const currentDaysList = $(DAYS_LIST)
  return currentDaysList ? currentDaysList : createDaysList()
}

function createDaysList() {
  const trainingCycleDescription = $('div.training-cycle h2')
  const daysList = document.createElement('div')
  daysList.classList.add('days-cycle-list')

  trainingCycleDescription.after(daysList)
  return daysList
}

function setupAddDaysButton() {
  let days = 0
  const addDaysButton = $(ADD_DAYS_BUTTON)
  addDaysButton.addEventListener('click', function () {
    const daysListElement = getDaysListElement()
  })
}

setupAddDaysButton()