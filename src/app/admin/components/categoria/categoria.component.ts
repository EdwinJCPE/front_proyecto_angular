import { Component } from '@angular/core';
import { CategoriaService } from '../../../core/services/categoria.service';
import { Categoria } from '../../../core/interfaces/categoria';

@Component({
  selector: 'app-categoria',
  templateUrl: './categoria.component.html',
  styleUrl: './categoria.component.scss'
})
export class CategoriaComponent {

  categorias: any[] = []
  categoria: any = {}

  constructor(private categoriaService: CategoriaService) {
    this.funGetCategorias();
  }

  funGetCategorias() {
    this.categoriaService.listarCategoria().subscribe(
      (res: any) => {
        this.categorias = res;
        console.log(this.categorias)
      },
      (error) => {
        console.log(error)
      }
    )
  }

  funGuardarCategoria() {
    this.categoriaService.guardarCategoria(this.categoria).subscribe(
      (res: any) => {
        console.log(res)
        this.funGetCategorias();
      },
      (error) => {
        console.log(error)
      }
    )
  }
}
