import { Component, OnInit } from '@angular/core';
import { MatChipInputEvent } from '@angular/material/chips';
import { Asset, assetlist } from '../asset';
import { AssetService } from '../asset.service';
import { HistoryService } from '../history.service';
import { PriceService } from '../price.service';
import { Record } from '../record';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { CurrencyService } from '../currency.service';

@Component({
  selector: 'app-assets',
  templateUrl: './assets.component.html',
  styleUrls: ['./assets.component.css'],
})
export class AssetsComponent implements OnInit {
  constructor(
    private priceService: PriceService,
    private historyservice: HistoryService,
    private assetService: AssetService,
    private currencyService: CurrencyService
  ) {}
  assets: Asset[] = [];
  currencylist = ['USD'];
  serviceresult: any = null;
  records: Record[] = [];
  addOnBlur = true;
  readonly separatorKeysCodes = [ENTER, COMMA] as const;
  ngOnInit(): void {
    this.load();
  }

  load() {
    this.currencylist = this.currencyService.load();
    this.assets = this.assetService.load();
    this.records = this.historyservice.load();
    this.records.sort((a, b) => {
      if (typeof a.date === 'string' && typeof b.date === 'string') {
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      }
      return 0;
    });
  }

  refresh() {
    if (this.assetsEmpty()) {
      return;
    }
    const ids = this.assets.map((a) => a.id).join();
    const currencies = this.currencylist.map((a) => a.toLowerCase()).join();
    console.log('ids:' + ids + 'currencies:' + currencies);
    this.priceService.getPrice(ids, currencies).subscribe((a) => {
      this.serviceresult = a;
      this.savePriceServiceResult(a);
      this.load();
    });
  }

  savePriceServiceResult(serviceresult: any) {
    this.historyservice.add({
      assetlist: this.assets,
      currencylist: this.currencylist.map((a) => a.toLowerCase()),
      date: new Date(),
      serviceresult,
    });
  }

  assetsEmpty() {
    return this.assets.length === 0;
  }

  addCurrency(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    if (value && value.length < 4) {
      const index = this.currencylist.indexOf(value);
      if (index < 0) {
        this.currencylist.push(value.toUpperCase());
        this.currencyService.save(this.currencylist);
      }
    }

    // Clear the input value
    event.chipInput!.clear();
  }

  removeCurrency(currency: string): void {
    if (this.currencylist.length < 2) {
      return;
    }
    const index = this.currencylist.indexOf(currency);

    if (index >= 0) {
      this.currencylist.splice(index, 1);
      this.currencyService.save(this.currencylist);
    }
  }
}
