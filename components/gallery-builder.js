// helper class to create the nodes in the gallery

import {RowBuilder} from './row-builder.js';

export class GalleryBuilder {

  constructor(galleryConfig, galleryData) {
    this.galleryConfig = galleryConfig;
    this.galleryData = galleryData;
    this.rowBuilder = new RowBuilder(galleryConfig, galleryData);
    this.billboardMap = this.createBillboardMap(galleryData.billboards);
  }

  createGallery() {
    const gallery = document.createElement('div');
    gallery.classList.add(this.galleryConfig.classes.gallery);

    for (let row = 0; row < this.galleryData.rows.length; row++) {
      let rowData = this.galleryData.rows[row];
      // check if this is a billboard row
      if (this.billboardMap.has(row)) {
        gallery.appendChild(this.rowBuilder.createBillboardRow(this.billboardMap.get(row), rowData[0]));
      } else {
        // otherwise this is a video row
        gallery.appendChild(this.rowBuilder.createVideoRow(rowData));
      }
    }
    return gallery;
  }

  // create a map of billboard data for quick lookups
  createBillboardMap(billboardData) {
    const billboardMap = new Map();

    billboardData.forEach((billboard) => {
      billboardMap.set(billboard.row, billboard);
    });
    return billboardMap;
  }

}