class ImageUtils {
  static VALID_WIDTH = 1024;
  static VALID_HEIGHT = 1024;

  static getImageFromFile = (file) => {
    const image = new Image();
    image.src = window.URL.createObjectURL(file);

    return image;
  };

  static validateImageDimensions = (image) => {
    return (
      image.naturalWidth === ImageUtils.VALID_WIDTH &&
      image.naturalHeight === ImageUtils.VALID_HEIGHT
    );
  };

  static validateImage = (file) => {
    const image = this.getImageFromFile(file);

    return new Promise((resolve, reject) => {
      image.onload = () => {
        const isValid = this.validateImageDimensions(image);
        if (isValid) {
          resolve({
            image: {
              name: file.name,
              obj: isValid ? image : null,
            },
          });
        } else {
          reject(
            `Chosen image has invalid dimensions. ( Dimensions must be - ${ImageUtils.VALID_HEIGHT} x ${ImageUtils.VALID_WIDTH} )`
          );
        }
      };

      image.error = () => {
        reject("Invalid Image");
      };
    });
  };
}

export default ImageUtils;
