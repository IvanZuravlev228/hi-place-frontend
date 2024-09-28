import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-warning-module',
  templateUrl: './warning-module.component.html',
  styleUrls: ['./warning-module.component.css']
})
export class WarningModuleComponent {
  constructor(
    public dialogRef: MatDialogRef<WarningModuleComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { title: string, message: string }
  ) {}

  close(): void {
    this.dialogRef.close();
  }
}
