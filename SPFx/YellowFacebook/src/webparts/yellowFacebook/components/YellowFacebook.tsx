import * as React from 'react';
import styles from './YellowFacebook.module.scss';
import { IYellowFacebookProps } from './IYellowFacebookProps';
import {
  DocumentCard,
  DocumentCardType,
  DocumentCardActivity,
  DocumentCardTitle,
  DocumentCardPreview,
  IDocumentCardPreviewProps
} from 'office-ui-fabric-react/lib/DocumentCard';
import { ImageFit } from 'office-ui-fabric-react/lib/Image';
import { sp } from '@pnp/sp';


export default class YellowFacebook extends React.Component<IYellowFacebookProps, { adds?: any, isLoading: boolean }> {

  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      adds: null
    };
  }

  public async componentDidMount() {
    await this.fetchData();
    // console.log(this.state.properties);
  }


  public render(): React.ReactElement<IYellowFacebookProps> {
    if (this.state.isLoading) {
      return null;
    } else return (
      <div className={ styles.yellowFacebook }>
      
      <div className={styles.feed}>
          {this.renderItems(this.state.adds)}
        </div>
      </div>
    );
  }

  private renderItems(adds: any) {
    console.log(adds)
    return adds.map(q => {
      let previewProps: IDocumentCardPreviewProps = {
        previewImages: [
          {
            previewImageSrc: q.picture,
            imageFit: ImageFit.contain,
            width: 318,
            height: 300
          }
        ]
      }
      return (
        <DocumentCard className={styles.statusUpdateHeader }>
          <DocumentCardActivity
            activity='Advertisement'
            people={[{ name: q.title, profileImageSrc: q.picture }]} />
          <DocumentCardTitle title={q.description}  />
          <DocumentCardPreview {...previewProps} />
        </DocumentCard>
      );
    });
  }

  private async fetchData() {
    let data = await sp.web.lists.getByTitle('Adds').items.getAll();
    
    let adds =  data.map(dat =>{
      return {
      title: dat.Title,
      description: dat.Description,
      picture: dat.Picture,
      demography: dat.Demography
      }
    });
    this.setState({ adds, isLoading: false });
  }
}
