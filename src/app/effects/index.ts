import {NgModule} from '@angular/core';
import {EffectsModule} from '@ngrx/effects';
import {QuoteEffects} from './quote.effects';
import {AuthEffects} from './auth.effects';
import { ProjectEffects } from './project.effects';

@NgModule({
  imports: [
    EffectsModule.forRoot([
      QuoteEffects,
      AuthEffects,
      ProjectEffects
    ])
  ],
  exports: [],
  declarations: [],
  providers: [],
})
export class AppEffectsModule {
}
