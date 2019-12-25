import { Action } from '@ngrx/store';
import { SearchParam } from '../models/SearchParam';
import { Ad } from '../models/ad';


export enum SearchActionTypes{
    SearchRequested = '[Search] Search',
    SearchSuccess = '[Search Success] Search Success'
}

export class SearchRequested implements Action {

    readonly type= SearchActionTypes.SearchRequested;

    constructor(public payload:{search:SearchParam}){
    }
}

export class SearchSuccess implements Action {

    readonly type = SearchActionTypes.SearchSuccess;

    constructor(public payload: {ads:Ad[]}){

    }
}

export type SearchAction=  SearchRequested | SearchSuccess;