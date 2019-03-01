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


export default class YellowFacebook extends React.Component<IYellowFacebookProps, { adds?: any, quotes?: any, isLoading: boolean }> {

  constructor(props) {
    super(props);

    this.state = {
      isLoading: true
    };
  }

  public async componentDidMount() {
    await this.fetchData();
  }

  public randomize(a, b) { return Math.random() - 0.5;}

  public render(): React.ReactElement<IYellowFacebookProps> {
    if (this.state.isLoading) {
      return null;
    } else {
      let adds = this.renderAdds(this.state.adds);
      let quotes =this.renderQuote(this.state.quotes);
      let feed = quotes.concat(adds);
      console.log("1");
      console.log(quotes);
      console.log("2");
      console.log(feed);
      return (
        <div className={ styles.yellowFacebook }>

        <div className={styles.feed}>
            {/* {this.shuffle(this.renderQuote(this.state.quotes))} */}
            {feed.sort(this.randomize)}
            
          </div>
        </div>
      );
    }
  }

  private renderAdds(adds: any) {
    return adds.map(q => {
      let previewProps: IDocumentCardPreviewProps = {
        previewImages: [
          {
            previewImageSrc: q.picture,
            imageFit: ImageFit.contain,
            width: 480,
            height: 400
          }
        ]
      };
      return (
        <DocumentCard className={styles.statusUpdateHeader} >
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

  private renderQuote(quotes) {
      return quotes.map(quote => {
        return(<DocumentCard className={styles.statusUpdateHeader}>
          <DocumentCardActivity
            activity='Created sometime ago...'
            people={[{ name: quote.author, profileImageSrc: quote.picture }]} />
          <DocumentCardTitle title={quote.quote} />
        </DocumentCard>
      );
    });
  }

  private async fetchData() {
    let randomQuotes = [];
    for(let i = 0; i<50 ;i++ ){
      randomQuotes.push(await fetch("https://puzzlebart-saas.herokuapp.com/quotes",{headers:{apikey:"EATMYSHORTS"}}).then(d=>d.text().then(r=>r)));
    }
    console.log("##################");
    console.log(randomQuotes);
    console.log("##################");
    let data2 = await fetch("https://puzzlebart-saas.herokuapp.com/characters?Name=Bart%20Simpson",{headers:{apikey:"EATMYSHORTS"}}).then(d=>d.text().then(r=>r));
    let data = await sp.web.lists.getByTitle('Adds').items.getAll();
    console.log(JSON.parse(data2)[0]);
    console.log(JSON.parse(data2)[0].Name);
    console.log(JSON.parse(data2)[0].Photos);
    console.log(JSON.parse(data2)[0].Quotes);
    let quotes = randomQuotes.map(quote=> {
      let qu = JSON.parse(quote);
      return{
      quote: qu.Quote,
      author: qu.Name,
      picture: qu.Picture
      };
    });
    let picture = JSON.parse(data2)[0].Picture;
    let author = JSON.parse(data2)[0].Name;
    // let quotes = (JSON.parse(data2)[0].Quotes).map(quote =>{
    //   return{
    //     quote: quote,
    //     author: author,
    //     picture: picture
    //   }
    // })
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
    this.setState({ adds:adds, quotes:quotes, isLoading: false });
  }
   
}