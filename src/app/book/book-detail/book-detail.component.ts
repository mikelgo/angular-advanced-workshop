import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { filter, Observable } from 'rxjs';
import { exhaustMap, switchMap, tap } from 'rxjs/operators';
import { BookApiService } from '../book-api.service';
import { Book } from '../models';
import { Store } from "@ngrx/store";
import { bookByIsbn } from "../store/book-collection.selectors";

@Component({
  selector: 'ws-book-detail',
  styleUrls: ['./book-detail.component.scss'],
  templateUrl: 'book-detail.component.html'
})
export class BookDetailComponent {
  public book$: Observable<Book>;

  constructor(private router: Router, private route: ActivatedRoute, private store: Store) {

    this.book$ = this.route.params.pipe(
        switchMap(params => this.store.select(bookByIsbn(params['isbn']))),
        filter((book): book is Book => !!book)
    )
  }

  remove() {

  }
}
