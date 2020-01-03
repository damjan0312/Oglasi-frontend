import { Injectable } from "@angular/core";
import { HttpClient, HttpParams, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { User } from "../models/user";
import { userUrl } from "server/server";

@Injectable({
  providedIn: "root"
})
export class AuthService {
  constructor(private http: HttpClient) { }

  login(email: string, password: string): Observable<User> {
    // return this.http.get<User>(
    //   `${userUrl}?email=${email}&password=${password}`
    //);
    // var data =
    //   "Email" + email + "&Password=" + password + "&grant_type=password";
    var data = `email=${email}&password=${password}`;

    var reqHeader = new HttpHeaders({
      "Content-Type": "application/json",
      //"Accept": "text/html, application/xhtml+xml",
      "No-Auth": "True"
    });
    let check = this.http.post(`${userUrl}/login`, { email, password }, {
      headers: reqHeader
    });
    check.subscribe(a => console.log(a));
    return check;
  }

  signup(
    name: string,
    lastName: string,
    email: string,
    password: string
  ): Observable<User> {
    return this.http.post(userUrl + "/add", {
      name,
      lastName,
      email,
      password
    });
  }

  authenticate(email: string): Observable<User> {
    const options = email
      ? {
        header: new HttpHeaders({
          "Content-Type": "application/json",
          Accept: "application/json",
          "Access-Control-Allow-Headers": "Content-Type"
        }),
        params: new HttpParams().set("email", email)
      }
      : {};

    let user = this.http.get<User>(`${userUrl}`, options);

    return user;
  }
}
