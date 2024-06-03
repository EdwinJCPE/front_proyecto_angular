import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoriaService } from './services/categoria.service';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { authInterceptor } from './interceptors/auth.interceptor';
import { ProductoService } from './services/producto.service';
import { AuthService } from './services/auth.service';
import { CategoryService } from './services/category.service';

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers: [
    CategoriaService, CategoryService, ProductoService, AuthService
    // provideHttpClient(withInterceptors([authInterceptor]))
  ]
})
export class CoreModule { }
