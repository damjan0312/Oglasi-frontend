import { Component, OnInit, Input, ViewChild, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { AppState } from 'src/app/reducers';
import { AdsRequested } from 'src/app/actions/ads.actions';
import { selectAllAds } from 'src/app/selectors/ad.selector';
import { Ad } from 'src/app/models/ad';
import { CategoriesRequested } from 'src/app/actions/category.actions';
import { selectAllCategories } from 'src/app/selectors/category.selector';
import { Category } from 'src/app/models/category';
import { SearchRequested } from 'src/app/actions/search.actions';
import { selectSearchedAds } from 'src/app/selectors/search.selector';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';
import { MatPaginator, MatTableDataSource } from '@angular/material';

@Component({
  selector: 'app-ads',
  templateUrl: './ads.component.html',
  styleUrls: ['./ads.component.css']
})
export class AdsComponent implements OnInit, OnDestroy {

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  ads$: Observable<Ad[]>;
  dataSource: MatTableDataSource<Ad>;
  categories: Category[];

  constructor(private store: Store<AppState>, private changeDetectorRef: ChangeDetectorRef) { }

  ngOnInit() {
    this.changeDetectorRef.detectChanges();
    this.store.dispatch(new AdsRequested());
    this.store.dispatch(new CategoriesRequested());

    const AllAds$ = this.store
      .pipe(
        select(selectAllAds)
      );

    AllAds$.subscribe(ads => {
      this.setAds(ads);
    });

    const categories$ = this.store.pipe(
      select(selectAllCategories)
    );
    categories$.subscribe(data =>
      this.categories = data);
  }


  onSubmit(form: NgForm) {
    const val = form.value;

    if (val.category === undefined || val.category === null)
      val.category = "";
    if (val.city === undefined || val.city === null)
      val.city = "";
    if (val.priceFrom === undefined || val.priceFrom === null)
      val.priceFrom = "";
    if (val.priceTo === undefined || val.priceTo === null)
      val.priceTo = "";

    this.store.dispatch(new SearchRequested(val));

    const AllAds$ = this.store
      .pipe(
        select(selectSearchedAds)
      )
      .subscribe(ads => {
        this.setAds(ads);
      })
  }

  setAds(ads: Ad[]) {
    this.dataSource = new MatTableDataSource<Ad>(ads);
    this.dataSource.paginator = this.paginator;
    this.ads$ = this.dataSource.connect();
  }

  ngOnDestroy() {
    if (this.dataSource) {
      this.dataSource.disconnect();
    }
  }


}
