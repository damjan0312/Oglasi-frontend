import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AppState } from '../reducers';
import { Store, select } from '@ngrx/store';
import { isLoggedIn } from '../selectors/auth.selectors';
import { tap } from 'rxjs/operators';

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private store: Store<AppState>, private router: Router) {

    }

    canActivate(): Observable<boolean> {

        return this.store.pipe(
            select(isLoggedIn),
            tap(loggedIn => {

                if (!loggedIn) {
                    this.router.navigateByUrl('/login');
                }
            })
        );

    }

}