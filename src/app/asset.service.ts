import { Injectable } from '@angular/core';
import { Asset } from './asset';

@Injectable({
  providedIn: 'root',
})
export class AssetService {
  find(id: string): Asset | undefined {
    return this.load().find((a) => id === a.id);
  }
  constructor() {}
  save(list: Asset[]) {
    localStorage.setItem('assetlist', JSON.stringify(list));
  }
  load(): Asset[] {
    let result = localStorage.getItem('assetlist');
    if (typeof result === 'string') {
      return JSON.parse(result);
    } else {
      return [];
    }
  }
  add(record: Asset) {
    let records = this.load();
    let found = records.find((a) => a.id === record.id);
    if (found) {
      this.update(record);
    } else {
      records.push(record);
      this.save(records);
    }
  }
  update(record: Asset) {
    let records = this.load();
    let found = records.find((a) => a.id === record.id);
    if (found) {
      found.quantity = record.quantity;
    }
    this.save(records);
  }
  delete(record: Asset) {
    let records = this.load();
    let newrecords = records.filter((a) => a.id !== record.id);
    this.save(newrecords);
  }

  deleteAll() {
    this.save([]);
  }
}
