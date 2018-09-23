import { Book } from '../book';

export const BOOKS: Book[] = [
  // {
  //   id: randomId(),
  //   title: 'abc',
  //   author: 'ray f.',
  //   year: 1976,
  //   pages: 12,
  //   publisher: 'abueg',
  // },
  // {
  //   id: randomId(),
  //   title: 'a defg',
  //   author: 'maya a. ',
  //   year: 2007,
  //   pages: 11,
  //   publisher: 'aurora',
  // },
  // {
  //   id: randomId(),
  //   title: 'hijk',
  //   author: 'ashton s.',
  //   year: 2009,
  //   pages: 8,
  //   publisher: 'santiago',
  // },
  // {
  //   id: randomId(),
  //   title: 'youngest child',
  //   author: 'oliver',
  //   year: 2012,
  //   pages: 5,
  //   publisher: 'michael',
  // },
  // {
  //   id: randomId(),
  //   title: 'one fish, two fish ',
  //   author: 'dr. suess',
  //   year: 2009,
  //   pages: 8,
  //   publisher: 'santiago',
  // },
];

function randomId() {
  return Math.round(Math.random() * 1000);
}
