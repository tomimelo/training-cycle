import { TrainingCyclePage } from './pages/TrainingCycle'
import { APP } from './constants/selectors'
import './style.css'
import { $, render } from './utils/dom'

function start() {
  const app = $(APP)

  const trainingCyclePage = new TrainingCyclePage()
  render(app, trainingCyclePage.content)
}

start()