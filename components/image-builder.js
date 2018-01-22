// helper class for creating images
export class ImageBuilder {

  constructor(galleryConfig) {
    this.galleryConfig = galleryConfig
  }

  // create a metadata logo image
  createLogoImage(imageData) {
    const logoImage = ImageBuilder.createImage(imageData.logo);
    logoImage.classList.add(this.galleryConfig.classes.billboardMetadataLogo);
    return logoImage;
  }

  // create an image for boxart
  createBoxArtImage(imageData) {
    const image = ImageBuilder.createImage(imageData.boxart);
    image.classList.add(this.galleryConfig.classes.boxshot);
    image.setAttribute('alt', imageData.title);
    image.setAttribute('title', imageData.title);
    return image;
  }

  // create a generic image
  static createImage(source) {
    const image = document.createElement('img');
    image.setAttribute('src', source);
    return image;
  }

}