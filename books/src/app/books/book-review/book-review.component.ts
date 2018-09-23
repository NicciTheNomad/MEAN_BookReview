import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Book } from '../../book';
import { Review } from '../../review';
import { Router, ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';

import { switchMap } from 'rxjs/operators';

import { BookService, ReviewService } from '../../services';
import { TitleizePipe } from '../../titleize.pipe';

@Component({
  selector: 'app-book-review',
  templateUrl: './book-review.component.html',
  styleUrls: ['./book-review.component.css'],
  providers: [TitleizePipe],
})
export class BookReviewComponent implements OnInit, OnDestroy {
  // books: Array<Book> = [];
  review = new Review();
  reviews: Array<Review> = [];
  sub: Subscription;
  selectedBook: Book;
  filter: Book = new Book();
  book: Book;
  errorMessage: string;
  constructor(
    // dependancy injected into comp.
    private router: Router,
    private route: ActivatedRoute,
    private bookService: BookService,
    private reviewService: ReviewService
  ) {}

  ngOnInit() {
    console.log('hello');
    this.book = this.route.snapshot.data.book as Book;
    // this.review = this.route.snapshot.data.review as Review;
    this.sub = this.reviewService
      .getReviews(this.book._id)
      .subscribe(reviews => {
        this.reviews = reviews;
        console.log(this.reviews);
      });
  }
  ngOnDestroy() {
    this.sub.unsubscribe();
  }
  onSubmit(form: NgForm) {
    console.log('this is the form from the component --->', form);
    const { value: description } = form;
    console.log('this is the description ----->', description);
    this.reviewService
      .addReview(description, this.book._id)
      .subscribe(review => {
        this.reviews.push(review);
        console.log('review: ', review);
        form.reset();
        // mimic book-new
        // this.router.navigateByUrl('/');
        // this.router.navigateByUrl('/books/{{this.book._id}}');
      });
  }
}
