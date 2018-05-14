import {NgModule} from '@angular/core';
import {EffectsModule} from '@ngrx/effects';
import {QuoteEffects} from './quote.effects';
import {AuthEffects} from './auth.effects';

@NgModule({
  imports: [
    EffectsModule.forFeature([
      QuoteEffects,
      AuthEffects,
    ])
  ],
  exports: [],
  declarations: [],
  providers: [],
})
export class AppEffectsModule {
}
