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
        <h3>Friends</h3>
        <div className={styles.friends}>
          {/* {this.renderFriends()} */}
        </div>
      </div>
    );
  }

  //Does not work yet
  public renderFriends() {
    console.log("ÆÆÆÆÆÆÆ")
    return fetch("https://puzzlebart-saas.herokuapp.com/quotes?amount=9", { headers: { apikey: "EATMYSHORTS" } }).then(d => d.json().then(friends => {
      console.log(friends);
      let mappedFriends = friends.map(quote => {
        return {
          author: quote.Name,
          picture: quote.Picture
        };
      });
      console.log(mappedFriends);
      return mappedFriends.map(friend => {
        let ref = "?name=" + friend.author;
        console.log(ref);
        return (<a href={ref}><div className={styles.friend}>
          <img className={styles.imagePreview} src={friend.picture}></img>
          <a>{friend.author}</a>
        </div></a>);
      })
    }));
  }
}
