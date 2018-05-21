import { TestBed, inject } from '@angular/core/testing';

import { AuthService } from './auth.service';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { User } from '../domain';


describe('AuthService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule]
      providers: [
        {
          provide: 'BASE_CONFIG',
          useValue: {
            uri: 'http://localhost:3000'
          }
        },
        {
          provide: HttpClient,
          useFactory: (mockBackend, options) => {
            return new Http(mockBackend, options);
          }
          deps: [Mockbackend, BaseResponseOptions]
        }
        Mockbackend,
        BaseResponseOptions,
        , AuthService]
    });
  });

  it('注册后应该返回一个 Observable<Auth>', inject([AuthService, Mockbackend ], (service: AuthService) => {
    const mockUser: User = {
      name: 'someuser@dev.local',
      password: '123abc',
      email: 'someuser@dev.local'
    };
    const mockResponse = {
      id: 'obj123abc',
      name: 'someuser@dev.local',
      email: 'someuser@dev.local',
      password: '123abc'
    };
    mockBackend.connections.subscribe(conn => {
      conn.mockResopnse(new Response(new ReponseOptions({
        body: JSON.stringify(mockResponse)
      })));
    });
    service.register(mockUser).subscribe(auth => {
      expect(auth.token).toBeDefined();
      expect(auth.user).toBeDefined();
      expect(auth.user.id).toEqual(mockResponse.id);
    });
  }));
});

