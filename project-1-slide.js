
import { LitElement, html, css } from "lit";
import { DDDSuper } from "@haxtheweb/d-d-d/d-d-d.js";

export class Project1Nav extends DDDSuper(LitElement) {
  static get tag() { return "project-1-slide"; }

  static get properties() {
    return {
      direction: { type: String },
      disabled: { type: Boolean, reflect: true },
    };
  }

  constructor() {
    super();
    this.direction = "next";
    this.disabled = false;
  }

  static get styles() {
    return [
      super.styles,
      css`
        :host {
          display: flex;
          align-items: center;
        }
        .slide-button {
          flex-shrink: 0;
          background: white;
          border: 2px solid var(--ddd-theme-default-link);
          color: var(--ddd-theme-default-link);
          border-radius: var(--ddd-radius-circle);
          width: 44px;
          height: 44px;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: 0.2s all ease;
          z-index: 2;
        }
        .slide-button:hover,
        .slide-button:focus {
          background: var(--ddd-theme-default-link);
          color: white;
          outline: none;
        }
        .slide-button:focus-visible {
          outline: 2px solid var(--ddd-theme-default-link);
          outline-offset: 2px;
        }
        .slide-button:disabled {
          opacity: 0.3;
          cursor: default;
        }
        @media (max-width: 600px) {
          .slide-button { width: 32px; height: 32px; font-size: 14px; }
        }
        @media (prefers-color-scheme: dark) {
          .slide-button {
            background: var(--ddd-theme-default-coalyGray);
            border-color: var(--ddd-theme-default-link);
          }
        }
      `
    ];
  }

  handleClick() {
    this.dispatchEvent(new CustomEvent("play-list-slide-clicked", {
      composed: true,
      bubbles: true,
      detail: { direction: this.direction }
    }));
  }

  render() {
    return html`
      <button
        class="slide-button"
        ?disabled="${this.disabled}"
        @click="${this.handleClick}"
        aria-label="${this.direction === 'prev' ? 'Previous Slide' : 'Next Slide'}">
        ${this.direction === 'prev' ? '❮' : '❯'}
      </button>
    `;
  }
}

globalThis.customElements.define(Project1Nav.tag, Project1Nav);
