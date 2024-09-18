import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private api = "http://localhost:8080/"

  constructor( private http : HttpClient) {}

  //Metodo para logearse validadndo con el backend
  async login(email:string, password:string):Promise<any>{
    const url = `${this.api}/auth/login`;
    try{
      const response = this.http.post<any>(url, {email, password}).toPromise()
      return response;
    }catch(error){
      throw error;
    }
  }

  //Metodo para Registrar un usuario
  async register(UserData:any, token:string):Promise<any>{
    const url = `${this.api}/auth/register`;
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    })
    try{
      const response = this.http.post<any>(url, UserData, {headers}).toPromise()
      return response;
    }catch(error){
      throw error;
    }
  }

  //Metodo para traer todos los usuarios
  async getAllUsers(token:string):Promise<any>{
    const url = `${this.api}/admin/get-all-users`;
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    })
    try{
      const response = this.http.get<any>(url, {headers}).toPromise()
      return response;
    }catch(error){
      throw error;
    }
  }

  //Metodo para traer usuario por Id
  async getUsersById(userId: string, token:string):Promise<any>{
    const url = `${this.api}/admin/get-users/${userId}`;
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    })
    try{
      const response = this.http.get<any>(url, {headers}).toPromise()
      return response;
    }catch(error){
      throw error;
    }
  }

  //Metodo para eliminar un usuario
  async deleteUser(userId: string, token:string):Promise<any>{
    const url = `${this.api}/admin/delete/${userId}`;
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    })
    try{
      const response = this.http.delete<any>(url, {headers}).toPromise()
      return response;
    }catch(error){
      throw error;
    }
  }

  //Metodo para actualizar un usuario
  async updateUser(userId: string,userData:any, token:string):Promise<any>{
    const url = `${this.api}/admin/uodate/${userId}`;
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    })
    try{
      const response = this.http.put<any>(url, userData, {headers}).toPromise()
      return response;
    }catch(error){
      throw error;
    }
  }

  //METODOS DE AUTENTICACION
  logOut(): void{
    if(typeof localStorage !== 'undefined'){
      localStorage.removeItem('token')
      localStorage.removeItem('role')
    }
  }

  isAuthenticated(): boolean{
    if(typeof localStorage !== 'undefined'){
      const token = localStorage.getItem('token');
      return !!token;
    }
    return false;
  }

  isAdmin(): boolean{
    if(typeof localStorage !== 'undefined'){
      const role = localStorage.getItem('role');
      return role == "ADMIN";
    }
    return false;
  }

  isUser(): boolean{
    if(typeof localStorage !== 'undefined'){
      const role = localStorage.getItem('role');
      return role == "USER";
    }
    return false;
  }
}
