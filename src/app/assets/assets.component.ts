import { Component, OnInit } from '@angular/core';
import { assetlist } from '../asset';
import { HistoryService } from '../history.service';
import { PriceService } from '../price.service';
import { Record } from '../record';

@Component({
  selector: 'app-assets',
  templateUrl: './assets.component.html',
  styleUrls: ['./assets.component.css'],
})
export class AssetsComponent implements OnInit {
  constructor(
    private priceService: PriceService,
    private historyservice: HistoryService
  ) {}
  assets = assetlist;
  currencylist = ['usd', 'huf'];
  serviceresult: any = null;

  records: Record[] = [];
  ngOnInit(): void {
    this.load();
  }

  load() {
    this.records = this.historyservice.load();
  }

  refresh() {
    const ids = this.assets.map((a) => a.id).join();
    const currencies = this.currencylist.join();
    console.log('ids:' + ids + 'currencies:' + currencies);
    this.priceService.getPrice(ids, currencies).subscribe((a) => {
      this.serviceresult = a;
      console.log('bitcoin huf:' + this.serviceresult['bitcoin']['huf']);
      this.savePriceServiceResult(a);
      this.records = this.historyservice.load();
    });
  }

  savePriceServiceResult(serviceresult: any) {
    this.historyservice.add({
      assetlist: this.assets,
      currencylist: this.currencylist,
      date: new Date(),
      serviceresult,
    });
  }
}
