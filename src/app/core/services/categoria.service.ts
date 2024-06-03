import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {

  // http2 = inject(HttpClient)
  // urlBase: string = "https://lv.blumbit.net/back/public/api";
  urlBase: string = environment.apiUrl;

  // headers: HttpHeaders = new HttpHeaders({
  //   'Content-Type': 'application/json',
  //   'Authorization': 'Bearer 223|eSYA37PqbO1w0C5eRxDZwOwM7lK8oiaY8pns7j4j95bed293',
  //   'Accept': 'application/json',
  // });

  constructor(private http: HttpClient) { }

  listarCategoria() {
    // return this.http.get(this.urlBase + "/categoria")

    // const headers = new HttpHeaders({
    //   'Content-Type': 'application/json',
    //   'Authorization': 'Bearer 223|eSYA37PqbO1w0C5eRxDZwOwM7lK8oiaY8pns7j4j95bed293',
    //   'Accept': 'application/json',
    // });
    // headers.set('Content-Type', 'application/json; charset=utf-8');

    // return this.http.get(`${this.urlBase}/categoria`, {headers: {'Authorization': 'Bearer 222|vkUoT8Q7KnnaMa84jKN4xmIie3QkYTsFd4wihukF6e236b21'}})
    // return this.http.get(`${this.urlBase}/categoria`, {headers: headers})
    // return this.http.get(`${this.urlBase}/categoria`, {headers: this.headers})
    return this.http.get(`${this.urlBase}/categoria`)
  }

  guardarCategoria(datos: any) {
    // return this.http.post(`${this.urlBase}/categoria`, datos, {headers: {'Authorization': 'Bearer 222|vkUoT8Q7KnnaMa84jKN4xmIie3QkYTsFd4wihukF6e236b21'}})
    return this.http.post(`${this.urlBase}/categoria`, datos)
  }

  mostrarCategoria(id: number) {
    return this.http.get(`${this.urlBase}/categoria/${id}`)
  }

  modificarCategoria(id: number, datos: any) {
    return this.http.put(`${this.urlBase}/categoria/${id}`, datos)
  }

  eliminarCategoria(id: number) {
    return this.http.delete(`${this.urlBase}/categoria/${id}`)
  }
}
