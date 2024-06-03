import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  urlBase: string = "https://lv.blumbit.net/back/public/api"
  // urlBase: string = environment.apiUrl;

  constructor(private http: HttpClient) { }

  login(formValue: any) {
    // return this.http.post(`${this.urlBase}/v1/auth/login`, credenciales);
    return this.http.post<any>(`${this.urlBase}/v1/auth/login`, formValue);
  }

}
