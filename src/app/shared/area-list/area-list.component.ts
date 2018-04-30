import {ChangeDetectionStrategy, Component, forwardRef, OnDestroy, OnInit} from '@angular/core';
import {ControlValueAccessor, FormControl, NG_VALIDATORS, NG_VALUE_ACCESSOR} from '@angular/forms';
import {Address} from '../../domain';
import {Subject} from 'rxjs/Subject';
import {Observer} from 'rxjs/Observer';
import {Observable} from 'rxjs/Observable';
import {Subscription} from 'rxjs/Subscription';
import {getAreaByCity, getCitiesByProvince, getProvinces} from '../../utils/area.util';

@Component({
  selector: 'app-area-list',
  templateUrl: './area-list.component.html',
  styleUrls: ['./area-list.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => AreaListComponent),
      multi: true
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => AreaListComponent),
      multi: true
    },
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AreaListComponent implements ControlValueAccessor, OnInit, OnDestroy {
  _address: Address = {
    province: '',
    city: '',
    district: '',
    street: '',
  };
  _province = new Subject();
  _city = new Subject();
  _district = new Subject();
  _street = new Subject();
  provinces$: Observable<string[]>;
  cities$: Observable<string[]>;
  districts$: Observable<string[]>;

  sub: Subscription;

  private propagateChange = (_: any) => {
  };

  writeValue(obj: Address): void {
    if (obj) {
        this._address = obj;
        if (this._address.province) {
            this._province.next(this._address.province);
        }
        if (this._address.city) {
            this._city.next(this._address.city);
        }
        if (this._address.district) {
            this._district.next(this._address.district);
        }
        if (this._address.street) {
            this._street.next(this._address.street);
        }

    }
  }

  registerOnChange(fn: any): void {
    this.propagateChange = fn;
  }

  registerOnTouched(fn: any): void {
  }

  ngOnInit(): void {
    const province$ = this._province.asObservable().startWith('');
    const city$ = this._city.asObservable().startWith('');
    const district$ = this._district.asObservable().startWith('');
    const street$ = this._street.asObservable().startWith('');
    const val$ = Observable.combineLatest([province$, city$, district$, street$], (_p, _c, _d, _s) => {
      return  {
        province: _p,
        city: _c,
        district: _d,
        street: _s
      };
    });
  this.sub = val$.subscribe(v => {
    this.propagateChange(v);
  });
  this.provinces$ = Observable.of(getProvinces());
  this.cities$ = province$.map((p: string) => getCitiesByProvince(p));
  this.districts$ = Observable.combineLatest(province$, city$, (p: string, c: string) => getAreaByCity(p, c));
  }

  ngOnDestroy(): void {
    if (this.sub) {
        this.sub.unsubscribe();
    }
  }

  validate(c: FormControl): { [key: string]: any } {
    const val = c.value;
    if (!val) {
      return null;
    }
    if (val.province && val.city && val.district && val.street) {
        return null;
    }
    return  {
      addressInvalid: true
    };
  }

  onProvinceChange() {
    this._province.next(this._address.province);
  }

  onCityChange() {
    this._city.next(this._address.city);
  }

  onDistrictChange() {
    this._district.next(this._address.district);
  }

  onStreetChange() {
    this._street.next(this._address.street);
  }


}
