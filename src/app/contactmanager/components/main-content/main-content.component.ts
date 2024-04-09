import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user';
import { UserService } from '../../services/user.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-main-content',
  templateUrl: './main-content.component.html',
  styleUrl: './main-content.component.scss'
})
export class MainContentComponent implements OnInit {
    user!: User | undefined;

    constructor(private userService: UserService,
      private route: ActivatedRoute
    ) {}

    ngOnInit() {
        this.route.paramMap.subscribe(params => {
          this.user = undefined;
          let id = +params.get('id')!
          this.userService.getUsers().subscribe(() =>{
            if(!id) id = 1;
            setTimeout(() => {
              this.user =  this.userService.getUserById(id) 
            },500)
          })
        })
    }
}
