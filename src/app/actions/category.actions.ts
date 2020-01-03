import { Action } from '@ngrx/store';
import { Category } from '../models/category';

export enum CategoryActionTypes {

    CategoriesRequested = '[View Ads Page] Categories Requested',
    CategoriesLoaded = '[View Ads Page] Categories Loaded',
}

export class CategoriesRequested implements Action {

    readonly type = CategoryActionTypes.CategoriesRequested;

    constructor() {

    }
}

export class CategoriesLoaded implements Action {

    readonly type = CategoryActionTypes.CategoriesLoaded;

    constructor(public payload: { categories: Category[] }) {

    }
}

export type CategoryAction = CategoriesRequested | CategoriesLoaded;