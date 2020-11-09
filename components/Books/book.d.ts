// (Sean Rivard-Morton) [2020-10-09] TODO
// I think book data returned from the list of books
// and an individual book is slightly different.
// fix this, and put these types into types/book

export interface Book {
  kind: string;
  id: string;
  etag: string;
  selfLink: string;
  volumeInfo: {
    title: string;
    authors: string[];
    published: string;
    publishedData: string;
    description: string;
    industryIdentifiers: [
      {
        type: string;
        identifier: string;
      }
    ];
    readingsModes: {
      text: boolean;
      image: boolean;
    };
    pageCount: number;
    printType: string;
    Categories: string[];
    averageRating: number;
    ratingsCount: number;
    maturityRating: string;
    allowAnonLogging: boolean;
    contentVersioning: string;
    panelizationSummary: {
      containsEpubBubbles: boolean;
      containsImageBubbles: boolean;
    };
    imageLinks: {
      smallThumbnail: string;
      thumbnail: string;
    };
    language: string;
    previewLink: string;
    infoLink: string;
    canonicalVolumeLink: string;
    saleInfo: {
      country: string;
      saleability: string;
      isEbook: boolean;
      accessInfo: {
        country: string;
        viewability: string;
        embeddable: boolean;
        publicDomain: boolean;
        textToSpeechPermission: string;
        epub: {
          isAvailable: boolean;
        };
        pdf: {
          isAvailable: boolean;
        };
        webReaderLink: string;
        accessViewStatus: string;
        quoteSharingAllowed: boolean;
      };
      searchInfo: {
        textSnippet: string;
      };
    };
  };
}
