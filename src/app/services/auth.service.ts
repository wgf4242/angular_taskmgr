import {Inject, Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Project, User} from '../domain';
import {Observable} from 'rxjs/Observable';
import {Auth} from '../domain/auth.model';

@Injectable()
export  class AuthService {

  private readonly domain = 'users';
  private headers = new HttpHeaders({
    'Content-Type': 'application/json'
  });
  private token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9' +
    '.eyJ1c2VyX2lkIjoxNSwidXNlcm5hbWUiOiJ3YW5nZ2YiLCJleHAiOjE1MjQ2MDYzMzgsImVtYWlsIjoiIn0' +
    '.fd2TpIyyc5ErnnFzAffCDE83wpfXM44hZWPvSVbn0Ec';

  constructor(private http: HttpClient, @Inject('BASE_CONFIG') private config) {
  }

  // POST
  register(user: User): Observable<Auth> {
    const uri = `${this.config.uri}/${this.domain}`;
    return this.http
      .get<User[]>(uri, {params: {'email': user.email}})
      .switchMap(res => {
        if (res.length > 0) {
          throw 'user existed';
        }
        return this.http
          .post<User>(uri, JSON.stringify(user), {headers: this.headers})
          .map(r => ({token: this.token, user: r}));
      });
  }

  login(username: string, password: string): Observable<Auth> {
    const uri = `${this.config.uri}/${this.domain}`;
    return this.http
      .get<User[]>(uri, {params: {'email': username, 'password': password}})
      .map(users => {
        if (users.length === 0) {
          throw 'username or password not match';
        }
        return {
          token: this.token,
          user: users[0]
        };
      });
  }
}
