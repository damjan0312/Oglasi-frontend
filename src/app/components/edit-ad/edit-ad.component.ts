import { Component, OnInit, Input } from '@angular/core';
import { Ad } from 'src/app/models/ad';
import { AdsService } from 'src/app/services/ads.service';
import { AppState } from 'src/app/reducers';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { DeleteAd } from 'src/app/actions/ads.actions';
import { noop } from 'rxjs';

@Component({
  selector: 'app-edit-ad',
  templateUrl: './edit-ad.component.html',
  styleUrls: ['./edit-ad.component.css']
})
export class EditAdComponent implements OnInit {

  @Input()
  ad: Ad;

  constructor(private adsService: AdsService, private store: Store<AppState>, private router: Router) { }

  ngOnInit() {
  }

  delete() {
    const id = this.ad.id;
    this.store.dispatch(new DeleteAd({ id }))
    this.adsService.deleteAd(this.ad.id, this.ad.category)
      .subscribe(
        noop,
        () => console.log("greska")
      );
  }
}

