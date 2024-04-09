import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { Component, OnInit, ViewChild } from '@angular/core';
import { User } from '../../models/user';
import { UserService } from '../../services/user.service';
import { Observable, subscribeOn } from 'rxjs';
import { Router } from '@angular/router';
import { MatSidenav } from '@angular/material/sidenav';
import { Direction } from '@angular/cdk/bidi';

const SMALL_WIDTH_BREAKPOINT = 720;

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrl: './sidenav.component.scss'
})
export class SidenavComponent implements OnInit{

  @ViewChild('sidenav') sidenav!: MatSidenav
  isScreenSmall! : boolean
  isDarkTheme: boolean = false;
  direction: Direction = 'ltr'
  toggleSidenav!: boolean
  users!: Observable<User[]>;

  constructor(private breakpointObserver: BreakpointObserver,
     private userService: UserService, private router: Router) {}


  ngOnInit(): void {
    this.breakpointObserver.observe([`(max-width: ${SMALL_WIDTH_BREAKPOINT}px)`])
      .subscribe((state: BreakpointState) => { this.isScreenSmall = state.matches })

      this.userService.loadAll();
      this.users = this.userService.getUsers();

      //when i go to a new route from sidenav, i must do this
      this.router.events.subscribe(() => {
        if(this.isScreenSmall) {
          this.sidenav.close();
        }
      })
  }

  toggleDir() {
      this.direction = this.direction === 'ltr' ? 'rtl' : 'ltr';
  }
}
