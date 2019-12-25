import { createFeatureSelector, createSelector } from '@ngrx/store';
import {CategoryState} from '../reducers/category/category.reducer';
import * as fromCategory from '../reducers/category/category.reducer';

export const selectCategoryState=createFeatureSelector<CategoryState>("categories");

export const selectAllCategories=createSelector(
    selectCategoryState,
    fromCategory.selectAll
);

export const allCategoriesLoaded= createSelector(
    selectCategoryState,
    categoryState => categoryState.allCategoriesLoaded
);