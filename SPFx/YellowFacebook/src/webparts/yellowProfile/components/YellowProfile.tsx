import * as React from 'react';
import styles from './YellowProfile.module.scss';
import { IYellowProfileProps } from './IYellowProfileProps';
import Friends from './Friends/Friends';
import Images from './Images/Images';
import Presentation from './Presentation/Presentation';
import { sp } from '@pnp/sp';

export default class YellowProfile extends React.Component<IYellowProfileProps, { properties?: any, isLoading: boolean }> {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true
    };
  }

  public async componentDidMount() {
    await this.fetchData();
    console.log(this.state.properties);
  }

  public render(): React.ReactElement<IYellowProfileProps> {
    if (this.state.isLoading) {
      return null;
    } else return (
      <div className={styles.yellowProfile}>
        <div className={styles.leftComponentsContainer}>
          <Presentation properties={this.state.properties}/>
          <Images />
          <Friends />
        </div>
        <div className={styles.feed}>
          {this.renderItems(this.state.properties.quotes)}
        </div>
      </div>
    );
  }

  private renderItems(quoteString: string) {
    let quotes: string[] = quoteString.split(';');

    return quotes.map(q => {
      return <div><span>{q}</span></div>;
    });
  }

  private async fetchData() {
    let data = await sp.web.lists.getByTitle('Properties').items.getAll();

    let properties = {
      name: data[0].Title,
      gender: data[0].Gender,
      occupation: data[0].Occupation,
      quotes: data[0].Quotes,
      profilePic: data[0].ProfilePicture
    };
    this.setState({ properties, isLoading: false });
  }

}
