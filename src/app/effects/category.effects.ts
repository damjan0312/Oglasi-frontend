import { Injectable } from "@angular/core";
import { Actions, Effect, ofType } from '@ngrx/effects';
import { CategoryService } from '../services/category.service';
import { Store,select } from '@ngrx/store';
import { AppState } from '../reducers';
import { CategoriesRequested, CategoryActionTypes, CategoriesLoaded } from '../actions/category.actions';
import { withLatestFrom, mergeMap, filter, map } from 'rxjs/operators';
import { allCategoriesLoaded } from '../selectors/category.selector';

@Injectable()
export class CategoryEffects{

    constructor(private actions$: Actions, private categoryService: CategoryService, private store: Store<AppState>){

    }

    @Effect()
    loadCategories$=this.actions$.pipe(
        ofType<CategoriesRequested>(CategoryActionTypes.CategoriesRequested),
        withLatestFrom(this.store.pipe(select(allCategoriesLoaded))),
        filter(([action,allCategoriesLoaded])=> ! allCategoriesLoaded),
        mergeMap(action=> this.categoryService.getAllCategories()),
        map(categories=> new CategoriesLoaded({categories}))

    )

}