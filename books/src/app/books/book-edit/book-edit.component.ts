import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  OnDestroy,
} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
// import { NgForm } from '@angular/forms'; // similar to book-new from J
// below is from web example
import {
  NgForm,
  Validators,
  FormControl,
  FormGroupDirective,
  FormBuilder,
  FormGroup,
} from '@angular/forms';

import { Router, ActivatedRoute } from '@angular/router';

import { BookService } from '../../services';
// why do i not see .base avaiable? private?
import { Book } from '../../book';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-book-edit',
  templateUrl: './book-edit.component.html',
  styleUrls: ['./book-edit.component.css'],
})
export class BookEditComponent implements OnInit {
  private base = '/api/books';
  book = new Book();
  sub: Subscription;

  @Output() newBook = new EventEmitter<Book>();

  bookForm: FormGroup;
  _id: string = '';
  title: string = '';
  author: string = '';
  pages: number;
  year: number;
  publisher: string = '';

  // inject as a dependancy
  constructor(
    // private readonly bookService: BookService,
    private bookService: BookService,
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private http: HttpClient
  ) {}

  ngOnInit() {
    // this is the example
    this.getBookToEdit(this.route.snapshot.params['id']);

    // nicci making stuff up
    this.editBook(this.route.snapshot.params['id']);

    // should this be _id?
    this.bookForm = this.formBuilder.group({
      // everything on lefthand side WAS in single ticks and changed on save. :-/
      title: [null, Validators.required],
      author: [null, Validators.required],
      pages: [null, Validators.required],
      year: [null, Validators.required],
      publisher: [null, Validators.required],
    });
  }

  // online example to EDIT
  getBookToEdit(id) {
    // example has this.api.blah
    this.bookService.getBookToEdit(id).subscribe(data => {
      // online example had this.id = data._id
      this._id = data._id;
      this.bookForm.setValue({
        title: data.title,
        author: data.author,
        pages: data.pages,
        year: data.year,
        publisher: data.publisher,
      });
    });
  }

  // Nicci making random shit up to freaking Edit
  editBook(book: Book): Observable<Book> {
    // this.id = data._id;
    this.bookForm.setValue({
      title: this.title,
      author: this.author,
      pages: this.pages,
      year: this.year,
      publisher: this.publisher,
    });
    return this.http.put<Book>(this.base, book);
  }
  // onFormSubmit(form: NgForm) {
  //   this.bookService.updateBook(this._id, form).subscribe(
  //     res => {
  //       let _id = res['_id'];
  //       this.router.navigate(['/book-detail', _id]);
  //     },
  //     err => {
  //       console.log(err);
  //     }
  //   );
  // }

  // must add in OnDestroy under 'export class...'
  // ngOnDestory() {
  //   if (this.sub) {
  //     this.sub.unsubscribe();
  //   }
  // }
  onsubmit(event: Event, form: NgForm) {
    event.preventDefault();
    console.log('updated', this.book);

    this.sub = this.bookService.createBook(this.book).subscribe(book => {
      console.log('update from API??', book);
      this.router.navigateByUrl('/');
    });
  }
}
