import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Ad } from '../models/ad';
import { adsUrl } from 'server/server';
import { Store, select } from '@ngrx/store';
import { AppState } from '../reducers';
import { selectAllAds } from '../selectors/ad.selector';
import {map} from 'rxjs/operators';

@Injectable()
export class AdsService {

    constructor(private http: HttpClient, private store: Store<AppState>) { }

    getAllAds(): Observable<Ad[]> {
        return this.http.get<Ad[]>(adsUrl)
    }

    addAd(headline: string, description: string, picture: string, category: string,
        userId: string, contact: string, city: string, price: number): Observable<Ad> {
        return this.http.post(adsUrl, { headline, description, picture, category, userId, contact, city, price });
    }

    deleteAd(id: string): Observable<Ad> {
        const url = `${adsUrl}/${id}`;
        return this.http.delete(url);
    }



    searchAds(ads: Ad[], search): Observable<Ad[]> {
        if (search.category === '' && search.city === '' && search.priceFrom === '' && search.priceTo === '')
            return of(ads);
        const searchedAds = ads.filter((ad) => this.matching(ad, search) === true);
        return of(searchedAds);
    }

    matching(ad: Ad, search) {

        if (ad.category.includes(search.category) || search.category === undefined) {
            if (ad.city.includes(search.city) || search.city === '' || search.city === undefined) {

                if (search.priceFrom <= ad.price || search.priceFrom === '' || search.priceFrom === undefined) {
                    if (search.priceTo >= ad.price || search.priceTo === '' || search.priceTo === undefined) {
                        return true;
                    }
                }
            }
        }
        return false;
    }

    myAds(): Ad[] {
        let myAds:Ad[];
        const ads$ = this.store
            .pipe(
                select(selectAllAds)
            )

        ads$.subscribe((ads) => {
            const id = JSON.parse(localStorage.getItem("user"))[0].id;
            myAds = ads.filter(ad => ad.userId === id);
            return myAds;
        });
        return myAds;
    }

}

