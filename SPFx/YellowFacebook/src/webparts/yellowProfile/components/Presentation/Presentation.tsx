import * as React from 'react';
import styles from '../YellowProfile.module.scss';
import IPresentationProps from './IPresentationProps';
import { Icon } from 'office-ui-fabric-react/lib/Icon';

export default class Presentation extends React.Component<IPresentationProps, {}> {
  constructor(props) {
    super(props);
  }

  public render() {
    let properties = this.props.properties;
    let occupation = properties.occupation;
    let gender = "N/A";
    if( properties.gender != "N/A"){
      gender = (properties.gender === "M") ? "Male" : "Female";
    }
    return (
      <div className={styles.leftComponent}>
        <h3><Icon iconName="ContactInfo" className={styles.headerIcon}/>Information</h3>
        <span className={styles.personProperty}><Icon iconName="Suitcase" className={styles.bodyIcon}/> Occupation: {occupation}</span>
        <span className={styles.personProperty}><Icon iconName="Contact" className={styles.bodyIcon}/>Gender: {gender}</span>
        <span className={styles.personProperty}><Icon iconName="MapPin" className={styles.bodyIcon}/>Lives in: Springfield</span>
      </div>
    );
  }
}
