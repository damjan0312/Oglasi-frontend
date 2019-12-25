import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { Category } from 'src/app/models/category';
import { CategoryAction, CategoryActionTypes } from 'src/app/actions/category.actions';


export interface CategoryState extends EntityState<Category>{
    allCategoriesLoaded:boolean;
}

export const adapter: EntityAdapter<Category>=createEntityAdapter<Category>();

export const initialCategoryState: CategoryState = adapter.getInitialState({
    allCategoriesLoaded:false
});

export function categoriesReducer(state = initialCategoryState,action: CategoryAction ){
    switch(action.type){

        case CategoryActionTypes.CategoriesLoaded:
            return adapter.addAll(action.payload.categories,{...state,allCategoriesLoaded:true});
        
        default: return state;
    }
}
export const {
    selectAll,
    selectEntities,
    selectIds,
    selectTotal
} = adapter.getSelectors();