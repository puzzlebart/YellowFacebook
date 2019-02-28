import * as React from 'react';
import styles from '../YellowProfile.module.scss';
import IPresentationProps from './IPresentationProps';
import { Icon } from 'office-ui-fabric-react/lib/Icon';

export default class Presentation extends React.Component<IPresentationProps, {}> {
  constructor(props) {
    super(props);
  }

  public render() {
    return (
      <div className={styles.leftComponent}>
        <h3>Information</h3>
        <span className={styles.personProperty}><Icon iconName="Suitcase" className={styles.bodyIcon}/> Occupation: {this.props.properties.occupation}</span>
        <span className={styles.personProperty}><Icon iconName="Contact" className={styles.bodyIcon}/>Gender: {this.props.properties.gender}</span>
        <span className={styles.personProperty}><Icon iconName="MapPin" className={styles.bodyIcon}/>Lives in: Springfield</span>
      </div>
    );
  }
}
