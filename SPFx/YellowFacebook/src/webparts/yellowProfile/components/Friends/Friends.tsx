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
      <div className={styles.friends}>
        {this.renderFriends()}
      </div>

      </div>
    );
  }

  private renderFriends() {
    return this.props.friends.map(friend => {
      return  <a href="?name=Lisa Simpson"><div className={styles.friend}>
        <img className={styles.imagePreview} src={"https://vignette.wikia.nocookie.net/simpsons/images/5/57/Lisa_Simpson2.png/revision/latest?cb=20180319000458"}></img>
        <a >Lisa Simpson</a>
        </div></a>;
    });
  }


}
