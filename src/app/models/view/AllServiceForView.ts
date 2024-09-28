import {MainTypeOfService} from "../typeService/MainTypeOfService";
import {TypeOfServiceView} from "./TypeOfServiceView";

export class AllServiceForView {
  mainTypes: MainTypeOfService = new MainTypeOfService();
  typesOfService: TypeOfServiceView[] = [];
}
