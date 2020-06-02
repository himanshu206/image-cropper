import React from "react";
import { downloadImages } from "../../../firebase/download";

import Image from "../../../common/Image";
import Loader from "../../../common/Loader";

import "./ImageDownloadView.css";

class ImageDownloadView extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      imagesData: new Array(props.imageUrls.length).fill(""),
    };
  }

  componentDidMount() {
    const { imageUrls } = this.props;
    downloadImages(imageUrls).then((data) =>
      this.setState({ imagesData: data })
    );
  }

  render() {
    const { onBack } = this.props;
    const { imagesData } = this.state;
    return (
      <div className="image-view-container">
        <div className="image-view-container__content">
          {imagesData.map((data) => {
            return (
              <div className="content__wrapper">
                {data ? <Image src={data}></Image> : <Loader></Loader>}
              </div>
            );
          })}
        </div>
        <span className="image-view-container__back-btn" onClick={onBack}>
          Go Back
        </span>
      </div>
    );
  }
}

export default ImageDownloadView;
