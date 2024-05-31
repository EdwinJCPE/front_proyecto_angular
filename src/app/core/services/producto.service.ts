import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {
  urlBase: string = "https://lv.blumbit.net/back/public/api"

  constructor(private http: HttpClient) { }

  listarProductos() {
    // return this.http.get(this.urlBase + "/producto");
    return this.http.get(`${this.urlBase}/producto`)
  }
}
