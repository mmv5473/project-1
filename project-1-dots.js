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
          padding: var(--ddd-spacing-3) 0;
        }

        .dot-list {
          display: flex;
          gap: var(--ddd-spacing-3);
          list-style: none;
          margin: 0;
          padding: 0;
        }

        .dot {
          width: 12px;
          height: 12px;
          border-radius: 50%;
          border: none;
          background: var(--ddd-theme-default-limestoneGray);
          cursor: pointer;
          padding: 0;
          transition: background 0.2s ease, transform 0.2s ease;
          display: block;
        }
        .dot:hover,
        .dot:focus-visible {
          background: var(--ddd-theme-default-limestoneMax);
          outline: 2px solid var(--ddd-theme-default-link);
          outline-offset: 2px;
        }
        .dot.active {
          background: var(--ddd-theme-default-link);
          transform: scale(1.2);
        }

        @media (prefers-color-scheme: dark) {
          .dot {
            background: #555;
          }
          .dot.active {
            background: var(--ddd-theme-default-link);
          }
        }
      `
    ];
  }

  handleDotClick(index) {
    this.dispatchEvent(new CustomEvent("play-list-index-changed", {
      composed: true,
      bubbles: true,
      detail: { index }
    }));
  }

  render() {
    if (this.count === 0) return html``;

    
    return html`
      <slide aria-label="Photo slide navigation">
        <ul class="dot-list">
          ${Array.from({ length: this.count }, (_, i) => html`
            <li>
              <button
                class="dot ${i === this.index ? "active" : ""}"
                @click="${() => this.handleDotClick(i)}"
                aria-label="Go to slide ${i + 1} of ${this.count}"
                aria-current="${i === this.index ? "true" : "false"}"
              ></button>
            </li>
          `)}
        </ul>
  </slide>
    `;
  }
}

globalThis.customElements.define(Project1Dots.tag, Project1Dots);