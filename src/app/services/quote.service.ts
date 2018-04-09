import {Inject, Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Quote} from '../domain/quote.model';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class QuoteService {

  constructor(private http: HttpClient, @Inject('BASE_CONFIG') private config) {
  }

  getQuote(): Observable<Quote> {
    const uri = `${this.config.uri}/quotes/${Math.floor(Math.random() * 6)}`
    // return this.http.get<Quote>(uri).debug('quote: ');
    return this.http.get<Quote>(uri);
  }
}
