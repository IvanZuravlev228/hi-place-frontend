import { Component } from '@angular/core';
import {environment} from "../../../environment/environment";

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css', './footer.optimization.component.css']
})
export class FooterComponent {

  protected readonly environment = environment;
}
