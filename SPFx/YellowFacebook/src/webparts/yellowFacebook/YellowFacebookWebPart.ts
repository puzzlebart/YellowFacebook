import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-webpart-base';

import * as strings from 'YellowFacebookWebPartStrings';
import YellowFacebook from './components/YellowFacebook';
import { IYellowFacebookProps } from './components/IYellowFacebookProps';
import { sp } from '@pnp/sp';

export interface IYellowFacebookWebPartProps {
  description: string;
}

export default class YellowFacebookWebPart extends BaseClientSideWebPart<IYellowFacebookWebPartProps> {

  public render(): void {
    const element: React.ReactElement<IYellowFacebookProps > = React.createElement(
      YellowFacebook,
      {
        description: this.context.pageContext.web.absoluteUrl
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

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField('description', {
                  label: strings.DescriptionFieldLabel
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
