import * as React from 'react';
import styles from '../YellowProfile.module.scss';
import IFriendsProps from './IFriendsProps';

export default class Friends extends React.Component<IFriendsProps, {}> {
  constructor(props) {
    super(props);
  }

  public render() {
    console.log(this.props.friends);
    return (
      <div className={styles.leftComponent}>
      <span>Friends</span>
      {this.renderFriends()}
      </div>
    );
  }

  private renderFriends() {
    return this.props.friends.map(friend => {
      return <span>{friend}</span>;
    });
  }

}
