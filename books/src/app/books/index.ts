import { BookNewComponent } from './book-new/book-new.component';
import { BookListComponent } from './book-list/book-list.component';
import { BookDetailComponent } from './book-detail/book-detail.component';
import { BookEditComponent } from './book-edit/book-edit.component';
import { BookReviewComponent } from './book-review/book-review.component';

export const components: any[] = [
  BookDetailComponent,
  BookListComponent,
  BookNewComponent,
  BookEditComponent,
  BookReviewComponent,
];

export * from './book-detail/book-detail.component';
export * from './book-list/book-list.component';
export * from './book-new/book-new.component';
export * from './book-edit/book-edit.component';
export * from './book-review/book-review.component';
