import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {
  MatAutocompleteModule, MatButtonModule, MatButtonToggleModule, MatCardModule, MatCheckboxModule, MatDatepickerModule, MatDialogModule,
  MatGridListModule,
  MatIconModule,
  MatInputModule, MatListModule,
  MatMenuModule, MatNativeDateModule, MatRadioModule, MatSelectModule, MatSidenavModule, MatSlideToggleModule, MatTooltipModule
} from '@angular/material';
import {MatToolbarModule} from '@angular/material/toolbar';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';
import {DirectiveModule} from '../directive/directive.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { ImageListSelectComponent } from './image-list-select/image-list-select.component';
import { AgeInputComponent } from './age-input/age-input.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
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
    MatMenuModule,
    MatCheckboxModule,
    MatTooltipModule,
    MatRadioModule,
    MatNativeDateModule,
    MatDatepickerModule,
    MatSelectModule,
    MatDialogModule,
    MatSidenavModule,
    DirectiveModule,
    MatButtonToggleModule,
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
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
    MatMenuModule,
    MatCheckboxModule,
    MatTooltipModule,
    MatRadioModule,
    MatNativeDateModule,
    MatDatepickerModule,
    MatSelectModule,
    MatDialogModule,
    MatSidenavModule,
    DirectiveModule,
    ImageListSelectComponent,
    AgeInputComponent,
    MatButtonToggleModule,
  ],
  entryComponents: [ConfirmDialogComponent],
  declarations: [ConfirmDialogComponent, ImageListSelectComponent, AgeInputComponent]
})
export class SharedModule {
}
