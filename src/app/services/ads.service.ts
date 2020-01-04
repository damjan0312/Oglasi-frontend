import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Observable, of } from "rxjs";
import { Ad } from "../models/ad";
import { adsUrl } from "server/server";
import { Store, select } from "@ngrx/store";
import { AppState } from "../reducers";
import { selectAllAds, selectUserId } from "../selectors/ad.selector";
import { map } from "rxjs/operators";

@Injectable()
export class AdsService {
  constructor(private http: HttpClient, private store: Store<AppState>) { }

  getAllAds(): Observable<Ad[]> {
    const headerDict = {
      "Content-Type": "application/json",
      Accept: "application/json",
      "Access-Control-Allow-Headers": "Content-Type"
    };
    let options = { headers: new Headers(headerDict) };

    return this.http.get<Ad[]>(`${adsUrl}`);
  }

  addAd(
    headline: string,
    description: string,
    picture: string,
    category: string,
    userId: string,
    contact: string,
    city: string,
    price: number
  ): Observable<any> {

    return this.http.post(adsUrl + "/add", {
      headline,
      description,
      picture,
      category,
      userId,
      contact,
      city,
      price
    });

  }

  deleteAd(id: string, category: string): Observable<any> {
    const url = `${adsUrl}/delete`;

    const options = {
      header: new HttpHeaders({
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Headers": "Content-Type"
      }),
      params: {
        id: id,
        category: category
      }
    }

    return this.http.delete(url, options);
  }

  searchAds(ads: Ad[], search): Observable<Ad[]> {
    if (
      search.category === "" &&
      search.city === "" &&
      search.priceFrom === "" &&
      search.priceTo === ""
    )
      return of(ads);

    const searchedAds = this.matching(search);
    return searchedAds;
  }

  matching(search): Observable<any> {
    const options = {
      header: new HttpHeaders({
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Headers": "Content-Type"
      }),
      params: {
        category: search.category,
        city: search.city,
        priceFrom: search.priceFrom,
        priceTo: search.priceTo
      }
    }

    console.log('search', search);
    return this.http.get(`${adsUrl}/search`, options);
  }

  myAds(): Ad[] {
    let myAds: Ad[];
    const ads$ = this.store.pipe(select(selectAllAds));

    ads$.subscribe(ads => {
      const id = selectUserId();
      console.log("myads", ads);
      myAds = ads.filter(ad => ad.userId === id);
      return myAds;
    });
    return myAds;
  }
}
