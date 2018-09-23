// import { BookService } from './book.service';
// import { ReviewService } from './review.service';

// export const services: any[] = [BookService];
// // export const service

// export * from './book.service';
// export * from './review.service';
// arriba es Nicci solamente

// debajo = ejemplo de shannon
import { Injectable } from '@angular/core'; // for line 29
import {
  Router,
  Resolve,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable } from 'rxjs';
import { Book } from '../book';
import { BookService } from './book.service';
import { ReviewService } from './review.service';
import { Review } from '../review';

export const services: any[] = [BookService];
// export const service

export * from './book.service';
export * from './review.service';

@Injectable({
  providedIn: 'root', // is root correct? (https://angular.io/guide/dependency-injection)
})
export class ReviewResolver implements Resolve<Review[]> {
  constructor(private reviewService: ReviewService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<Review[]> {
    return this.reviewService.getReviews();
  }
}
