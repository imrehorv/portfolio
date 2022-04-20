import { Component, OnInit } from '@angular/core';
import { assetlist } from '../asset';
import { cgexample } from '../coingeccoresult';
import { PriceService } from '../price.service';

@Component({
  selector: 'app-assets',
  templateUrl: './assets.component.html',
  styleUrls: ['./assets.component.css'],
})
export class AssetsComponent implements OnInit {
  constructor(private priceService: PriceService) {}
  assets = assetlist;
  example = cgexample;
  priceresult: any;
  ngOnInit(): void {
    const ids = this.assets.map((a) => a.id).join();
    const currencies = 'usd,huf';
    console.log('ids:' + ids);
    this.priceService.getPrice(ids, currencies).subscribe((a) => {
      this.priceresult = a;
      console.log('bitcoin huf:' + this.priceresult['bitcoin']['huf']);
      this.assets.forEach((a) => {
        a.priceusd = this.priceresult[a.id]['usd'];
        a.pricehuf = this.priceresult[a.id]['huf'];
      });
    });
  }
  totalusd(): number {
    return this.assets
      .map((a) => a.quantity * a.priceusd)
      .reduce((previousValue, currentValue) => previousValue + currentValue);
  }
  totalhuf(): number {
    return this.assets
      .map((a) => a.quantity * a.pricehuf)
      .reduce((previousValue, currentValue) => previousValue + currentValue);
  }
}
