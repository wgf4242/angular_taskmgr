import * as actions from '../actions/auth.action';
import {fakeAsync, TestBed} from '@angular/core/testing';
import {AuthEffects} from './auth.effects';
import {AuthService} from '../services/auth.service';
import {Observable} from 'rxjs/Observable';
import {cold, hot} from 'jasmine-marbles';
import {MyEffects} from './my-effects';


describe('Auth.Effects', () => {
  // let effects: MyEffects;
  // let actions: Observable<any>;
  beforeEach(() => TestBed.configureTestingModule({
    imports: [

    ],
    providers: [
      AuthEffects,
      {
        provide: AuthService,
        useValue: jasmine.createSpyObj('authService', ['login', 'register'])
      }
    ]
  }));
  function setup(methodName: string, params: {returnedAuth: any}) {
    const authService = TestBed.get(AuthService);
    if (params) {
      if (methodName === 'login') {
        authService.login.and.returnValue(params.returnedAuth);
      } else {
        authService.register.and.returnValue(params.returnedAuth);
      }
      return {
        runner: TestBed.get(EffectsRunner),
        authEffects: TestBed.get(AuthEffects)
      };
    }
  }
  it('登录成功发送 SuccessAction', fakeAsync(() => {
    const auth = {
      token: '',
      user: {
        id: '123abc',
        name: 'wang',
        password: '123',
        email: 'wang@163.com'
      }
    };

    const {runner, authEffects} = setup('login', {returnedAuth: Observable.of(auth)});
    const expectedResult = new actions.LoginSuccessAction(auth);
    runner.queue(new actions.LoginAction({email: 'wang@dev.local', password: '123abc'}));
    authEffects.login$.subscribe(_result => expect(_result).toEqual(expectedResult));
  }));
});
