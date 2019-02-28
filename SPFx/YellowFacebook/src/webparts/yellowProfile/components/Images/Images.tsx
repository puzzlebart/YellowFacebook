import * as React from 'react';
import styles from '../YellowProfile.module.scss';
import IImagesProps from './IImagesProps';

export default class Images extends React.Component<IImagesProps, {}> {
  constructor(props) {
    super(props);
  }

  public render() {
    return (
      <div className={styles.leftComponent}>
        <h3>Images</h3>
        {this.renderImages()}
      </div>
    );
  }

  private renderImages() {
   return this.props.properties.images.map(image => {
    return <img className={styles.imagePreview} src={image}></img>;
   });
  }

}
