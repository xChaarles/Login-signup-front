import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../Service/users.service';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, Validators } from '@angular/forms';
import { catchError, tap, throwError } from 'rxjs';

@Component({
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './singup.component.html',
  styles: ``
})
export default class SingupComponent implements OnInit {

  isAdmin: boolean = false;

  formData: any = {
    nombre: '',
    apellido: '',
    email:'',
    password: '',
    role: 'USER',
  };
  errorMessage: string = '';
  
  constructor(
    private readonly userService: UsersService,
    private readonly router: Router
  ) { }

  ngOnInit(): void {
    this.isAdmin = this.userService.isAdmin();
  }

  SingUpUser(){
    this.userService.SingUp(this.formData).pipe(
      tap(dato =>{
        console.log(dato)
        this.router.navigate(['SistemCofee/login'])
      }),
      catchError (error => {
        return throwError(() => new Error(error));
      })
    ).subscribe();
  }

  async handleSubmit() {

    // Comprueba que todos los campos no estén vacíos
    if (!this.formData.nombre ||!this.formData.apellido || !this.formData.email || !this.formData.password || !this.formData.role) {
      this.showError('Please fill in all fields.');
      return;
    }

    // Confirmar registro con usuario
    const confirmRegistration = confirm('¿Estás seguro de que deseas registrar a este usuario?');
    if (!confirmRegistration) {
      return;
    }

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No se encontró ningún token');
      }

      const response = await this.userService.register(this.formData, token);
      if (response.statusCode === 200) {
        this.router.navigate(['SistemCofee/userlist']);
      } else {
        this.showError(response.message);
      }
    } catch (error: any) {
      this.showError(error.message);
    }
  }

  showError(message: string) {
    this.errorMessage = message;
    setTimeout(() => {
      this.errorMessage = ''; // Borrar el mensaje de error después del tiempo especificado
    }, 3000);
  }
}
