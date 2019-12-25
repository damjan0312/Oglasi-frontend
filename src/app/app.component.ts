import { Component, ViewChild, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { AppState } from './reducers';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { isLoggedIn, isLoggedOut } from './selectors/auth.selectors';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  isLoggedIn$: Observable<boolean>;
  isLoggedOut$: Observable<boolean>;

  constructor(private store: Store<AppState>) {

  }

  ngOnInit() {

    this.isLoggedIn$ = this.store
      .pipe(
        select(isLoggedIn)
      );


    this.isLoggedOut$ = this.store
      .pipe(
        select(isLoggedOut)
      );

  }
}
