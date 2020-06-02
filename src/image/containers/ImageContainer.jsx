import React from "react";
import { cropResolutions } from "../utils/CropResolutions";
import { uploadImages } from "../../firebase/upload";

import ImageUploader from "../components/upload/ImageUploader";
import ImageDownloadView from "../components/download/ImageDownloadView";

const VIEWS = {
  upload: "UPLOAD",
  download: "DOWNLOAD",
};

class ImageContainer extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      isUploadInProgress: false,
      downloadedImageUrls: [],
      view: VIEWS.upload,
    };
  }

  handleUpload = (croppedImages) => {
    this.setState({ isUploadInProgress: true });
    uploadImages(croppedImages)
      .then((results) => {
        this.setState(
          { downloadedImageUrls: results },
          this.switchToDownloadView
        );
      })
      .finally(() => this.setState({ isUploadInProgress: false }));
  };

  handleOnBack = () => {
    this.switchToUploadView();
    this.setState({ downloadedImageUrls: [] });
  };

  switchToDownloadView = () => {
    this.setState({ view: VIEWS.donwload });
  };

  switchToUploadView = () => {
    this.setState({ view: VIEWS.upload });
  };

  renderUploadView = () => {
    const { isUploadInProgress } = this.state;
    return (
      <ImageUploader
        isUploadInProgress={isUploadInProgress}
        uploadResolutions={cropResolutions}
        onUpload={this.handleUpload}
      ></ImageUploader>
    );
  };

  renderDownloadView = () => {
    const { downloadedImageUrls } = this.state;
    return (
      <ImageDownloadView
        imageUrls={downloadedImageUrls}
        onBack={this.handleOnBack}
      ></ImageDownloadView>
    );
  };

  render() {
    const { view } = this.state;

    return view === VIEWS.upload
      ? this.renderUploadView()
      : this.renderDownloadView();
  }
}

export default ImageContainer;
