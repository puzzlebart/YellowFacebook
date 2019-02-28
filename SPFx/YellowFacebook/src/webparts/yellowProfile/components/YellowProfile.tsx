import * as React from 'react';
import styles from './YellowProfile.module.scss';
import { IYellowProfileProps } from './IYellowProfileProps';
import Friends from './Friends/Friends';
import Images from './Images/Images';
import Presentation from './Presentation/Presentation';
import { sp } from '@pnp/sp';

export default class YellowProfile extends React.Component<IYellowProfileProps, {}> {
  constructor(props) {
    super(props);
  }

  public async componentDidMount() {
    await this.fetchData();
  }

  public render(): React.ReactElement<IYellowProfileProps> {
    return (
      <div className={styles.yellowProfile}>
        <div className={styles.leftComponentsContainer}>
          <Presentation />
          <Images />
          <Friends />
        </div>
        <div className={styles.feed}>
        {this.renderItems()}
        </div>
      </div>
    );
  }

  private renderItems() {
    return <div></div>;
  }

  private async fetchData() {

  }

}
