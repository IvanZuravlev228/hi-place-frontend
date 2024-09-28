export interface PriceCreateRequestDto {
  serviceItemId: number;
  userId: number;
  price: number;
  timeUnit: string;
}
