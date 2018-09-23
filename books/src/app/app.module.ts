import { BrowserModule, Title } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
// below goes away due to barreling into the index ts file under books folder
// import { BookListComponent } from './books/book-list/book-list.component';
// import { BookNewComponent } from './books/book-new/book-new.component';
// import { BookDetailComponent } from './books/book-detail/book-detail.component';

import { TitleizePipe } from './titleize.pipe';
import { SearchPipe } from './search.pipe';

// got rid of this line with barreling
// import { BookService } from './services/book.service';

import * as fromBooks from './books';
// import * as fromReview from './books/book-review';
import * as fromServices from './services';

import { AppRoutingModule } from './app-routing.module';
import { NavComponent } from './nav/nav.component';
import { NotFoundComponent } from './not-found/not-found.component';

import { BookResolve } from './resolvers';
import { BookEditComponent } from './books/book-edit/book-edit.component';
import { BookReviewComponent } from './books/book-review/book-review.component';
@NgModule({
  declarations: [
    AppComponent,
    TitleizePipe,
    SearchPipe,
    ...fromBooks.components,
    NavComponent,
    NotFoundComponent,
    BookEditComponent,
    BookReviewComponent,
  ],
  imports: [BrowserModule, FormsModule, HttpClientModule, AppRoutingModule],
  providers: [...fromServices.services, BookResolve],
  bootstrap: [AppComponent],
})
export class AppModule {}
