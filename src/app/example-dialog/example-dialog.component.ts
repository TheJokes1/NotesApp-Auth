import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import { Categories } from '../Categories'

@Component({
  selector: 'app-example-dialog',
  templateUrl: './example-dialog.component.html',
  styleUrls: ['./example-dialog.component.css']
})

export class ExampleDialogComponent implements OnInit {
  public category: string;
  categories: any = Categories.categories;

  constructor(public dia: MatDialogRef<ExampleDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ExampleDialogComponent) {
      console.log('in constructor data: ', data.category)
      this.category= data.category;
    }

  ngOnInit() {
    console.log('categorien zijn:', this.categories);
  }

    onNoClick(): void {
      console.log("closed");
      this.dia.close('');
    }

}

