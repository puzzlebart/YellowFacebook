import * as React from 'react';
import styles from '../YellowProfile.module.scss';
import IImagesProps from './IImagesProps';

export default class Images extends React.Component<IImagesProps, {}> {
  constructor(props) {
    super(props);
  }

  public render() {
    let images = this.props.properties.images.split(0,9);
    console.log(this.props.properties.images)
    return (
      <div className={styles.leftComponent}>
        <h3>Images</h3>
        <img className={styles.imagePreview} src={this.props.properties.images[0]}></img>
        <img className={styles.imagePreview} src={this.props.properties.images[1]}></img>
        <img className={styles.imagePreview} src={this.props.properties.images[2]}></img>
      </div>
    );
  }
}
