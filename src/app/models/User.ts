import {UserServiceImagesResponse} from "./UserServiceImagesResponse";

export class User {
  id: number = 0;
  name: string = "";
  email: string = "";
  logoURL: string = "";
  experience: number = 0;
  phone: string = "";
  hiddenPhone: string = "";
  tiktokLink: string = "";
  instagramLink: string = "";
  telegramLink: string = "";
  viberLink: string = "";
  homeVisit: boolean = false;
  onlineCounseling: boolean = false;
  atSalon: boolean = false;
  discountWithPromo: number = 0;
  type: string = "";
  avg: number = 0;
  examples: UserServiceImagesResponse[] = [];
}
