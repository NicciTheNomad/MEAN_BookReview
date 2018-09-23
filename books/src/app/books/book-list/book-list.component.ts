import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Book } from '../../book';
import { Review } from '../../review';
// import { BOOKS } from '../../data/book-data';
import { BookService } from '../../services';

import { TitleizePipe } from '../../titleize.pipe';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css'],
  // local injection requires YOU to provide the providers array
  providers: [TitleizePipe],
})
export class BookListComponent implements OnInit, OnDestroy {
  books: Array<Book> = [];
  review: Array<Review> = [];
  sub: Subscription;
  selectedBook: Book;
  filter: Book = new Book();
  // most things we inject will BE PRIVATE
  constructor(
    private titleize: TitleizePipe,
    // bookService is injected
    private bookService: BookService
  ) {}
  // use the lifestyle hook rather than put it in your contructor
  ngOnInit() {
    // this.bookService = null; // protects you from Overwriting your own service
    this.sub = this.bookService.getBooks().subscribe(books => {
      this.books = books;
      this.books.forEach(book => {
        book.author = this.titleize.transform(book.author);
      });
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  onSelect(book: Book) {
    console.log('selecting book: ', book);
    // ternary below
    this.selectedBook = this.selectedBook === book ? null : book;
    // if (this.selectedBook !== this.book) {
    //   this.selectedBook = book;
    // } else {
    //   this.selectedBook = null;
    // }
  }
  onCreate(book: Book) {
    console.log('creating book: ', book);
    this.books.push(book);
  }
  onClick(event: Event) {
    console.log('stopping button prop.', event);
    event.stopPropagation();
  }
  clearFilter(): void {
    this.filter = new Book();
  }

  onEdit(bookToEdit: Book) {
    console.log('editing book');
    this.bookService.editBook(bookToEdit).subscribe(editedBook => {
      console.log('edited book', editedBook);
      this.books = this.books.filter(book => book._id !== editedBook._id);
    });
  }

  onDelete(bookToDelete: Book) {
    console.log('deleting book');
    this.bookService.deleteBook(bookToDelete).subscribe(deletedBook => {
      console.log('deleted book', deletedBook);
      this.books = this.books.filter(book => book._id !== deletedBook._id);
    });
  }
}
