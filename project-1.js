import { LitElement, html, css } from "lit";
import { DDDSuper } from "@haxtheweb/d-d-d/d-d-d.js";
import { I18NMixin } from "@haxtheweb/i18n-manager/lib/I18NMixin.js";
import "./project-1-dots.js";
import "./project-1-slide.js";

const STORAGE_KEY = "project1_likes";

function getLikes() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");
  } catch {
    return {};
  }
}

function saveLikes(map) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(map));
  } catch {
  }
}

export class Project1 extends DDDSuper(I18NMixin(LitElement)) {

  static get tag() {
    return "project-1";
  }

  constructor() {
    super();
    this.loading = true;
    this.images  = [];
    this.author  = null;
    this.activeIndex = 0;
    this._likes  = {};
    this._shared = false;
    this._error  = null;
    this._requestedIndex = 0;
    this.t = this.t || {};
    this.t = { ...this.t, title: "Media Gallery" };
    this.registerLocalization({
      context: this,
      localesPath:
        new URL("./locales/project-1.ar.json", import.meta.url).href + "/../",
    });
  }

  static get properties() {
    return {
      ...super.properties,
      loading:     { type: Boolean },
      images:      { type: Array  },
      author:      { type: Object },
      activeIndex: { type: Number },
      _likes:      { type: Object,  state: true },
      _shared:     { type: Boolean, state: true },
      _error:      { type: String,  state: true },
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
          max-width: 400px;
          margin: var(--ddd-spacing-4) auto;
          border: 1px solid var(--ddd-theme-default-limestoneLight);
          border-radius: var(--ddd-radius-lg);
          overflow: hidden;
          background: var(--ddd-theme-default-white);
          box-shadow: 0 2px 12px rgba(0,0,0,.08);
        }

        .header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: var(--ddd-spacing-3);
          padding: var(--ddd-spacing-3) var(--ddd-spacing-4);
          border-bottom: 1px solid var(--ddd-theme-default-limestoneLight);
        }

        .header-left {
          display: flex;
          align-items: center;
          gap: var(--ddd-spacing-3);
        }

        .avatar {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          object-fit: cover;
          border: 2px solid var(--ddd-theme-default-link);
          flex-shrink: 0;
          background: var(--ddd-theme-default-limestoneMaxLight);
        }

        .avatar-fallback {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background: var(--ddd-theme-default-beaverBlue);
          color: #fff;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: var(--ddd-font-size-4xs);
          font-weight: var(--ddd-font-weight-bold);
          flex-shrink: 0;
        }

        .username {
          font-size: var(--ddd-font-size-s);
          font-weight: var(--ddd-font-weight-bold);
          margin: 0;
          color: var(--ddd-theme-default-nittanyNavy);
        }

        .channel {
          font-size: var(--ddd-font-size-4xs);
          margin: 0;
          color: var(--ddd-theme-default-limestoneGray);
        }

        .user-since {
          font-size: 24px;
          color: var(--ddd-theme-default-limestoneGray);
          margin: 0;
        }

        .img-container {
          position: relative;
          width: 100%;
          display: flex;
          align-items: center;
        }

        .img-wrap {
          width: 100%;
          aspect-ratio: 1 / 1;
          background: var(--ddd-theme-default-limestoneMaxLight);
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          flex-shrink: 0;
        }

        .slide {
          width: 100%;
          height: 100%;
          position: absolute;
          top: 0; left: 0;
          display: none;
        }
        .slide.active {
          display: block;
          position: relative;
        }

