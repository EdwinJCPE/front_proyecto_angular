import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoriaService } from './services/categoria.service';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { authInterceptor } from './interceptors/auth.interceptor';
import { ProductoService } from './services/producto.service';



@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers: [
    CategoriaService, ProductoService
    // provideHttpClient(withInterceptors([authInterceptor]))
  ]
})
export class CoreModule { }
