import { TrainingCyclePage } from './pages/TrainingCycle'
import { APP } from './constants/selectors'
import './style.css'
import { $, replaceContent } from './utils/dom'

function start() {
  const app = $(APP)

  const trainingCyclePage = new TrainingCyclePage()
  replaceContent(app, trainingCyclePage.content)
}

start()