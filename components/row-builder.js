import {ImageBuilder} from './image-builder.js';
import {MetadataBuilder} from './metadata-builder.js';
import {VisibilityManager} from './visibility-manager.js';

// helper class for building all the rows in the gallery
export class RowBuilder {

  constructor(galleryConfig, galleryData) {
    this.galleryConfig = galleryConfig;
    this.galleryData = galleryData;
    this.boxArtCache = new Map();
    this.videoDataMap = this.createVideoDataMap(galleryData.videos);
    this.imageBuilder = new ImageBuilder(galleryConfig);
    this.metadataBuilder = new MetadataBuilder(galleryConfig);
  }

  // create a row of boxart images
  createVideoRow(rowData) {
    const videoRow = document.createElement('div');
    videoRow.classList.add(this.galleryConfig.classes.videoRow);
    for (let col = 0; col < rowData.length; col++) {
      const id = rowData[col];
      let boxArtImage = null;
      // check if the boxart for this video has already been created
      if (this.boxArtCache.has(id)) {
        boxArtImage = this.boxArtCache.get(id).cloneNode(true);
      } else {
        // create the boxart image by looking up the video in the videoDataMap
        const video = this.videoDataMap.get(id);
        boxArtImage = this.imageBuilder.createBoxArtImage(video);
        this.boxArtCache.set(id, boxArtImage);
      }
      videoRow.appendChild(boxArtImage);
    }
    return videoRow;
  }

  // create a billboard row
  createBillboardRow(billboardData, videoId) {
    const videoData = this.videoDataMap.get(videoId);
    const billboardRow = document.createElement('div');
    const billboard = document.createElement('div');
    const billboardMetadata = this.metadataBuilder.createBillboardMetadata(billboardData, videoData);

    billboard.classList.add(this.galleryConfig.classes.billboardBackground);
    billboardRow.classList.add(this.galleryConfig.classes.billboardRow);

    if (billboardData.type === this.galleryConfig.billboardTypes.inline) {
      billboardRow.classList.add(this.galleryConfig.classes.billboardRowInline);
      billboard.style.cssText = 'background-image: url(' + videoData.backgroundShort + ')';

      // since this is an inline billboard, add the VisibilityManager to handle triggering the animation
      billboardMetadata.classList.add('hidden');
      const eventManager = new VisibilityManager(billboardMetadata, function () {
        billboardMetadata.classList.remove('hidden');
      });
      eventManager.registerCallback();
    } else {
      // this is a header billboard so add the synopsis
      billboardMetadata.appendChild(this.metadataBuilder.createBillboardSynopsis(videoData.synopsis));
      billboard.style.cssText = 'background-image: url(' + videoData.background + ')';
    }

    billboardRow.appendChild(billboard);
    billboardRow.appendChild(billboardMetadata);

    return billboardRow;
  }

  // create a map of all the video data so that we do not have to
  // do an expensive search every time we need video data
  createVideoDataMap(videoData) {
    const videoDataMap = new Map();
    videoData.forEach((video) => {
      videoDataMap.set(video.id, video);
    });
    return videoDataMap;
  }

}