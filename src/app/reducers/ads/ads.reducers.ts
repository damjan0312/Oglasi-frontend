import { Ad } from 'src/app/models/ad';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { AdsActions, AdsActionTypes } from 'src/app/actions/ads.actions';


export interface AdsState extends EntityState<Ad> {

    allAdsLoaded: boolean;

}

export const adapter: EntityAdapter<Ad> = createEntityAdapter<Ad>();

export const intialAdsState: AdsState = adapter.getInitialState({

    allAdsLoaded: false

});

export function adsReducer(state = intialAdsState, action: AdsActions): AdsState {

    switch (action.type) {

        case AdsActionTypes.AdsLoaded:
            return adapter.addAll(action.payload.ads, { ...state, allAdsLoaded: true });

        case AdsActionTypes.AddAd:
            return adapter.addOne(action.payload.ad, state);

        case AdsActionTypes.DeleteAd:
            return adapter.removeOne(action.payload.id, state);

        default: {
            return state;
        }


    }
}

export const {
    selectAll,
    selectEntities,
    selectIds,
    selectTotal
} = adapter.getSelectors();