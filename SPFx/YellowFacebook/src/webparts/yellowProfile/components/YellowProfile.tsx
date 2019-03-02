import * as React from 'react';
import styles from './YellowProfile.module.scss';
import { IYellowProfileProps } from './IYellowProfileProps';
import Friends from './Friends/Friends';
import Images from './Images/Images';
import Presentation from './Presentation/Presentation';
import {
  DocumentCard,
  DocumentCardType,
  DocumentCardActivity,
  DocumentCardTitle
} from 'office-ui-fabric-react/lib/DocumentCard';
import { sp } from '@pnp/sp';
import { HttpClient } from '@microsoft/sp-http';

export default class YellowProfile extends React.Component<IYellowProfileProps, { properties?: any, isLoading: boolean }> {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true
    };
  }

  public async componentDidMount() {
    await this.fetchData();
  }

  public render(): React.ReactElement<IYellowProfileProps> {
    if (this.state.isLoading) {
      return null;
    } else return (
      <div className={styles.yellowProfile}>

        <div className={styles.leftComponentsContainer}>
          <Presentation properties={this.state.properties} />
          <Images properties={this.state.properties} />
          <Friends friends={this.state.properties} />
        </div>
        <div className={styles.feed}>
          {this.renderItems(this.state.properties.quotes)}
        </div>
      </div>
    );
  }

  private renderItems(quotes: string[]) {
    let dates: Date[] = [];
    for (let i = 0; i < quotes.length; i++) {
      let newDate = this.randomDate(new Date(2019, 1, 2), new Date(2019, 2, 1));
      dates.push(newDate);
    }

    dates.sort((a, b) => b.getDate() < a.getDate() ? -1 : 1);

    return quotes.map((q, i) => {

      return (
        <DocumentCard type={DocumentCardType.compact} className={styles.statusUpdateHeader}>
          <DocumentCardActivity
            activity={dates[i].toDateString()}
            people={[{ name: this.state.properties.name, profileImageSrc: this.state.properties.profilePic }]} />
          <DocumentCardTitle title={q} />
        </DocumentCard>
      );
    });
  }

  private async fetchData() {
    let name = this.getUrlParamByName('name') ? this.getUrlParamByName('name') : this.props.userDisplayName;
    let res = await this.props.httpClient.get(
      `https://puzzlebart-saas.herokuapp.com/characters?Name=${name}`,
      HttpClient.configurations.v1, { headers: { apikey: 'EATMYSHORTS' } });
    let chars = await res.json();
    let images = [];
    for (let i = 0; i < 10; i++) {
      if (chars[0].Photos && chars[0].Photos[i] != null) {
        images.push(chars[0].Photos[i]);
      }
    }
    let data = await sp.web.lists.getByTitle('Properties').items.getAll();
    let properties = {
      name: chars[0].Name,
      gender: chars[0].Gender,
      occupation: chars[0].Occupation,
      quotes: chars[0].Quotes,
      profilePic: chars[0].Picture,
      friends: JSON.parse(data[0].Friends),
      id: chars[0].Id,
      images: images
    };
    this.setState({ properties, isLoading: false });
  }

  private randomDate(start, end) {
    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
  }

  private getUrlParamByName(name: string): string {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    const regex = new RegExp("[\\?&]" + name + "=([^&#]*)");
    const results = regex.exec(location.search);
    return results == null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
  }

}
