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
        <span>Images</span>
      </div>
    );
  }
}
