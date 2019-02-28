import * as React from 'react';
import styles from './YellowProfile.module.scss';
import { IYellowProfileProps } from './IYellowProfileProps';
import Friends from './Friends/Friends';
import Images from './Images/Images';

export default class YellowProfile extends React.Component<IYellowProfileProps, {}> {
  public render(): React.ReactElement<IYellowProfileProps> {
    return (
      <div className={styles.yellowProfile}>
        <div className={styles.leftComponentsContainer}>
          <div className={styles.leftComponent}>
            <span>Bio</span>
          </div>
          <Images />
          <Friends />
        </div>
        <div className={styles.feed}>

        </div>
      </div>
    );
  }
}
