// tracker/idleTracker.js
const EventEmitter = require("events");

class IdleTracker extends EventEmitter {
  constructor({ idleThreshold = 60_000, checkInterval = 1000 } = {}) {
    super();
    this.idleThreshold = idleThreshold; // milliseconds
    this.checkInterval = checkInterval;
    this.lastActivity = Date.now();
    this.isIdle = false;
  }

  start() {
    if (typeof window !== "undefined") {
      // Browser / Electron renderer events
      window.addEventListener("mousemove", () => this._resetTimer());
      window.addEventListener("keydown", () => this._resetTimer());
      window.addEventListener("mousedown", () => this._resetTimer());
    } else if (process.stdin.isTTY) {
      // Node console events (fallback)
      process.stdin.on("data", () => this._resetTimer());
    }

    setInterval(() => {
      const now = Date.now();
      const idleTime = now - this.lastActivity;

      if (!this.isIdle && idleTime > this.idleThreshold) {
        this.isIdle = true;
        this.emit("idle", { since: new Date(this.lastActivity), idleFor: idleTime });
      } else if (this.isIdle && idleTime <= this.idleThreshold) {
        this.isIdle = false;
        this.emit("active", { resumedAt: new Date(now) });
      }
    }, this.checkInterval);
  }

  _resetTimer() {
    this.lastActivity = Date.now();
  }

  getIdleTime() {
    return Date.now() - this.lastActivity;
  }
}

module.exports = IdleTracker;
