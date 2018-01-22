import {galleryConfig} from './gallery-config.js';
import {GalleryBuilder} from './components/gallery-builder.js';

export function render(data) {
  const galleryBuilder = new GalleryBuilder(galleryConfig, data);
  const gallery = galleryBuilder.createGallery();
  document.body.appendChild(gallery);
}