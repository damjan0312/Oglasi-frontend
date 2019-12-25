import { Component, OnInit } from '@angular/core';
import { Ad } from 'src/app/models/ad';
import {AdsService} from 'src/app/services/ads.service';

@Component({
  selector: 'app-my-ads',
  templateUrl: './my-ads.component.html',
  styleUrls: ['./my-ads.component.css']
})
export class MyAdsComponent implements OnInit {

  myAds: Ad[];

  constructor(private adsService: AdsService) { }

  ngOnInit() { }

  ngDoCheck() {
    this.myAds=this.adsService.myAds();
  }

}
