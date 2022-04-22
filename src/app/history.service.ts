import { Injectable } from '@angular/core';
import { Record } from './record';

@Injectable({
  providedIn: 'root',
})
export class HistoryService {
  constructor() {}
  save(list: Record[]) {
    localStorage.setItem('historylist', JSON.stringify(list));
  }
  load(): Record[] {
    let result = localStorage.getItem('historylist');
    if (typeof result === 'string') {
      return JSON.parse(result);
    } else {
      return [];
    }
  }
  add(record: Record) {
    let records = this.load();
    records.push(record);
    this.save(records);
  }
}
