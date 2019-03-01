import * as React from 'react';
import styles from './YellowFacebook.module.scss';
import { IYellowFacebookProps } from './IYellowFacebookProps';
import {
  DocumentCard,
  DocumentCardActivity,
  DocumentCardTitle,
  DocumentCardPreview,
  IDocumentCardPreviewProps,
  DocumentCardType
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
  }

  public render(): React.ReactElement<IYellowFacebookProps> {
    if (this.state.isLoading) {
      return null;
    } else return (
      <div className={ styles.yellowFacebook }>

      <div className={styles.feed}>
          {this.renderAdds(this.state.adds)}
        </div>
      </div>
    );
  }

  private renderAdds(adds: any) {
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
      };
      return (
        <DocumentCard className={styles.statusUpdateHeader }>
          <DocumentCardActivity
            activity='Advertisement'
            people={[{ name: q.company, profileImageSrc: q.companylogo }]} />
          <DocumentCardTitle title={q.title} />
          <DocumentCardTitle title={q.description} showAsSecondaryTitle={true} />
          <DocumentCardPreview {...previewProps} />
        </DocumentCard>
      );
    });
  }

  private renderQuote(quote, author) {

      return (
        <DocumentCard type={DocumentCardType.compact} className={styles.statusUpdateHeader}>
          <DocumentCardActivity
            activity='Created sometime ago...'
            people={[{ name: author.name, profileImageSrc: author.picture }]} />
          <DocumentCardTitle title={quote} />
        </DocumentCard>
      );
  }

  private async fetchData() {
    let data2 = await fetch("https://puzzlebart-saas.herokuapp.com/characters?Name=Bart%20Simpson",{headers:{apikey:"EATMYSHORTS"}}).then(d=>d.text().then(r=>r));
    let data = await sp.web.lists.getByTitle('Adds').items.getAll();
    console.log(JSON.parse(data2)[0])
    console.log(JSON.parse(data2)[0].Name)
    console.log(JSON.parse(data2)[0].Photos)
    console.log(JSON.parse(data2)[0].Quotes)
    let adds =  data.map(dat =>{
      return {
      title: dat.Title,
      description: dat.Description,
      picture: dat.Picture,
      demography: dat.Demography,
      companylogo: dat.CompanyLogo,
      company: dat.Company
      };
    });
    this.setState({ adds, isLoading: false });
  }
}
