import { Asset } from './asset';

export interface Record {
  assetlist: Asset[];
  currencylist: string[];
  serviceresult: any;
  date: Date;
}
