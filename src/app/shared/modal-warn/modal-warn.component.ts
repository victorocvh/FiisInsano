import { Component, Inject, Input, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-modal-warn',
  templateUrl: './modal-warn.component.html',
  styleUrls: ['./modal-warn.component.css']
})
export class ModalWarnComponent implements OnInit {

  @Input() text: string = '';
  @Input() title: string = '';
  @Input() button: string = '';

  constructor(@Inject(MAT_DIALOG_DATA)private data:any,
  private dialog: MatDialogRef<ModalWarnComponent>) { }

  ngOnInit(): void {
    if (this.data.title) {
      this.title = this.data.title;
    }

    if (this.data.text) {
      this.text = this.data.text;
    }

    if (this.data.button) {
      this.button = this.data.button;
    }
  }

  close() {
    this.dialog.close();
  }

}
