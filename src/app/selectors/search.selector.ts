

import {createSelector } from '@ngrx/store';

export const selectSearchState= state => state.searchAds;

export const selectSearchedAds= createSelector(
    selectSearchState,
    searchAds => searchAds.ads[0]
);