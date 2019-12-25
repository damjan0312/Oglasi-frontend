import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user';
import { userUrl } from 'server/server';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient) { }


  login(email: string, password: string): Observable<User> {
    return this.http.get<User>(`${userUrl}?email=${email}&password=${password}`);
  }

  signup(name: string, lastName: string, email: string, password: string): Observable<User> {
    return this.http.post(userUrl, { name, lastName, email, password });
  }

  authenticate(email: string): Observable<User> {
    return this.http.get<User>(`${userUrl}?email=${email}`);
  }
}