import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { UsersService } from '../../Service/users.service';
import { CommonModule } from '@angular/common';

@Component({
  selector:'app-sidemenu',
  standalone: true,
  imports: [FormsModule, RouterModule, CommonModule],
  templateUrl: './sidemenu.component.html',
  styles: ``
})
export class SidemenuComponent implements OnInit {

  constructor(private readonly userService : UsersService){

  }

  isAuthenticated:boolean = false;
  isAdmin:boolean = false;
  isUser:boolean = false;

  ngOnInit(): void {
    this.isAuthenticated = this.userService.isAuthenticated();
    this.isAdmin = this.userService.isAdmin();
    this.isUser = this.userService.isUser();
  }

  logout(): void{
    this.userService.logOut();
    this.isAuthenticated = false;
    this.isAdmin = false;
    this.isUser = false;

  }
}
