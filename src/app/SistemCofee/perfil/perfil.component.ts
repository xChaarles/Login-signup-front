import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { UsersService } from '../../Service/users.service';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  imports: [FormsModule, RouterModule, CommonModule],
  templateUrl: './perfil.component.html',
  styles: ``
})
export default class PerfilComponent implements OnInit{

  constructor (private readonly userService: UsersService,private readonly router: Router){

  }

  profileInfo: any;
  errorMessage: string = '';


  async ngOnInit(): Promise<void> {
    try {
      const token = localStorage.getItem('token')
      if(!token){
        throw new Error("No Token Found")
      }
      this.profileInfo = await this.userService.getYourProfile(token);
    } catch (error:any) {
      this.showError(error.message)
    }
  }

  updatePerfil(id : number){
    this.router.navigate(['SistemCofee/updateuser', id])
  }

  showError(mess: string) {
    this.errorMessage = mess;
    setTimeout(() => {
      this.errorMessage = ''
    }, 3000)
  }

}
