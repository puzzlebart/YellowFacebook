import * as React from 'react';
import styles from '../YellowProfile.module.scss';
import IImagesProps from './IImagesProps';

export default class Images extends React.Component<IImagesProps, {}> {
  constructor(props) {
    super(props);
  }

  public render() {
    let images = this.props.properties.images.map((item => {return <img className={styles.imagePreview} src={item}></img>}));
    return (
      <div className={styles.leftComponent}>
        <h3>Images</h3>
        <div>{images}</div>
      </div>
    );
  }
}
