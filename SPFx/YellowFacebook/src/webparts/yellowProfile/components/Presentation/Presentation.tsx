import * as React from 'react';
import styles from '../YellowProfile.module.scss';
import IPresentationProps from './IPresentationProps';

export default class Presentation extends React.Component<IPresentationProps, {}> {
  constructor(props) {
    super(props);
  }

  public render() {
    return (
      <div className={styles.leftComponent}>
        <span>Presentation</span>
      </div>
    );
  }


  public async componentDidMount(){
    this.fetchData()
  }

  public fetchData(){
    console.log(this.props.properties);
    // console.log(`${_spPageContextInfo.webAbsoluteUrl}/`)
    // let items = await fetch(`${_spPageContextInfo.webAbsoluteUrl}/`)
  }
}
