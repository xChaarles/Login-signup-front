import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../Service/users.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './updateuser.component.html',
  styles: ``
})
export default class UpdateuserComponent implements OnInit {

  userId: any;
  userData: any = {};
  errorMessage: string = '';

  constructor(private userService: UsersService, private router : Router, private route: ActivatedRoute){}

  ngOnInit(): void {
    this.getUserById();
  }

  async getUserById(){
    this.userId = this.route.snapshot.paramMap.get('id')
    const token = localStorage.getItem('token')
    if(!this.userId || !token){
        this.showError("User ID or TOken is Required")
        return;
    }

    try {
      let userDataResponse = await this.userService.getUsersById(this.userId, token)
      const {nombre, apellido, email, role} = userDataResponse.users
      this.userData = {nombre, apellido, email, role};
      
    } catch (error:any) {
      this.showError(error.message);
    }
}

async updateUser(){
  const confitm = confirm("Are you sure you wanna update this user")
  if(!confirm) return
  try{
    const token = localStorage.getItem('token')
    if(!token){
      throw new Error("Token not found")
    }
    const res = await this.userService.updateUser(this.userId, this.userData, token);
    console.log(res)

    if(res.statusCode === 200){
      this.router.navigate(['SistemCofee/userlist'])
    }else{
      this.showError(res.message)
    }

  }catch(error:any){
    this.showError(error.message)
  }

}


showError(mess: string) {
  this.errorMessage = mess;
  setTimeout(() => {
    this.errorMessage = ''
  }, 3000)
}
}
