import { Component, Input, OnInit } from '@angular/core';
import { Asset } from '../asset';

@Component({
  selector: 'app-snapshot',
  templateUrl: './snapshot.component.html',
  styleUrls: ['./snapshot.component.css'],
})
export class SnapshotComponent implements OnInit {
  @Input()
  assets: Asset[] = [];
  @Input() currencylist: string[] = [];

  @Input() serviceresult: any = null;
  @Input() date: Date = new Date();
  displayedColumns: string[] = ['id', 'quantity'];

  constructor() {}

  ngOnInit(): void {
    this.currencylist.forEach((element) => {
      this.displayedColumns.push(element);
    });
  }

  getPrice(assetid: string, quantity: number, currency: string) {
    if (this.serviceresult === null) {
      return 0;
    }
    return this.serviceresult[assetid][currency] * quantity;
  }
  total(currency: string): number {
    if (this.serviceresult === null) {
      return 0;
    }
    return this.assets
      .map((a) => this.getPrice(a.id, a.quantity, currency))
      .reduce((previousValue, currentValue) => previousValue + currentValue);
  }
}
