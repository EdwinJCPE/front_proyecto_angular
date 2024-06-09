import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { PerfilComponent } from './components/perfil/perfil.component';
import { CategoriaComponent } from './components/categoria/categoria.component';
import { HttpClientModule } from '@angular/common/http';
import { CoreModule } from '../core/core.module';
import { FormsModule } from '@angular/forms';
import { ProductoComponent } from './components/producto/producto.component';
import { CategoryComponent } from './components/category/category.component';
import { AppLayoutModule } from '../layout/app.layout.module';
import { PrimeModule } from '../prime/prime.module';
// import { TableModule } from 'primeng/table';
// import { ButtonModule } from 'primeng/button';

@NgModule({
  declarations: [
    PerfilComponent,
    CategoriaComponent,
    CategoryComponent,
    ProductoComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    HttpClientModule,
    CoreModule,
    FormsModule,
    AppLayoutModule,

    // TableModule,
    // ButtonModule
    PrimeModule
  ]
})
export class AdminModule { }
