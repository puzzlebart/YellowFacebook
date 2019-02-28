import * as React from 'react';
import styles from '../YellowProfile.module.scss';
import IFriendsProps from './IFriendsProps';

export default class Friends extends React.Component<IFriendsProps, {}> {
  constructor(props) {
    super(props);
  }

  public render() {
    return (
      <div className={styles.leftComponent}>
        <span>Friends</span>
      </div>
    );
  }
}
