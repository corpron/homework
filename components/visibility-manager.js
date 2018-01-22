// VisibilityManager will call the passed in callback method the first time
// that the passed in element appears in the viewport

export class VisibilityManager {

  constructor(element, callback) {
    this.element = element;
    this.callback = callback;
    this.eventHandlerReference = this.eventHandler.bind(this);
  }

  // add the scroll event listener to the window
  registerCallback() {
    window.addEventListener('scroll', this.eventHandlerReference);
  }

  // if scrolling, check if the element is in the viewport. if it is, trigger callback
  // then remove the event listener from the window
  eventHandler() {
    if (this.isElementInViewport(this.element)) {
      this.callback();
      window.removeEventListener('scroll', this.eventHandlerReference);
    }
  }

  // returns true if the element is fully in the viewport
  isElementInViewport(element) {
    let elementCoordinates = element.getBoundingClientRect();
    return (
      elementCoordinates.top >= 0 &&
      elementCoordinates.left >= 0 &&
      elementCoordinates.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
      elementCoordinates.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
  }
}