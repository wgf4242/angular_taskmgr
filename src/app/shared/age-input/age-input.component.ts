import {ControlValueAccessor, FormBuilder, FormGroup, NG_VALIDATORS, NG_VALUE_ACCESSOR} from '@angular/forms';
import {Component, forwardRef} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/merge';
import 'rxjs/add/observable/combineLatest';

@Component({
  selector: 'app-age-input',
  templateUrl: './age-input.component.html',
  styleUrls: ['./age-input.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => AgeInputComponent),
      multi: true
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => AgeInputComponent),
      multi: true
    },
  ]
})
export class AgeInputComponent implements ControlValueAccessor {
  form: FormGroup;
  private propagateChange = (_: any) => {};

  constructor(private fb: FormBuilder) {
  }

  ngOnInit() {
    this.form = this.fb.group({
      birthday: [],
      age: this.fb.group({
        ageNum: [],
        ageUnit: [],
      })
    });
    const birthday  = this.form.get('birthday');
    const ageNum  = this.form.get('ageNum');
    const ageUnit  = this.form.get('ageUnit');

    const birthday$ = birthday.valueChanges.map(d => {
      return {date: d, from: 'birthday'};
    });
    const ageNum$ = ageNum.valueChanges;
    const ageUnit$ = ageUnit.valueChanges;
    const age$ = Observable.combineLatest(ageNum$, ageUnit$, (_n, _u) => {
      return this.toDate({age: _n, unit: _u});
    }).map(d => {
      return {date: d, from: 'age'};
    });
    const merged$ = Observable.merge(birthday$, age$);

  }

  writeValue(obj: any): void {
  }

  registerOnChange(fn: any): void {
    this.propagateChange = fn;
  }

  registerOnTouched(fn: any): void {
  }

  private toDate(param: {age: any; unit: any}) {

  }
}
