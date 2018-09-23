import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
// import { of } from 'rxjs';
import {
  NgForm,
  Validators,
  FormControl,
  FormGroupDirective,
  FormBuilder,
  FormGroup,
} from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { BOOKS } from '../data/book-data';
import { Book } from '../book';

@Injectable({
  // below is an options object
  providedIn: 'root',
})
export class BookService {
  // mock api
  // private base = 'http://59498bce6d49df0011102cfc.mockapi.io/books';
  private base = '/api/books/';

  bookForm: FormGroup;
  _id: string = '';
  title: string = '';
  author: string = '';
  pages: number;
  year: number;
  publisher: string = '';
  // review: string = '';
  review: Array<Book> = [];
  constructor(private http: HttpClient) {}

  getBooks(): Observable<Book[]> {
    return this.http.get<Book[]>(this.base);
  }

  getBook(id: string): Observable<Book> {
    return this.http.get<Book>(`${this.base}/${id}`);
  }

  createBook(book: Book): Observable<Book> {
    return this.http.post<Book>(this.base, book);
  }

  editBook(book: Book): Observable<Book> {
    this.bookForm.setValue({
      title: this.title,
      author: this.author,
      pages: this.pages,
      year: this.year,
      publisher: this.publisher,
    });
    return this.http.put<Book>(this.base, book); // maybe this should be like delete?
  }

  getBookToEdit(book: Book): Observable<Book> {
    this.bookForm.setValue({
      title: this.title,
      author: this.author,
      pages: this.pages,
      year: this.year,
      publisher: this.publisher,
    });
    return this.http.put<Book>(this.base, book); // maybe this should be like delete?
  }

  updateBook(book: Book): Observable<Book> {
    console.log('book service updating book (i hope.).');
    return this.http.put<Book>(this.base + book._id, book);
  }

  deleteBook(book: Book): Observable<Book> {
    return this.http.delete<Book>(`${this.base}/${book._id}`);
  }
}
