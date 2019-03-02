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
  public render(): React.ReactElement<IYellowFacebookProps> {
    if (this.state.isLoading) {
      return null;
    } else {
      let adds = this.renderAdds(this.state.adds);
      let quotes = this.renderQuote(this.state.quotes);
      adds.forEach(element => {
        quotes.splice(this.randomNumber(quotes.length), 0, element);
      });
      return (
        <div className={styles.yellowFacebook}>

          <div className={styles.feed}>
            {quotes}
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
        <DocumentCard className={styles.statusUpdateHeader}>
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
    let dates: Date[] = [];
    for (let i = 0; i < quotes.length; i++) {
      let newDate = this.randomDate(new Date(2019, 1, 2), new Date(2019, 2, 1));
      dates.push(newDate);
    }
    dates.sort((a, b) => b.getDate() < a.getDate() ? -1 : 1);

    return quotes.map((quote, i) => {
      return (
        <DocumentCard className={styles.statusUpdateHeader}>
          <div className={styles.userProfileLink} onClick={() => this.openProfile(quote.author)}>
            <DocumentCardActivity
              activity={dates[i].toDateString()}
              people={[{ name: quote.author, profileImageSrc: quote.picture }]} />
          </div>
          <DocumentCardTitle title={quote.quote} />
        </DocumentCard>
      );
    });
  }

  private openProfile(user: string) {
    location.replace(`/sites/HomerSimpson?name=${user}`);
  }

  private async fetchData() {
    let randomQuotes = JSON.parse(await fetch("https://puzzlebart-saas.herokuapp.com/quotes?amount=50", { headers: { apikey: "EATMYSHORTS" } }).then(d => d.text().then(r => r)));
    let data = await sp.web.lists.getByTitle('Adds').items.getAll();
    let quotes = randomQuotes.map(quote => {
      return {
        quote: quote.Quote,
        author: quote.Name,
        picture: quote.Picture
      };
    });
    let adds = data.map(dat => {
      return {
        title: dat.Title,
        description: dat.Description,
        picture: dat.Picture,
        demography: dat.Demography,
        companylogo: dat.CompanyLogo,
        company: dat.Company
      };
    });
    this.setState({ adds: adds, quotes: quotes, isLoading: false });
  }
  private randomNumber(max) {
    return Math.floor(Math.random() * max) + 1;
  }

  private randomDate(start, end) {
    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
  }

}
