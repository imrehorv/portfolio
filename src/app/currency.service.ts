import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CurrencyService {
  constructor() {}
  save(list: string[]) {
    localStorage.setItem('currencylist', JSON.stringify(list));
    console.log('after save:' + localStorage.getItem('currencylist'));
  }
  load(): string[] {
    let result = localStorage.getItem('currencylist');
    console.log('load:' + localStorage.getItem('currencylist'));
    if (typeof result === 'string') {
      return JSON.parse(result);
    } else {
      return ['USD'];
    }
  }
}
