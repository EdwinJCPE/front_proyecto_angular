import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {

  // http2 = inject(HttpClient)

  urlBase: string = "https://lv.blumbit.net/back/public/api"

  constructor(private http: HttpClient) { }

  listarCategoria() {
    // return this.http.get(this.urlBase + "/categoria")
    return this.http.get(`${this.urlBase}/categoria`, {headers: {'Authorization': 'Bearer 220|XtUKvntXAZIC0PuddmWcsPUpQM5IJZ9ODMxbigMdc9e922cb'}})
  }

  guardarCategoria(datos: any) {
    return this.http.post(`${this.urlBase}/categoria`, datos, {headers: {'Authorization': 'Bearer 220|XtUKvntXAZIC0PuddmWcsPUpQM5IJZ9ODMxbigMdc9e922cb'}})
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
