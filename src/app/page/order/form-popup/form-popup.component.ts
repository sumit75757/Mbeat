import { Component, Inject, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { OrderComponent } from '../order.component';

@Component({
  selector: 'app-form-popup',
  templateUrl: './form-popup.component.html',
  styleUrls: ['./form-popup.component.scss']
})
export class FormPopupComponent implements OnInit {  
    // selectReason = ['Pause current course','Quit course','Switch course'];
    isOpen = false
    constructor(
      private fb: FormBuilder,
      private dailog: MatDialog,
      @Inject(MAT_DIALOG_DATA) public data: any,
      private dialogRef: MatDialogRef<FormPopupComponent>,
    ) {
      
    }
    ngOnDestroy(): void {
    }
  
    ngOnInit(): void {
      
      
      }
    }
