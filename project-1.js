import { LitElement, html, css } from "lit";
import { DDDSuper } from "@haxtheweb/d-d-d/d-d-d.js";
import { I18NMixin } from "@haxtheweb/i18n-manager/lib/I18NMixin.js";
import "./project-1-dots.js";
import "./project-1-slide.js";

const TOTAL_FOXES = 5;

export class Project1 extends DDDSuper(I18NMixin(LitElement)) {

  static get tag() {
    return "project-1";
  }

  constructor() {
    super();
    this.liked = false;
    this.loading = true;
    this.images = [];
    this.activeIndex = 0;
    this.t = this.t || {};
    this.t = { ...this.t, title: "Photo Gallery" };
    this.registerLocalization({
      context: this,
      localesPath:
        new URL("./locales/project-1.ar.json", import.meta.url).href + "/../",
    });
  }

  static get properties() {
    return {
      ...super.properties,
      liked: { type: Boolean },
      loading: { type: Boolean },
      images: { type: Array },
      activeIndex: { type: Number },
    };
  }

  static get styles() {
    return [
      super.styles,
      css`
        :host {
          display: block;
          font-family: var(--ddd-font-navigation);
        }

        .card {
          max-width: 380px;
          margin: var(--ddd-spacing-4) auto;
          border: 1px solid var(--ddd-theme-default-limestoneLight);
          border-radius: var(--ddd-radius-lg);
          overflow: hidden;
          background: var(--ddd-theme-default-white);
        }

        .header {
          display: flex;
          align-items: center;
          gap: var(--ddd-spacing-3);
          padding: var(--ddd-spacing-3) var(--ddd-spacing-4);
          border-bottom: 1px solid var(--ddd-theme-default-limestoneLight);
        }

        .avatar {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          background: var(--ddd-theme-default-slateMaxLight);
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--ddd-theme-default-nittanyNavy);
          flex-shrink: 0;
        }

        .username {
          font-size: var(--ddd-font-size-s);
          font-weight: var(--ddd-font-weight-bold);
          margin: 0;
          color: var(--ddd-theme-default-slateMaxLight);
        }

        .channel {
          font-size: var(--ddd-font-size-4xs);
          margin: 0;
          color: var(--ddd-theme-default-slateMaxLight);
        }

        .img-container {
          position: relative;
          width: 100%;
          display: flex;
          align-items: center;
        }

        .img-wrap {
          width: 100%;
          height: 380px;
          aspect-ratio: 1 / 1;
          background: var(--ddd-theme-default-limestoneMaxLight);
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          flex-shrink: 0;
        }

        .img-wrap img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }

        .loading-text {
          font-size: var(--ddd-font-size-4xs);
          color: var(--ddd-theme-default-limestoneGray);
        }

        project-1-slide {
          position: absolute;
          z-index: 2;
        }

        project-1-slide[direction="prev"] {
          left: 0;
        }

        project-1-slide[direction="next"] {
          right: 0;
        }

        .actions {
          display: flex;
          align-items: center;
          padding: var(--ddd-spacing-3) var(--ddd-spacing-4) var(--ddd-spacing-2);
        }

        .like-btn {
          background: none;
          border: none;
          cursor: pointer;
          font-size: 24px;
          padding: var(--ddd-spacing-1);
          line-height: 1;
          transition: transform 0.15s ease;
        }

        .like-btn:hover {
          transform: scale(1.15);
        }

        .caption {
          padding: var(--ddd-spacing-1) var(--ddd-spacing-4) var(--ddd-spacing-4);
          font-size: var(--ddd-font-size-4xs);
          color: var(--ddd-theme-default-nittanyNavy);
          min-height: 40px;
        }

        .source-link {
          display: block;
          padding: 0 var(--ddd-spacing-4) var(--ddd-spacing-4);
          font-size: var(--ddd-font-size-4xs);
          color: var(--ddd-theme-default-link);
        }

        @media (max-width: 420px) {
          .card {
            margin: 0;
            border-radius: 0;
            border-left: none;
            border-right: none;
          }

          .img-wrap {
            height: 300px;
          }
        }

        @media (prefers-color-scheme: dark) {
          .card {
            background: var(--ddd-theme-default-coalyGray);
            border-color: #444;
          }

          .header {
            border-color: #444;
          }

          .username {
            color: var(--ddd-theme-default-white);
          }

          .caption {
            color: var(--ddd-theme-default-white);
          }

          .img-wrap {
            background: #222;
          }
        }
      `,
    ];
  }

  connectedCallback() {
    super.connectedCallback();
    this._loadPhotos();
    this.addEventListener("play-list-slide-clicked", this._handleNav);
    this.addEventListener("play-list-index-changed", this._handleDotClick);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.removeEventListener("play-list-slide-clicked", this._handleNav);
    this.removeEventListener("play-list-index-changed", this._handleDotClick);
  }

  async _loadPhotos() {
    this.loading = true;
    this.images = [];
    this.activeIndex = 0;
    try {
      const fetches = Array.from({ length: TOTAL_FOXES }, () =>
        fetch("https://randomfox.ca/floof/").then((r) => r.json())
      );
      const results = await Promise.all(fetches);
      this.images = results.map((data, i) => ({
        image: data.image,
        link: data.link,
      }));
    } catch (e) {
      console.error("Fetch failed:", e);
    } finally {
      this.loading = false;
    }
  }

  _handleNav(e) {
    const { direction } = e.detail;
    if (direction === "next" && this.activeIndex < this.images.length - 1) {
      this.activeIndex += 1;
    } else if (direction === "prev" && this.activeIndex > 0) {
      this.activeIndex -= 1;
    }
  }

  _handleDotClick(e) {
    this.activeIndex = e.detail.index;
  }

  _toggleLike() {
    this.liked = !this.liked;
  }

  render() {
    const current = this.images[this.activeIndex] || null;

    return html`
      <div class="card">

        <div class="header">
          <div class="avatar">CF</div>
          <div>
            <p class="username">A Very Cute Fox</p>
            <p class="channel">@cute_foxes</p>
          </div>
        </div>

        <div class="img-container">
          <project-1-slide
            direction="prev"
            ?disabled="${this.activeIndex === 0}"
          ></project-1-slide>

          <div class="img-wrap">
            ${this.loading
              ? html`<span class="loading-text">Loading Media...</span>`
              : current
                ? html`<img src="${current.image}" alt="${current.title}" />`
                : html`<span class="loading-text">No images found.</span>`}
          </div>

          <project-1-slide
            direction="next"
            ?disabled="${this.activeIndex === this.images.length - 1}"
          ></project-1-slide>
        </div>

        <project-1-dots
          count="${this.images.length}"
          index="${this.activeIndex}"
        ></project-1-dots>

        <div class="actions">
          <button class="like-btn" @click="${this._toggleLike}" title="Like">
            ${this.liked ? "♥" : "♡"}
          </button>
        </div>

        <p class="caption">${current?.title ?? ""} Here are some photos of cute foxes!</p>

        ${current?.link
          ? html`<a class="source-link" href="${current.link}" target="_blank">View source</a>`
          : ""}

      </div>
    `;
  }

  static get haxProperties() {
    return new URL(`./lib/${this.tag}.haxProperties.json`, import.meta.url).href;
  }
}

globalThis.customElements.define(Project1.tag, Project1);