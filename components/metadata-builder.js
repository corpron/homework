import {ImageBuilder} from './image-builder.js';

// builds the metadata for a billboard
export class MetadataBuilder {

  constructor(galleryConfig) {
    this.galleryConfig = galleryConfig;
    this.imageBuilder = new ImageBuilder(galleryConfig);
  }

  // create a metadata list or play button
  createMetadataButton(buttonData) {
    const button = document.createElement('button');
    const label = document.createTextNode(buttonData.text);
    button.appendChild(label);
    button.classList.add(this.galleryConfig.classes.billboardMetadataButton);
    if (buttonData.type === this.galleryConfig.buttonTypes.play) {
      button.classList.add(this.galleryConfig.classes.billboardMetadataPlayButton);
    }
    return button;
  }

  createBillboardMetadata(billboardData, videoData) {
    const billboardMetadata = document.createElement('div');
    const logoImage = this.imageBuilder.createLogoImage(videoData);

    billboardMetadata.classList.add(this.galleryConfig.classes.billboardMetadata);
    billboardMetadata.appendChild(logoImage);

    billboardData.buttons.forEach((buttonData) => {
        billboardMetadata.appendChild(this.createMetadataButton(buttonData));
      }
    );
    return billboardMetadata;
  }

  createBillboardSynopsis(synopsis) {
    const billboardSynopsis = document.createElement('div');
    const synopsisText = document.createTextNode(synopsis);

    billboardSynopsis.classList.add(this.galleryConfig.classes.billboardMetadataSynopsis);
    billboardSynopsis.appendChild(synopsisText);

    return billboardSynopsis;
  }

}