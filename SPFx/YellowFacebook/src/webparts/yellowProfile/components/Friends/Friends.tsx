import * as React from 'react';
import styles from '../YellowProfile.module.scss';
import IFriendsProps from './IFriendsProps';
import { Icon } from 'office-ui-fabric-react/lib/Icon';

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
      let numFriends = Math.floor(Math.random() * 500) + 17;
      return (
        <div className={styles.leftComponent}>
          <h3><Icon iconName="People" className={styles.headerIcon}/>Friends ({numFriends})</h3>
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
          let ref = "?name="+friend.Name;
        return(
          <a href={ref} ><div className={styles.friend} title={friend.Name}>
          <img className={styles.imagePreview} src={friend.Picture}></img>
          <a>{friend.Name}</a>
          </div></a>
        );
      })
    );
  }


  private async fetchData() {
    let friends=JSON.parse(await fetch("https://puzzlebart-saas.herokuapp.com/quotes?amount=9",{headers:{apikey:"EATMYSHORTS"}}).then(d=>d.text().then(r=>r)));
    this.setState({properties:friends, isLoading:false});
  }
}
