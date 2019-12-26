import { Injectable } from "@angular/core";
import { HttpClient, HttpParams, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { User } from "../models/user";
import { userUrl } from "server/server";

@Injectable({
  providedIn: "root"
})
export class AuthService {
  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<User> {
    return this.http.get<User>(
      `${userUrl}?email=${email}&password=${password}`
    );
  }

  signup(
    name: string,
    lastName: string,
    email: string,
    password: string
  ): Observable<User> {
    return this.http.post(userUrl + "add", { name, lastName, email, password });
  }

  authenticate(email: string): Observable<User> {
    // let params = new HttpParams().set("email", email); //Create new HttpParams

    // const headerDict = {
    //   "Content-Type": "application/json",
    //   Accept: "application/json",
    //   "Access-Control-Allow-Headers": "Content-Type"
    // };

    // let options1 = {
    //   headers: new Headers(headerDict),
    //   params: params
    // };

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

    return this.http.get<User>(`${userUrl}`, options);
  }
}
