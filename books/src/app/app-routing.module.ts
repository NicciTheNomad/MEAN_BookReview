import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import * as fromBooks from './books';
import * as fromReview from './review';
import { NotFoundComponent } from './not-found/not-found.component';
import { BookResolve } from './resolvers/index';
const routes: Routes = [
  {
    path: '',
    // component: fromBooks.BookListComponent,
    redirectTo: 'books',
    pathMatch: 'full',
  },
  // {
  //   path: 'books',
  //   redirectTo: 'books/list',
  // },
  {
    path: 'books',
    children: [
      {
        path: '',
        component: fromBooks.BookListComponent,
      },
      {
        path: 'new',
        component: fromBooks.BookNewComponent,
      },
      {
        path: 'edit',
        component: fromBooks.BookEditComponent,
      },
      {
        path: ':id',
        resolve: {
          book: BookResolve,
        },

        children: [
          {
            path: '',
            component: fromBooks.BookDetailComponent,
          },
          {
            path: 'edit',
            component: fromBooks.BookEditComponent, // maybe this needs to look like route above with resolve?
          },
          {
            path: 'reviews',
            component: fromBooks.BookReviewComponent,
          },
        ],
      },
    ],
  },
  {
    path: '**',
    component: NotFoundComponent,
  },
  // {
  //   path: ':id',
  //   component: fromBooks.BookDetailComponent,
  // },
  // {
  //   path: 'books/:id',
  //   component: fromBooks.BookDetailComponent,
  // },
  // {
  //   path: 'books/books/:id',
  //   component: fromBooks.BookDetailComponent,
  // },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { enableTracing: false })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
