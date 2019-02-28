import * as React from 'react';
import styles from './YellowProfile.module.scss';
import { IYellowProfileProps } from './IYellowProfileProps';

export default class YellowProfile extends React.Component<IYellowProfileProps, {}> {
  public render(): React.ReactElement<IYellowProfileProps> {
    return (
      <div className={styles.yellowProfile}>
        <div className={styles.leftComponentsContainer}>
          <div className={styles.leftComponent}>
            <span>Bio</span>
          </div>
          <div className={styles.leftComponent}>
            <span>Images</span>
          </div>
          <div className={styles.leftComponent}>
            <span>Friends</span>
          </div>
        </div>
        <div className={styles.feed}>

        </div>
      </div>
    );
  }
}