        .slide img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }

        .loading-text {
          font-size: var(--ddd-font-size-4xs);
          color: var(--ddd-theme-default-limestoneGray);
          padding: var(--ddd-spacing-2);
          text-align: center;
        }

        .error-text {
          font-size: var(--ddd-font-size-4xs);
          color: var(--ddd-theme-default-original87Pink);
          padding: var(--ddd-spacing-2);
          text-align: center;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: var(--ddd-spacing-2);
        }

        .retry-btn {
          font-size: var(--ddd-font-size-4xs);
          padding: var(--ddd-spacing-1) var(--ddd-spacing-3);
          background: var(--ddd-theme-default-link);
          color: #fff;
          border: none;
          border-radius: var(--ddd-radius-sm);
          cursor: pointer;
        }
        .retry-btn:hover { opacity: 0.85; }

        project-1-slide {
          position: absolute;
          z-index: 2;
        }
        project-1-slide[direction="prev"] { left: 0; }
        project-1-slide[direction="next"] { right: 0; }

        .meta-bar {
          padding: var(--ddd-spacing-1) var(--ddd-spacing-4) 0;
          font-size: 10px;
          color: var(--ddd-theme-default-limestoneGray);
          min-height: 20px;
        }

        .actions {
          display: flex;
          align-items: center;
          gap: var(--ddd-spacing-2);
          padding: var(--ddd-spacing-2) var(--ddd-spacing-4) var(--ddd-spacing-1);
        }

        .action-btn {
          background: none;
          border: none;
          cursor: pointer;
          padding: var(--ddd-spacing-1);
          line-height: 1;
          transition: transform 0.15s ease;
          display: flex;
          align-items: center;
          gap: 4px;
          font-size: 22px;
          color: inherit;
        }
        .action-btn:hover  { transform: scale(1.15); }
        .action-btn:focus-visible {
          outline: 2px solid var(--ddd-theme-default-link);
          border-radius: 4px;
        }

        .share-label {
          font-size: var(--ddd-font-size-4xs);
          color: var(--ddd-theme-default-link);
        }

        .caption-area {
          padding: var(--ddd-spacing-8) var(--ddd-spacing-8) var(--ddd-spacing-8);
          min-height: 64px;
        }

        .photo-title {
          font-size: var(--ddd-font-size-s);
          font-weight: var(--ddd-font-weight-bold);
          margin: 0 0 var(--ddd-spacing-1);
          color: var(--ddd-theme-default-nittanyNavy);
          min-height: 1.4em;
        }

        .photo-desc {
          font-size: var(--ddd-font-size-4xs);
          color: var(--ddd-theme-default-limestoneGray);
          margin: 0;
          min-height: 1.4em;
        }

        @media (max-width: 420px) {
          .card {
            margin: 0;
            border-radius: 0;
            border-left: none;
            border-right: none;
          }
        }

        @media (prefers-color-scheme: dark) {
          .card {
            background: var(--ddd-theme-default-coalyGray);
            border-color: #3a3a3a;
            box-shadow: 0 2px 12px rgba(0,0,0,.4);
          }
          .header {
            border-color: #3a3a3a;
          }
          .username, .photo-title {
            color: var(--ddd-theme-default-white);
          }
          .img-wrap {
            background: #1a1a1a;
          }
        }
      `,
    ];
  }

  // What happens when you click a button

  connectedCallback() {
    super.connectedCallback();

    this._likes = getLikes();

    const params = new URLSearchParams(window.location.search);
    const idx = parseInt(params.get("activeIndex"), 10);
    this._requestedIndex = (!isNaN(idx) && idx >= 0) ? idx : 0;
    this.activeIndex = this._requestedIndex;

    this._loadPhotos();
    this.addEventListener("play-list-slide-clicked",    this._handleNav);
    this.addEventListener("play-list-index-changed",  this._handleDotClick);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.removeEventListener("play-list-slide-clicked",   this._handleNav);
    this.removeEventListener("play-list-index-changed", this._handleDotClick);
  }

  // Fetches Data

  async _loadPhotos() {
    this.loading = true;
    this._error  = null;
    try {
      const res  = await fetch("/api/photos");
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();

      this.author = data.author || null;
      this.images = data.photos || [];

      this.activeIndex = Math.min(
        this._requestedIndex,
        Math.max(0, this.images.length - 1)
      );
    } catch (e) {
      console.error("Failed to load media:", e);
      this.images = [];
      this._error = "Could not load media. Check your connection and try again.";
    } finally {
      this.loading = false;
    }
  }

  // Navigating the Page

  _handleNav(e) {
    const { direction } = e.detail;
    if (direction === "next" && this.activeIndex < this.images.length - 1) {
      this.activeIndex += 1;
    } else if (direction === "prev" && this.activeIndex > 0) {
      this.activeIndex -= 1;
    }
    this._updateUrlParam();
  }

  _handleDotClick(e) {
    this.activeIndex = e.detail.index;
    this._updateUrlParam();
  }

  _updateUrlParam() {
    const params = new URLSearchParams(window.location.search);
    params.set("activeIndex", String(this.activeIndex));
    const newUrl = `${window.location.pathname}?${params.toString()}`;
    window.history.replaceState({}, "", newUrl);
  }

  // Likes

  _toggleLike() {
    const current = this.images[this.activeIndex];
    if (!current) return;

    const id       = String(current.id);
    const updated  = { ...this._likes, [id]: !this._likes[id] };
    this._likes    = updated;
    saveLikes(updated);
    this.requestUpdate("_likes");
  }

  _isLiked(photo) {
    return !!(photo && this._likes[String(photo.id)]);
  }

  // Shares

  async _share() {
    this._updateUrlParam();
    const url = window.location.href;

    if (navigator.share) {
      try {
        await navigator.share({ title: document.title, url });
      } catch {
        // user cancelled 
      }
      return;
    }

    if (navigator.clipboard) {
      try {
        await navigator.clipboard.writeText(url);
        this._shared = true;
        setTimeout(() => { this._shared = false; }, 2000);
        return;
      } catch {
      }
    }

    try {
      const input = document.createElement("input");
      input.style.cssText = "position:fixed;top:-100px;left:-100px;opacity:0";
      input.value = url;
      document.body.appendChild(input);
      input.select();
      document.execCommand("copy");
      document.body.removeChild(input);
      this._shared = true;
      setTimeout(() => { this._shared = false; }, 2000);
    } catch {
      console.warn("Share: could not copy URL to clipboard.");
    }
  }

  // Rendering

  _renderAvatar() {
    if (!this.author) {
      return html`<div class="avatar-fallback">?</div>`;
    }
    if (this.author.image) {
      return html`<img class="avatar" src="${this.author.image}" alt="${this.author.name}" />`;
    }
    const initials = this.author.name.split(" ").map(w => w[0]).join("").slice(0, 2).toUpperCase();
    return html`<div class="avatar-fallback">${initials}</div>`;
  }

  _renderHeader() {
    const name    = this.author?.name    ?? "User Not Found";
    const channel = this.author?.channel ?? "";
    const since   = this.author?.userSince
      ? new Date(this.author.userSince).getFullYear()
      : null;

    return html`
      <div class="header">
        <div class="header-left">
          ${this._renderAvatar()}
          <div>
            <p class="username">${name}</p>
            ${channel ? html`<p class="channel">@${channel}</p>` : ""}
            ${since   ? html`<p class="user-since">Member since ${since}</p>` : ""}
          </div>
        </div>
      </div>
    `;
  }

  _renderSlides() {
    if (this._error) {
      return html`
        <div class="error-text">
          <span>${this._error}</span>
          <button class="retry-btn" @click="${this._loadPhotos}">Try Again</button>
        </div>
      `;
    }
    if (this.loading) {
      return html`<span class="loading-text">Loading Media…</span>`;
    }
    if (!this.images.length) {
      return html`<span class="loading-text">No media found.</span>`;
    }
    return this.images.map(
      (photo, i) => html`
        <div class="slide ${i === this.activeIndex ? "active" : ""}">
          <img
            src="${photo.thumbnail}"
            alt="${photo.title}"
            loading="lazy"
          />
        </div>
      `
    );
  }

  render() {
    const current = this.images[this.activeIndex] ?? null;
    const liked   = this._isLiked(current);

    return html`
      <div class="card">

        ${this._renderHeader()}

        <div class="img-container">
          <project-1-slide
            direction="prev"
            ?disabled="${this.activeIndex === 0 || this.loading || !!this._error}"
          ></project-1-slide>

          <div class="img-wrap">
            ${this._renderSlides()}
          </div>

          <project-1-slide
            direction="next"
            ?disabled="${this.activeIndex === this.images.length - 1 || this.loading || !!this._error}"
          ></project-1-slide>
        </div>

        <project-1-dots
          count="${this._error ? 0 : this.images.length}"
          index="${this.activeIndex}"
        ></project-1-dots>

        <p class="meta-bar">${current?.dateTaken
          ? new Date(current.dateTaken).toLocaleDateString("en-US", { year:"numeric", month:"long", day:"numeric" })
          : ""}</p>

        <div class="actions">
          <button
            class="action-btn"
            @click="${this._toggleLike}"
            ?disabled="${!current}"
            title="${liked ? "Unlike" : "Like"}"
            aria-label="${liked ? "Unlike this media" : "Like this media"}"
            aria-pressed="${liked}"
          >${liked ? "♥" : "♡"}</button>

            <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
                 stroke="currentColor" stroke-width="2" stroke-linecap="round"
                 stroke-linejoin="round" aria-hidden="true">
              <circle cx="18" cy="5" r="3"/>
              <circle cx="6"  cy="12" r="3"/>
              <circle cx="18" cy="19" r="3"/>
              <line x1="8.59"  y1="13.51" x2="15.42" y2="17.49"/>
              <line x1="15.41" y1="6.51"  x2="8.59"  y2="10.49"/>
            </svg>
            ${this._shared ? html`<span class="share-label">Copied!</span>` : ""}
          </button>
        </div>

        <div class="caption-area">
          <p class="photo-title">${current?.title ?? ""}</p>
          <p class="photo-desc">${current?.description ?? ""}</p>
        </div>

      </div>
    `;
  }

  static get haxProperties() {
    return new URL(`./lib/${this.tag}.haxProperties.json`, import.meta.url).href;
  }
}

globalThis.customElements.define(Project1.tag, Project1);