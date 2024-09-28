export interface PriceProfile {
  id: number;
  serviceItemId: number;
  serviceItemName: string;
  price: number;
  timeUnit: string;
  imageFile?: File;
}
