import * as React from 'react';
import styles from './Images.module.scss';
import IImagesProps from './IImagesProps';
import { Icon } from 'office-ui-fabric-react/lib/Icon';
import ImageModal from './ImageModal/ImageModal';

export default class Images extends React.Component<IImagesProps, { displayImageModal: boolean, imageToShow?: string }> {
  constructor(props) {
    super(props);

    this.state = {
      displayImageModal: false
    };
  }

  public componentDidUpdate() {
    console.log(this.state.displayImageModal);
  }

  public render() {
    return (
      <div className={styles.leftComponent}>
        <h3><Icon iconName="Photo2" className={styles.headerIcon} />Images</h3>
        {this.renderImages()}
        {(this.state.displayImageModal) && <ImageModal closeModal={this._closeModal} image={this.state.imageToShow} />}
      </div>
    );
  }

  private renderImages() {
    return this.props.properties.images.slice(0, 9).map(image => {
      return (
        <div className={styles.imageContainer} onClick={() => this.setState({ displayImageModal: true, imageToShow: image })}>
          <img className={styles.imagePreview} src={image} />
        </div>
      );
    });
  }

  private _closeModal = () => {
    this.setState({ displayImageModal: false });
  }

}
