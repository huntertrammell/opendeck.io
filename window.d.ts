export {};

declare global {
  interface Window {
    bus: any;
  }
}

window.bus = window.bus || {};
