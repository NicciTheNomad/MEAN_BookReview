import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

import { ReviewService } from '../services';
import { BookService } from '../services';
import { Review } from '../review';
import { Book } from '../book';

@Injectable()
export class BookResolve implements Resolve<Book> {
  constructor(private bookService: BookService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<Book> {
    return this.bookService.getBook(route.paramMap.get('id'));
  }
}
