import * as React from 'react';
import styles from './ProfileHeader.module.scss';
import { IProfileHeaderProps } from './IProfileHeaderProps';

export default class ProfileHeader extends React.Component<IProfileHeaderProps, {}> {
  constructor(props) {
    super(props);
  }

  public render() {
    return (
      <div className={styles.container}>
        <div className={styles.profilePic}>
          <img src={this.props.profilePic} />
        </div>
        <div className={styles.userTitle}>
          <h3>{this.props.userName}</h3>
        </div>
      </div>
    );
  }
}
