import {PriceProfile} from "../price/PriceProfile";

export class TypeOfServiceView {
  id: number = 0;
  name: string = "";
  prices: PriceProfile[] = [];
  imageCount: number = 0;
}
