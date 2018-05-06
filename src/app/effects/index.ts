import {NgModule} from '@angular/core';
import {EffectsModule} from '@ngrx/effects';
import {QuoteEffects} from './quote.effects';
@NgModule({
  imports: [EffectsModule.forRoot([QuoteEffects])],
  exports: [],
  declarations: [],
  providers: [],
})
export class AppEffectsModule {
}
