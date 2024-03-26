export class TrainingDayPickerComponent {
  _trainingCycle
  _wrapper
  content

  constructor(trainingCycle) {
    this._trainingCycle = trainingCycle
    this._wrapper = this._create()
    this.content = Array.from(this._wrapper.children)
  }

  _create() {
    const {trainings, startDate} = this._trainingCycle

    const wrapper = document.createElement('div')
    wrapper.innerHTML = `
      <p>Your training: <span>${trainings.length} days</span> starting on ${startDate}</p>
    `

    return wrapper
  }
}