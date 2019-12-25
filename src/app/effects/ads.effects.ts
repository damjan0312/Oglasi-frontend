import { Injectable } from '@angular/core';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { AdsActionTypes, AdsRequested, AdsLoaded } from '../actions/ads.actions';
import { mergeMap, map, withLatestFrom, filter } from 'rxjs/operators';
import { AdsService } from '../services/ads.service';
import { AppState } from '../reducers';
import { Store, select } from '@ngrx/store';
import { allAdsLoaded } from '../selectors/ad.selector';

@Injectable()
export class AdsEffects {

    @Effect()
    loadAds$ = this.actions$.
        pipe(
            ofType<AdsRequested>(AdsActionTypes.AdsRequested),
            withLatestFrom(this.store.pipe(select(allAdsLoaded))),
            filter(([action, allAdsLoaded]) => !allAdsLoaded),
            mergeMap(action => this.adsService.getAllAds()),
            map(ads => new AdsLoaded({ ads }))
        );

    constructor(private actions$: Actions, private adsService: AdsService, private store: Store<AppState>) {

    }

}