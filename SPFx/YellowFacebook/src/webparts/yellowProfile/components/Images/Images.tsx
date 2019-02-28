import * as React from 'react';
import styles from '../YellowProfile.module.scss';
import IImagesProps from './IImagesProps';

export default class Images extends React.Component<IImagesProps, {}> {
  constructor(props) {
    super(props);
  }

  public render() {
<<<<<<< HEAD
    let images = this.props.properties.images.map((item => {return <img className={styles.imagePreview} src={item}></img>}));
=======
    console.log(this.props.properties.images);
>>>>>>> fc208422c3384b1f78d973ede60858151089c6c6
    return (
      <div className={styles.leftComponent}>
        <h3>Images</h3>
        <div>{images}</div>
      </div>
    );
  }
}
