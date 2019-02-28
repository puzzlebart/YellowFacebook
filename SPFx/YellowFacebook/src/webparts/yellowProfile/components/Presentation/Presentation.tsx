import * as React from 'react';
import styles from './Presentation.module.scss';
import { IPresentationProps } from './IPresentationProps';
import { escape } from '@microsoft/sp-lodash-subset';
import { Web } from 'sp-pnp-js';

export default class YellowProfile extends React.Component<IPresentationProps, {}> {
  public render(): React.ReactElement<IPresentationProps> {
    return (
      <div className={ styles.yellowProfile }>
        <div className={ styles.container }>
          <div className={ styles.row }>
            <div className={ styles.column }>
              <span className={ styles.title }>Welcome to SharePoint!</span>
              <p className={ styles.subTitle }>Customize SharePoint experiences using Web Parts.</p>
              <p className={ styles.description }>{escape(this.props.description)}</p>
              <a href="https://aka.ms/spfx" className={ styles.button }>
                <span className={ styles.label }>Learn more</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }

  public fetchData(){
    let web = new Web(`${document.location.protocol}//${document.location.hostname}${this.props.webServerRelativeUrl}`);

  }
}
