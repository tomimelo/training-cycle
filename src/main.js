import { TrainingCyclePage } from './pages/TrainingCycle'
import { APP } from './constants/selectors'
import './style.css'
import { $, render } from './utils/dom'
import { TrainingDaysFormComponent } from './components/TrainingDaysForm'

function start() {
  const app = $(APP)

  const trainingCyclePage = new TrainingCyclePage()
  render(app, trainingCyclePage.content)
  const trainingDaysForm = new TrainingDaysFormComponent()

  trainingDaysForm.onConfirm((values) => {
    console.log({ values });
  })
}

start()
