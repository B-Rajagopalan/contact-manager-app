import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NewContactDialogComponent } from '../new-contact-dialog/new-contact-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrl: './toolbar.component.scss'
})
export class ToolbarComponent {
    @Input() isDarkTheme: boolean = false;
    @Output() toggleSidenav = new EventEmitter();
    @Output() toggleTheme = new EventEmitter();
    @Output() toggleDir = new EventEmitter();

    constructor(private dialog: MatDialog, private snackBar: MatSnackBar,
                private router: Router) {}

    openDialog() {
      let dialogRef = this.dialog.open(NewContactDialogComponent, {
        width: '450px',
        panelClass: this.isDarkTheme?'dark-theme' : ''
    })

    dialogRef.afterClosed().subscribe(user => {
        if(user) {
          this.snackBar.open('Contact added', 'Navigate',{duration:5000})
            .onAction().subscribe(() => {
               this.router.navigate(['\contactmanager',user.id])
            })
        }
    })
  }
}
