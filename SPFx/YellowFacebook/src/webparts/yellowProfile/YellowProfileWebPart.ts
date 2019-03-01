import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {BaseClientSideWebPart} from '@microsoft/sp-webpart-base';
import { sp } from '@pnp/sp';
import * as strings from 'YellowProfileWebPartStrings';
import YellowProfile from './components/YellowProfile';
import { IYellowProfileProps } from './components/IYellowProfileProps';

export interface IYellowProfileWebPartProps {
  description: string;
}

export default class YellowProfileWebPart extends BaseClientSideWebPart<IYellowProfileWebPartProps> {

  public render(): void {
    const element: React.ReactElement<IYellowProfileProps > = React.createElement(
      YellowProfile,
      {
        httpClient: this.context.httpClient
      }
    );

    ReactDom.render(element, this.domElement);
  }

  protected async onInit(): Promise<void> {
    await super.onInit();
    sp.setup({ spfxContext: this.context });
}

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

}
