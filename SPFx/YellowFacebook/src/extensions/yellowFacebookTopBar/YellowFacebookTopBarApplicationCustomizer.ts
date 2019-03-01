import { override } from '@microsoft/decorators';
import { Log } from '@microsoft/sp-core-library';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import TopBar from './TopBar/TopBar';
import { ITopBarProps } from './TopBar/ITopBarProps';
import {
  BaseApplicationCustomizer,
  PlaceholderContent,
  PlaceholderName
} from '@microsoft/sp-application-base';
import { setup } from '@pnp/common';

import * as strings from 'YellowFacebookTopBarApplicationCustomizerStrings';

const LOG_SOURCE: string = 'YellowFacebookTopBarApplicationCustomizer';

/**
 * If your command set uses the ClientSideComponentProperties JSON input,
 * it will be deserialized into the BaseExtension.properties object.
 * You can define an interface to describe it.
 */
export interface IYellowFacebookTopBarApplicationCustomizerProperties {
  // This is an example; replace with your own property
  testMessage: string;
}

/** A Custom Action which can be run during execution of a Client Side Application */
export default class YellowFacebookTopBarApplicationCustomizer
  extends BaseApplicationCustomizer<IYellowFacebookTopBarApplicationCustomizerProperties> {
    private _topPlaceholder: PlaceholderContent | undefined;

  @override
  public onInit(): Promise<void> {

    setup({
      spfxContext: this.context
    });
    this.context.placeholderProvider.changedEvent.add(this, this.setupTopBar);

    return Promise.resolve();
  }

  private setupTopBar() {
    if (!this._topPlaceholder) {
        this._topPlaceholder = this.context.placeholderProvider.tryCreateContent(PlaceholderName.Top, { onDispose: this._onDispose });
        if (!this._topPlaceholder) {
          Log.info(LOG_SOURCE, `Expected placeholder 'Top' was not found.`);
          return;
        }
        if (this._topPlaceholder.domElement) {
          let yellowFacebookPlaceholderId = 'top-bar-placeholder';
          let yellowFacebookPlaceholder = document.getElementById(yellowFacebookPlaceholderId);
          if (yellowFacebookPlaceholder == null) {
            yellowFacebookPlaceholder = document.createElement('DIV');
            yellowFacebookPlaceholder.id = yellowFacebookPlaceholderId;
            this._topPlaceholder.domElement.appendChild(yellowFacebookPlaceholder);
          }
          const topBar : React.ReactElement<ITopBarProps> = React.createElement(TopBar, { userDisplayName: this.context.pageContext.user.displayName });
          ReactDOM.render(topBar, yellowFacebookPlaceholder);
        }
    }
  }

  private _onDispose(): void {
    Log.info(LOG_SOURCE, 'Disposed top placeholder.');
  }

}
