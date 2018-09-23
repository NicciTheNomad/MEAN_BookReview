// in the video from 6/26 Jason got rid of createId and had the API generate the Id
// constructor(createId = true) {
//   if (createId) {
//     this.id = Math.round(Math.random() * 1000);
//   }
// }
// Shannon imports, added line 8
import { Review } from './review';

export class Book {
  _id: string;
  title: string;
  author: string;
  pages: number;
  year: string;
  publisher: string;
  // review: Array<Book>;
  // shannon has below
  // reviews: Review[];

  constructor() {}
}

// export class Review {
//   name: string;
//   stars: number;
//   description: string;

//   constructor() {}
// }
