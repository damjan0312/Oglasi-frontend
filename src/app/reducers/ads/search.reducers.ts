import { SearchParam } from 'src/app/models/SearchParam';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { Ad } from 'src/app/models/ad';
import { SearchAction, SearchActionTypes } from 'src/app/actions/search.actions';


export interface SearchState  {
    ads:Ad[]
}


export const intialState: SearchState={
    ads:[]
}

export function searchReducer(state = intialState , action: SearchAction  ){

    switch(action.type)
    {
        case SearchActionTypes.SearchSuccess:{
            
            return {...state,
                ads:[action.payload.ads] }
        }
        default:{
                return state;
        }

    }
}