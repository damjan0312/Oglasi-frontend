import { Component, OnInit } from '@angular/core';
import { Form, NgForm } from '@angular/forms';
import { AdsService } from 'src/app/services/ads.service';
import { Store, select } from '@ngrx/store';
import { AppState } from 'src/app/reducers';
import { Router } from '@angular/router';
import { tap } from 'rxjs/operators';
import { noop } from 'rxjs';
import { AddAd } from 'src/app/actions/ads.actions';
import { selectUserId } from 'src/app/selectors/ad.selector';
import { Category } from 'src/app/models/category';
import { allCategoriesLoaded, selectAllCategories } from 'src/app/selectors/category.selector';

@Component({
  selector: 'app-add-ad',
  templateUrl: './add-ad.component.html',
  styleUrls: ['./add-ad.component.css']
})
export class AddAdComponent implements OnInit {

  selectedValue: number = 0;
  categories: Category[];

  

  
  constructor(private adsService:AdsService,private store:Store<AppState>,private router:Router) { }

  ngOnInit() {
    const categories$= this.store.pipe(
      select(selectAllCategories)
    );

    categories$.subscribe(data=> 
      this.categories=data);
  }

  onSubmit(form:NgForm)
  {
    const val=form.value;
    let userid=selectUserId();
    const picture=this.categories[val.category].picture;
    this.adsService.addAd(val.headline,val.description,picture,
      this.categories[val.category].name,userid,val.contact,val.city,val.price)
    .pipe(
      tap(ad => {
          this.store.dispatch(new AddAd({ad}));
          this.router.navigateByUrl('/');
      }
      ))
      .subscribe(
        noop,
        () => console.log("greska")
      );
  }

}

