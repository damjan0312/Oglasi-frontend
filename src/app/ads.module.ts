import { AdsComponent } from './components/ads/ads.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { AdsEffects } from './effects/ads.effects';
import {CategoryEffects} from './effects/category.effects';
import { adsReducer } from 'src/app/reducers/ads/ads.reducers';
import {categoriesReducer} from 'src/app/reducers/category/category.reducer';
import { StoreModule } from '@ngrx/store';
import { AddAdComponent } from './components/add-ad/add-ad.component';
import { AdsService } from 'src/app/services/ads.service';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MyAdsComponent } from './components/my-ads/my-ads.component';
import { EditAdComponent } from './components/edit-ad/edit-ad.component';
import { MaterialModule } from './material.module';
import { CategoryService } from './services/category.service';
import { searchReducer } from './reducers/ads/search.reducers';
import { SearchEffects } from './effects/search.effects';

@NgModule({
  declarations: [
    AdsComponent,
    AddAdComponent,
    MyAdsComponent,
    EditAdComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MaterialModule,
    FlexLayoutModule,
    FormsModule,
    StoreModule.forFeature('searchAds', searchReducer),
    StoreModule.forFeature('ads', adsReducer),
    StoreModule.forFeature('categories',categoriesReducer),
    EffectsModule.forFeature([AdsEffects,CategoryEffects,SearchEffects])


  ],
  exports: [AdsComponent, AddAdComponent],
  providers: [AdsService,CategoryService],
  bootstrap: [AdsComponent]
})
export class AdsModule {

}