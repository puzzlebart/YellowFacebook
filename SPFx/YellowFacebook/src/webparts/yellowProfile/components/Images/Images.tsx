import * as React from 'react';
import styles from '../YellowProfile.module.scss';
import IImagesProps from './IImagesProps';
import { Icon } from 'office-ui-fabric-react/lib/Icon';

export default class Images extends React.Component<IImagesProps, {}> {
  constructor(props) {
    super(props);
  }

  public render() {
    return (
      <div className={styles.leftComponent}>
        <h3><Icon iconName="Photo2" className={styles.headerIcon}/>Images</h3>
        {this.renderImages()}
      </div>
    );
  }

  private renderImages() {
   return this.props.properties.images.slice(0,9).map(image => {
    return <img className={styles.imagePreview} src={image}></img>;
   });
  }

}
