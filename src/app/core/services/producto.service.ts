import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {
  // urlBase: string = "https://lv.blumbit.net/back/public/api"
  urlBase: string = environment.apiUrl;

  constructor(private http: HttpClient) { }

  listarProductos() {
    // return this.http.get(this.urlBase + "/producto");
    return this.http.get(`${this.urlBase}/producto`)
  }
}
