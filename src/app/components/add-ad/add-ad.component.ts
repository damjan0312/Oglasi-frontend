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
import { Ad } from 'src/app/models/ad';
import { convertActionBinding } from '@angular/compiler/src/compiler_util/expression_converter';

@Component({
  selector: 'app-add-ad',
  templateUrl: './add-ad.component.html',
  styleUrls: ['./add-ad.component.css']
})
export class AddAdComponent implements OnInit {

  selectedValue: number = 0;
  categories: Category[];




  constructor(private adsService: AdsService, private store: Store<AppState>, private router: Router) { }

  ngOnInit() {
    const categories$ = this.store.pipe(
      select(selectAllCategories)
    );

    categories$.subscribe(data =>
      this.categories = data);
    console.log(this.categories);
  }

  onSubmit(form: NgForm) {
    const val = form.value;
    let userid = selectUserId();

    const category = this.categories.filter((category => { if (category.id === val.category) return category }));
    const picture = category[0].picture;

    // let newAd: Ad ={
    //   headline: val.headline,
    //   description : val.description,
    //   id:
    // }

    this.adsService.addAd(val.headline, val.description, picture,
      category[0].name, userid, val.contact, val.city, val.price)
      .pipe(
        tap(res => {
          if (res !== "") {
            let ad: Ad = {
              headline: val.headline,
              description: val.description,
              id: res,
              picture: picture,
              contact: val.contact,
              city: val.city,
              price: val.price,
              category: category[0].name,
              userId: userid
            };
            this.store.dispatch(new AddAd({ ad }));
            this.router.navigateByUrl('/');
          }
        }
        ))
      .subscribe(
        noop,
        () => console.log("greska")
      );
  }

}

