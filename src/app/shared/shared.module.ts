import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatAutocompleteModule, MatButtonModule, MatCardModule, MatGridListModule, MatIconModule, MatInputModule, MatListModule, MatSidenavModule, MatSlideToggleModule} from '@angular/material';
import {MatToolbarModule} from '@angular/material/toolbar';

@NgModule({
  imports: [
    CommonModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatInputModule,
    MatSidenavModule,
    MatListModule,
    MatSlideToggleModule,
    MatGridListModule,
    MatAutocompleteModule,
  ],
  exports: [
    CommonModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatInputModule,
    MatSidenavModule,
    MatListModule,
    MatSlideToggleModule,
    MatGridListModule,
    MatAutocompleteModule,
  ],
  declarations: []
})
export class SharedModule {
}
