import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { cgexample } from './coingeccoresult';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class PriceService {
  baseurl = 'https://api.coingecko.com/api/v3/simple/price';
  constructor(private http: HttpClient) {}

  getPrice(ids: string, currencies: string): Observable<any> {
    const url = `${this.baseurl}?ids=${ids}&vs_currencies=${currencies}`;
    console.log('url:' + url);
    return this.http.get(url);
  }
}
