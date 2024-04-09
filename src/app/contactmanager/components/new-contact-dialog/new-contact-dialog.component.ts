import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { User } from '../../models/user';
import { FormControl, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-new-contact-dialog',
  templateUrl: './new-contact-dialog.component.html',
  styleUrl: './new-contact-dialog.component.scss'
})
export class NewContactDialogComponent {
    user: User;
    avatars = ['svg-1','svg-2','svg-3','svg-4']

    name = new FormControl('', Validators.required);

    constructor(private dialogRef: MatDialogRef<NewContactDialogComponent>, 
      private userService: UserService) {
      this.user = new User();
    }

    save() {
        this.user.name = this.name.value!;
        this.user.notes = [];
        this.userService.addUser(this.user).then(data => {
          this.dialogRef.close(data)
        })
    }

    dismiss() {
        this.dialogRef.close(null);
    }

    getErrorMessage() {
      return this.name.hasError('required')? 'Enter a valid name' : ''
    }
}
