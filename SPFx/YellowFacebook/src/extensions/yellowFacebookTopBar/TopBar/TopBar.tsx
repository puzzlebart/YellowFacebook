import * as React from 'react';
import styles from './TopBar.module.scss';
import { ITopBarProps } from './ITopBarProps';
import { SearchBox } from 'office-ui-fabric-react/lib/SearchBox';

export default class TopBar extends React.Component<ITopBarProps, {}> {

  public render() {
    return (
      <div className={styles.topBar}>
        <SearchBox className={styles.searchBox} placeholder='Search' />
        <div
          className={styles.userProfileLink}
          onClick={() => location.replace('/sites/HomerSimpson')}>
          {this.props.userDisplayName}
        </div>
      </div>
    );
  }
}
