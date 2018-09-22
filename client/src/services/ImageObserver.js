const CONFIG = {
  rootMargin: '0px 300px',
  threshold: 0.01
}

export default class ImageObserver {
  constructor() {
    this._intersectionObserver = new IntersectionObserver(this.onIntersect.bind(this), CONFIG);
  }

  onIntersect(entries) {
    entries.forEach(entry => {
      if (entry.intersectionRatio > 0) {
        this._intersectionObserver.unobserve(entry.target);
        entry.target.setAttribute('src', entry.target.getAttribute('data-src'));
      }
    });
  }

  addImages(images) {
    images.forEach(image => this._intersectionObserver.observe(image));
  }
}