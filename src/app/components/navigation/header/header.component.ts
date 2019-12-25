import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/reducers';
import { Observable } from 'rxjs';
import { Logout } from 'src/app/actions/auth.actions';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  @Input() isLoggedIn$: Observable<boolean>;
  @Input() isLoggedOut$: Observable<boolean>;


  @Output() sidenavToggle = new EventEmitter<void>();

  constructor(private store: Store<AppState>, private router: Router) { }

  ngOnInit() {

  }

  onToggleSidenav() {
    this.sidenavToggle.emit();
  }

  logout() {
    this.store.dispatch(new Logout());
    this.router.navigateByUrl('/login');
  }
}
