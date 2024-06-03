import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Category } from '../interfaces/category';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  urlBase: string = environment.apiUrl;

  constructor(private http: HttpClient) { }

  public getAllCategory(): Observable<Category[]> {
    return this.http.get<Category[]>(`${this.urlBase}/categoria`);
  }

  public createCategory(category: Category): Observable<Category> {
    return this.http.post<Category>(`${this.urlBase}/categoria`, category);
  }

  public getCategory(id: number): Observable<Category> {
    return this.http.get<Category>(`${this.urlBase}/categoria/${id}`);
  }

  public updateCategory(id: number, category: Category): Observable<Category> {
    return this.http.put<Category>(`${this.urlBase}/categoria/${id}`, category);
  }

  // public deleteCategory(id: number): Observable<Category> {
  //   return this.http.delete<Category>(`${this.urlBase}/categoria/${id}`);
  // }

  public deleteCategory(id: number): Observable<void> {
    return this.http.delete<void>(`${this.urlBase}/categoria/${id}`);
  }
}
