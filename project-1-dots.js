import { LitElement, html, css } from "lit";
import { DDDSuper } from "@haxtheweb/d-d-d/d-d-d.js";

export class Project1Dots extends DDDSuper(LitElement) {
  static get tag() { return "project-1-dots"; }

  static get properties() {
    return {
      count: { type: Number },
      index: { type: Number },
    };
  }

  constructor() {
    super();
    this.count = 0;
    this.index = 0;
  }

  static get styles() {
    return [
      super.styles,
      css`
        :host {
          display: flex;
          justify-content: center;
          gap: var(--ddd-spacing-3);
          padding: var(--ddd-spacing-3) 0;
        }
        .dot {
          width: 12px;
          height: 12px;
          border-radius: 50%;
          border: 2px solid transparent;
          background: var(--ddd-theme-default-limestoneGray);
          cursor: pointer;
          padding: 0;
          transition: 0.2s all ease;
        }
        .dot:hover, .dot:focus {
          background: var(--ddd-theme-default-limestoneMax);
        }
        .dot.active {
          background: var(--ddd-theme-default-link);
          transform: scale(1.2);
        }
        @media (prefers-color-scheme: dark) {
          .dot {
            background: var(--ddd-theme-default-coalyGray);
          }
        }
      `
    ];
  }

  handleDotClick(index) {
    this.dispatchEvent(new CustomEvent("play-list-index-changed", {
      composed: true,
      bubbles: true,
      detail: { index: index }
    }));
  }

  render() {
    return html`
      ${Array.from({ length: this.count }, (_, i) => html`
        <button
          class="dot ${i === this.index ? 'active' : ''}"
          @click="${() => this.handleDotClick(i)}"
          role="tab"
          aria-selected="${i === this.index}"
          aria-label="Go to slide ${i + 1}">
        </button>
      `)}
    `;
  }
}
globalThis.customElements.define(Project1Dots.tag, Project1Dots);