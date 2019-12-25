import { Injectable } from "@angular/core";
import { Effect, Actions, ofType } from '@ngrx/effects';
import { Store, select } from '@ngrx/store';
import { AppState } from '../reducers';
import { SearchRequested, SearchActionTypes, SearchSuccess } from '../actions/search.actions';
import {  mergeMap, map, tap, withLatestFrom, filter, switchMap } from 'rxjs/operators';

import { AdsService } from '../services/ads.service';
import { allAdsLoaded, selectAllAds } from '../selectors/ad.selector';



@Injectable()
export class SearchEffects{

    constructor(private actions$:Actions,private store: Store<AppState>,private service:AdsService){}
    
    @Effect()
    search$=this.actions$.pipe(
        ofType<SearchRequested>(SearchActionTypes.SearchRequested),
        withLatestFrom(this.store.pipe(select(selectAllAds))),
        switchMap(([action,selectAllAds])=> this.service.searchAds(selectAllAds,action.payload)),
        tap(ads =>  ads),
        map(ads => new SearchSuccess({ads}))
    )
}