import { LitElement, css, html } from "lit";
import './new-game-view.js'

export class PortRoyal extends LitElement {
  static get properties() {
    return {
    };
  }

  constructor() {
    super();
  }

  render() {
    return html` <new-game-view></new-game-view>`;
  }
}

window.customElements.define("port-royal", PortRoyal);
