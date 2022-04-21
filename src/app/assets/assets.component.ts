import { Component, OnInit } from '@angular/core';
import { assetlist } from '../asset';
import { PriceService } from '../price.service';

@Component({
  selector: 'app-assets',
  templateUrl: './assets.component.html',
  styleUrls: ['./assets.component.css'],
})
export class AssetsComponent implements OnInit {
  constructor(private priceService: PriceService) {}
  assets = assetlist;
  currencylist = ['usd', 'huf'];
  serviceresult: any = null;
  ngOnInit(): void {
    const ids = this.assets.map((a) => a.id).join();
    const currencies = this.currencylist.join();
    console.log('ids:' + ids + 'currencies:' + currencies);
    this.priceService.getPrice(ids, currencies).subscribe((a) => {
      this.serviceresult = a;
      console.log('bitcoin huf:' + this.serviceresult['bitcoin']['huf']);
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
