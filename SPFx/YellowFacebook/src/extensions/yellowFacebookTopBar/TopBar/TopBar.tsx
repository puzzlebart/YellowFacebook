import * as React from 'react';
import styles from './TopBar.module.scss';
import * as strings from 'YellowFacebookTopBarApplicationCustomizerStrings';
import { ITopBarProps } from './ITopBarProps';
import { ITopBarState } from './ITopBarState';
import { SearchBox } from 'office-ui-fabric-react/lib/SearchBox';
import { Persona, PersonaSize, IPersonaSharedProps } from 'office-ui-fabric-react/lib/Persona';

export default class TopBar extends React.Component<ITopBarProps, ITopBarState> {

  public render() {

    const persona: IPersonaSharedProps = {
      imageUrl: `/_layouts/15/userphoto.aspx?size=L&username=${this.props.userLoginName}`,
      text: this.props.userDisplayName
    };

    return (
      <div className={styles.topBar}>
        <div onClick={() => location.replace('/sites/YellowFacebook_v2/SitePages/Newsfeed.aspx')}>
          <img className={styles.logo} src="/sites/YellowFacebook/SiteAssets/img/YF.PNG" alt="YF" />
        </div>
        <SearchBox
          className={styles.searchBox}
          placeholder={strings.SearchBoxPlaceholderText}
          onChanged={(searchTerm) => this.updateSearchTerm(searchTerm)}
          onSearch={this._onSearch}
        />

        <div
          className={styles.userProfileLink}
          onClick={() => location.replace('/sites/UserProfile/SitePages/User.aspx')}>
          <Persona
            {...persona}
            size={PersonaSize.size28}
          />
        </div>
      </div>
    );
  }

  private updateSearchTerm(searchTerm: string) {
    this.setState({ searchTerm });
  }

  private _onSearch = () => {
    location.replace(`/sites/UserProfile/SitePages/User.aspx?name=${this.state.searchTerm}`);
  }

}
