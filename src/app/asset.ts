export interface Asset {
  id: string;
  quantity: number;
  priceusd: number;
  pricehuf: number;
}

export const assetlist: Asset[] = [
  { id: 'bitcoin', quantity: 0.02498844, priceusd: 0, pricehuf: 0 },
  { id: 'ethereum', quantity: 1.19000619, priceusd: 0, pricehuf: 0 },
  { id: 'cardano', quantity: 237.1285, priceusd: 0, pricehuf: 0 },
];
