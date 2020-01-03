import { Component, OnInit, NgModule } from '@angular/core';
import { Store } from '@ngrx/store';
import { NgForm } from '@angular/forms';
import { noop } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { AppState } from '../../../reducers';
import { AuthService } from '../../../services/auth.service';
import { Login } from 'src/app/actions/auth.actions';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

  constructor(private auth: AuthService, private store: Store<AppState>, private router: Router) { }

  ngOnInit() {
  }

  onSubmit(form: NgForm) {
    const val = form.value;
    this.auth.login(val.email, val.password)
      .pipe(
        tap(user => {
          console.log(user);
          if (user !== null && user !== undefined) {
            this.store.dispatch(new Login({ user }));
            this.router.navigateByUrl('/');
          }
          else {
            document.getElementById("error").innerHTML = "Email i lozinka su nepostojeci!";
          }

        })
      )
      .subscribe(
        noop,
        () => document.getElementById("error").innerHTML = "Email i lozinka su nepostojeci!"

      );
  }

  login(form: NgForm) {
    //this.auth.login();
  }

}
