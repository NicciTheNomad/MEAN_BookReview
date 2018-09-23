import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Book } from '../../book';
import { Subscription } from 'rxjs';

import { switchMap } from 'rxjs/operators';

import { BookService } from '../../services';

@Component({
  selector: 'app-book-detail',
  templateUrl: './book-detail.component.html',
  styleUrls: ['./book-detail.component.css'],
})
export class BookDetailComponent implements OnInit {
  books: Array<Book> = [];
  sub: Subscription;
  @Input() book: Book;
  errorMessage: string;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private bookService: BookService
  ) {}

  ngOnInit() {
    console.log('in the book-detail comp.');
    // this.route.paramMap.subscribe(params => {
    //   const id = params.get('id');
    //   this.bookService.getBook(id).subscribe(book => (this.book = book));
    // });

    // this.route.paramMap
    //   .pipe(
    //     switchMap(params => {
    //       const id = params.get('id');
    //       console.log(id);
    //       // below is an observable.
    //       return this.bookService.getBook(id);
    //     })
    //   )
    //   .subscribe(
    //     book => (this.book = book),
    //     error => {
    //       console.log('error', error);
    //       this.errorMessage = error.error;

    //       setTimeout(() => {
    //         this.router.navigateByUrl('/');
    //       }, 3000);
    //     }
    //   );
    this.book = this.route.snapshot.data.book as Book;
    this.sub = this.bookService.getBooks().subscribe(books => {
      this.books = books;
      this.books.forEach(book => {
        // book.author = this.titleize.transform(book.author);
      });
    });
  }
  onEdit(bookToEdit: Book) {
    console.log('editing book');
    this.bookService.editBook(bookToEdit).subscribe(editedBook => {
      console.log('edited book', editedBook);
      this.books = this.books.filter(book => book._id === editedBook._id);
    });
  }

  onSubmit(book: Book) {
    this.bookService.updateBook(book).subscribe(
      updatedBook => {
        console.log('updating book', updatedBook);
        this.books.push(updatedBook);
      },
      error => {
        console.log(error);
      }
    );
  }
}
