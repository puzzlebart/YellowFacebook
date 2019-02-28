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
      <h3>Friends</h3>
      {this.renderFriends()}

      </div>
    );
  }

  private renderFriends() {
    return this.props.friends.map(friend => {
      return  <div
      className={styles.friend}
      style={ {
        backgroundImage: "url('https://vignette.wikia.nocookie.net/simpsons/images/5/57/Lisa_Simpson2.png/revision/latest?cb=20180319000458')",
        backgroundRepeat: "no-repeat",
        backgroundSize: "50px"
        } }>
        <a href="">Lisa Simpson</a>
        </div>;
    });
  }


}
