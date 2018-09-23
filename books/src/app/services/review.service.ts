import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { NgForm, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { REVIEWS } from '../data/review-data';
import { Review } from '../review';

@Injectable({
  providedIn: 'root',
})
export class ReviewService {
  // baseurl = '/api/reviews/'
  baseurl = '/api/books/:book_id/reviews';

  reviews: Review[] = [];
  constructor(private http: HttpClient) {}

  getReviews(bookId: string): Observable<Review[]> {
    console.log('getting all book reviews');
    const url = this.baseurl.replace(':book_id', bookId);
    return this.http.get<Review[]>(url);
  }

  getSomeReviews(id): Observable<Review[]> {
    console.log('getting the books reviews ... i think?');
    return this.http.get<Review[]>(`${this.baseurl}?book:${id}`);
  }

  getOneReview(reviewID): Observable<Review> {
    console.log('getting a single review? ');
    return this.http.get<Review>(this.baseurl + reviewID);
  }

  addReview(review: Review, bookId: string): Observable<Review> {
    // line 36 is injecting the bookId from line 34, replacing the book_id in the baseurl (line 15)
    const url = this.baseurl.replace(':book_id', bookId);
    console.log('this is the url we are sending the review to', url);
    return this.http.post<Review>(url, review);
  }

  updateReview(review: Review): Observable<Review> {
    console.log('update the review? humm....');
    return this.http.put<Review>(this.baseurl + review._id, review);
  }

  deleteReview(reviewID): Observable<Review> {
    console.log('deleting a specific review');
    return this.http.delete<Review>(this.baseurl + reviewID);
  }
}
