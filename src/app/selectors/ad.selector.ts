import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AdsState } from '../reducers/ads/ads.reducers';

import * as fromAd from '../reducers/ads/ads.reducers';

export const selectAdsState = createFeatureSelector<AdsState>("ads");

export const selectAllAds = createSelector(
  selectAdsState,
  fromAd.selectAll
);



export const allAdsLoaded = createSelector(
  selectAdsState,
  adsState => adsState.allAdsLoaded
);

export const selectUserId = () => {

  const userData = JSON.parse(localStorage.getItem("user"))["id"];
  // console.log(userData);
  return userData;
}


