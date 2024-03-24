import { TrainingCycle } from './components/TrainingCycle'
import { APP } from './constants/selectors'
import './style.css'
import { $, replaceContent } from './utils/dom'

function start() {
  const app = $(APP)

  const trainingCycle = new TrainingCycle()
  replaceContent(app, trainingCycle.content)
}

start()