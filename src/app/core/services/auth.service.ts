import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  urlBase: string = "https://lv.blumbit.net/back/public/api"
  // urlBase: string = environment.apiUrl;

  constructor(private http: HttpClient) { }

  // login(credenciales: any) {
  //   return this.http.post(`${this.urlBase}/v1/auth/login`, credenciales);
  // }

  login(formValue: any): Observable<any> {
    return this.http.post<any>(`${this.urlBase}/v1/auth/login`, formValue);
  }

  // perfil() {
  //   return this.http.get(`${this.urlBase}/v1/auth/profile`);
  // }

  perfil(): Observable<any> {
    return this.http.get<any>(`${this.urlBase}/v1/auth/profile`);
  }

  // logout(): Observable<any> {
  //   return this.http.get<any>(`${this.urlBase}/v1/auth/logout`);
  // }
}
