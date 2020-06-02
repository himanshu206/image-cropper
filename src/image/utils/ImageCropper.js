const ImageCropper = ((d) => {
  const _canvas = d.createElement("canvas");
  const _context = _canvas.getContext("2d");

  const getCroppedImages = (originalImage, cropResolutions) => {
    return cropResolutions.map((resolution) => {
      const {
        type,
        dimensions,
        dimensions: { width, height },
      } = resolution;

      return {
        type,
        dimensions,
        src: _cropImageFromOriginTo(originalImage, width, height),
      };
    });
  };

  const _cropImageFromOriginTo = (originalImage, x, y) => {
    _clearCanvas();

    _canvas.width = x;
    _canvas.height = y;

    _context.drawImage(originalImage, 0, 0, x, y, 0, 0, x, y);

    return _canvas.toDataURL("image/png");
  };

  const _clearCanvas = () => {
    _context.clearRect(0, 0, 0, 0);
  };

  return {
    getCroppedImages,
  };
})(window.document);

export default ImageCropper;
