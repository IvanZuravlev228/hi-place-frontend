import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {EmailService} from "../../services/email.service";

@Component({
  selector: 'app-confirm-email',
  templateUrl: './confirm-email.component.html',
  styleUrls: ['./confirm-email.component.css']
})
export class ConfirmEmailComponent implements OnInit{
  successVerified: boolean = true;

  constructor(private route: ActivatedRoute,
              private emailService: EmailService) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      const token = params['token'];
      if (token) {
        this.emailService.confirmEmail(token).subscribe({
          next: () => {
            this.successVerified = true;
          },
          error: (error) => {
            this.successVerified = false;
            console.log(error);
          }
        });
      }
    });
  }
}
