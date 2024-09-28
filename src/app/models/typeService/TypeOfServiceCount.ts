import {PriceProfile} from "../price/PriceProfile";

export interface TypeOfServiceCount {
  typeOfServiceId: number;
  typeOfServiceName: string;
  count: number;
  priceProfile: PriceProfile[];
  isOpen: boolean;
}
