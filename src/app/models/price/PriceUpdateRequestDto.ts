export interface PriceUpdateRequestDto {
  prevPriceId: number;
  serviceItemId: number;
  userId: number;
  price: number;
  timeUnit: string;
}
