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

  // listarProductos() {
  listarProductos(page: number, limit: number, q: string) {
    // return this.http.get(this.urlBase + "/producto");
    // return this.http.get(`${this.urlBase}/producto`)
    return this.http.get(`${this.urlBase}/producto?page=${page}&limit=${limit}&q=${q}`)
  }

  // actualizaImagen(id: number, formData: any) {
  actualizaImagen(id: number, formData: FormData) {
    return this.http.post(`${this.urlBase}/producto/${id}/carga-imagen`, formData);
  }
}
