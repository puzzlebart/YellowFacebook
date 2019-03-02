import * as React from 'react';
import styles from '../YellowProfile.module.scss';
import IFriendsProps from './IFriendsProps';

export default class Friends extends React.Component<IFriendsProps, {properties?, isLoading:boolean}> {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true
    };
  }

  public async componentDidMount() {
    await this.fetchData();
  }
  public render() {
    if (this.state.isLoading) {
      return null;
    } else{
      return (
        <div className={styles.leftComponent}>
          <h3>Friends</h3>
          <div className={styles.friends}>
            {this.renderFriends(this.state.properties)}
          </div>
        </div>
      );
    }
  }

  private renderFriends(friends){
    return(
      friends.map(friend=>{
        return(
          <a href={friend.Name} ><div className={styles.friend} title={friend.Name}>
          <img className={styles.imagePreview} src={friend.Picture}></img>
          <a>{friend.Name}</a>
          </div></a>
        );
      })
    );
  }

//   <a href={friend.Name}><div className={styles.friend}>
//   <img className={styles.imagePreview} src={friend.Picture}></img>
//   <a>{friend.Name}</a>
// </div></a>

  //Does not work yet
  private async fetchData() {
    let friends=JSON.parse(await fetch("https://puzzlebart-saas.herokuapp.com/quotes?amount=9",{headers:{apikey:"EATMYSHORTS"}}).then(d=>d.text().then(r=>r)));
    //let friends = fetch("https://puzzlebart-saas.herokuapp.com/quotes?amount=9", { headers: { apikey: "EATMYSHORTS" } });
    console.log(friends);
    this.setState({properties:friends, isLoading:false});

    // console.log("ÆÆÆÆÆÆÆ")
    // return fetch("https://puzzlebart-saas.herokuapp.com/quotes?amount=9", { headers: { apikey: "EATMYSHORTS" } }).then(d => d.json().then(friends => {
    //   console.log(friends);
    //   let mappedFriends = friends.map(quote => {
    //     return {
    //       author: quote.Name,
    //       picture: quote.Picture
    //     };
    //   });
    //   console.log(mappedFriends);
    //   return mappedFriends.map(friend => {
    //     let ref = "?name=" + friend.author;
    //     console.log(ref);
    //     return (<a href={ref}><div className={styles.friend}>
    //       <img className={styles.imagePreview} src={friend.picture}></img>
    //       <a>{friend.author}</a>
    //     </div></a>);
    //   })
    // }));
  }
}
