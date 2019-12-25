import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { AppState } from 'src/app/reducers';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { tap } from 'rxjs/operators';
import { noop } from 'rxjs';
import { Signup } from 'src/app/actions/auth.actions';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor(private auth: AuthService, private store: Store<AppState>, private router: Router) { }

  ngOnInit() {
  }


  onSubmit(form: NgForm) {
    const val = form.value;
    this.auth.authenticate(val.email)
      .pipe(
        tap(user => {
          if (Object.entries(user).length === 0) {
            this.auth.signup(val.name, val.lastName, val.email, val.password)
              .pipe(
                tap(user => {
                  this.store.dispatch(new Signup());
                  this.router.navigateByUrl('/login');
                }
                ))
              .subscribe(
                noop,
                (err) => document.getElementById("error").innerHTML = "Doslo je do greske!"

              )
          }
          else
            document.getElementById("error").innerHTML = "Email se vec koristi!";

        }
        )
      )
      .subscribe(
        noop,
        (err) => document.getElementById("error").innerHTML = "Doslo je do greske!"

      );
  }

}
