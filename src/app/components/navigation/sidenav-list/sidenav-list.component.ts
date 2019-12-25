import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { AppState } from 'src/app/reducers';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Logout } from 'src/app/actions/auth.actions';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidenav-list',
  templateUrl: './sidenav-list.component.html',
  styleUrls: ['./sidenav-list.component.css']
})
export class SidenavListComponent implements OnInit {

  @Input() isLoggedIn$: Observable<boolean>;
  @Input() isLoggedOut$: Observable<boolean>;


  @Output() closeSidenav = new EventEmitter<void>();

  constructor(private store: Store<AppState>, private router: Router) { }

  ngOnInit() {
  }

  onClose() {
    this.closeSidenav.emit();
  }

  onCloseLogout() {
    this.closeSidenav.emit();
    this.store.dispatch(new Logout());
    this.router.navigateByUrl('/login');
  }

}
