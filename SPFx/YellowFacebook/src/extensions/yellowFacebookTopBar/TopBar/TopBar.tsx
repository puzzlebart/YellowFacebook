import * as React from 'react';
import styles from './TopBar.module.scss';
import { ITopBarProps } from './ITopBarProps';

export default class TopBar extends React.Component<ITopBarProps, {}> {
  public render() {
    return (
      <div className={styles.topBar}>
      </div>
    );
  }
}
