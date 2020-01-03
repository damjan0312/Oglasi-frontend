
import { Ad } from '../models/ad';
import { Action } from '@ngrx/store';



export enum AdsActionTypes {

    AdsRequested = '[View Ads Page] Ads Requested',
    AdsLoaded = '[View Ads Page] Ads Loaded',
    AddAd = '[Add Ad Page] Ad Added',
    DeleteAd = '[My Ads Page] Delete Ad'
}

export class AdsRequested implements Action {

    readonly type = AdsActionTypes.AdsRequested;

    constructor() {

    }
}

export class AdsLoaded implements Action {

    readonly type = AdsActionTypes.AdsLoaded;


    constructor(public payload: { ads: Ad[] }) {

    }
}

export class AddAd implements Action {

    readonly type = AdsActionTypes.AddAd;


    constructor(public payload: { ad: Ad }) {
        console.log("ads action", payload);
    }
}

export class DeleteAd implements Action {

    readonly type = AdsActionTypes.DeleteAd;


    constructor(public payload: { id: string }) {

    }
}

export type AdsActions = AdsRequested | AdsLoaded | AddAd | DeleteAd;