import { TrainingCycleComponent } from './components/TrainingCycle'
import { APP } from './constants/selectors'
import './style.css'
import { $, render } from './utils/dom'

function start() {
  const app = $(APP)

  const trainingCycleComponent = new TrainingCycleComponent()
  render(app, trainingCycleComponent.content)
}

start()
