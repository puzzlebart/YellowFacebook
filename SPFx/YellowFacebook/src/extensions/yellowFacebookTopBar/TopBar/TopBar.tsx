import * as React from 'react';
import styles from './TopBar.module.scss';
import * as strings from 'YellowFacebookTopBarApplicationCustomizerStrings';
import { ITopBarProps } from './ITopBarProps';
import { SearchBox } from 'office-ui-fabric-react/lib/SearchBox';
import { Persona, PersonaSize, IPersonaSharedProps, IPersonaStyles, IPersonaProps } from 'office-ui-fabric-react/lib/Persona';

export default class TopBar extends React.Component<ITopBarProps, {}> {
  public render() {

    const persona: IPersonaSharedProps = {
      imageUrl: `/_layouts/15/userphoto.aspx?size=L&username=${this.props.userLoginName}`,
      text: this.props.userDisplayName
    };

    return (
      <div id='top' className={styles.topBar}>
      <img className={styles.logo} src="/sites/YellowFacebook/SiteAssets/img/YF.PNG" alt="YF"/>
        <SearchBox className={styles.searchBox} placeholder={strings.SearchBoxPlaceholderText} />

        <div
          className={styles.userProfileLink}
          onClick={() => location.replace('/sites/HomerSimpson')}>
        <Persona
          {...persona}
          size={PersonaSize.size28}
        />
        </div>
      </div>
    );
  }

}
