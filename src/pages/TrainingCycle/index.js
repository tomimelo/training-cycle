import './style.css'

export class TrainingCyclePage {
  static selector = 'div.training-cycle'

  content

  constructor() {
    this.content = this._create()
  }

  _create() {
    const wrapper = this._createWrapper()

    return Array.from(wrapper.children)
  }

  _createWrapper() {
    const wrapper = document.createElement('div')
    wrapper.innerHTML = `
      <h1>Training cycle 💪🏼</h1>
      <div class="training-cycle flex-column flex-center">
        <h2>Add your training cycle</h2>
        <form class="training-days-form flex-column flex-center full-width" autocomplete="off">
          <label class="flex-center start-date-label">
          <span>Start date:</span>
          <input type="date" name="start-date" required>
          </label>
          <button type="button" class="add-training-day full-width">+ Add day</button>
        </form>
      </div>
    `
    return wrapper
  }
}
