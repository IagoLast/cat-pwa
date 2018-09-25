const CONFIG = {
  rootMargin: '0px 300px',
  threshold: 0.01
}

/**
 * Use the [IntersectionObserver API](https://developer.mozilla.org/es/docs/Web/API/Intersection_Observer_API)
 * to lazy load images.
 */
export default class ImageObserver {
  constructor() {
    this._intersectionObserver = new IntersectionObserver(this.onIntersect.bind(this), CONFIG);
  }

  /**
   * When an image enters the viewport, replace the "data-src" attribute by "src" making the browser
   * to fetch the image only when needed.
   *
   * Add the .hydrated class to get a fadeIn CSS effect improving the UX
   */
  onIntersect(entries) {
    entries.forEach(entry => {
      if (entry.intersectionRatio > 0) {
        this._intersectionObserver.unobserve(entry.target);
        entry.target.setAttribute('src', entry.target.getAttribute('data-src'));
        entry.target.parentNode.classList.add('hydrated');
      }
    });
  }

  _onEntry(entry) {

  }

  addImages(images) {
    images.forEach(image => this._intersectionObserver.observe(image));
  }
}