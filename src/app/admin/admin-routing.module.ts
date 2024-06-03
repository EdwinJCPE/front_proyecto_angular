import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PerfilComponent } from './components/perfil/perfil.component';
import { CategoriaComponent } from './components/categoria/categoria.component';
import { ProductoComponent } from './components/producto/producto.component';
import { CategoryComponent } from './components/category/category.component';

const routes: Routes = [
  { path: 'perfil', component: PerfilComponent },
  { path: 'categoria', component: CategoriaComponent },
  { path: 'category', component: CategoryComponent },
  { path: 'producto', component: ProductoComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
