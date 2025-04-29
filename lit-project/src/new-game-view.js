import { LitElement, css, html } from "lit";

export class NewGameView extends LitElement {
  static get properties() {
    return {
      inputs: { type: Array },
    };
  }

  constructor() {
    super();
    this.inputs = ["", ""];
  }

  addInput() {
    if (this.inputs.length < 5) {
      this.inputs = [...this.inputs, ""];
    }
  }

  updateInput(event, index) {
    const inputValue = event.target.value;
    this.inputs = [
      ...this.inputs.slice(0, index),
      inputValue,
      ...this.inputs.slice(index + 1),
    ];
  }

  render() {
    return html`
      <div class="container">
        <div class="header"><h1>New Game</h1></div>
        <div class="inputs-container">
          ${this.inputs.map(
            (inputValue, index) => html`
              <div class="input-row">
                <span>${index + 1}.</span>
                <input
                  type="text"
                  .value=${inputValue}
                  @input=${(e) => this.updateInput(e, index)}
                />
              </div>
            `
          )}
        </div>
        <button @click=${this.addInput} ?disabled="${this.inputs.length >= 5}">
          +
        </button>
        <button class="save-button" @click=${() => console.log(this.inputs)}>
          Save
        </button>
      </div>
    `;
  }

  static get styles() {
    return css`
      :host {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100vh;
      }

      .container {
        text-align: center;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 10px;
      }

      .inputs-container {
        display: flex;
        flex-direction: column;
        gap: 10px;
        align-items: center;
      }

      .input-row {
        display: flex;
        align-items: center;
        gap: 10px;
      }

      input {
        width: 200px;
      }

      button {
        width: 30px;
        margin-top: 10px;
        padding: 5px;
      }

      .save-button {
        width: 100px;
      }
    `;
  }
}

window.customElements.define("new-game-view", NewGameView);
