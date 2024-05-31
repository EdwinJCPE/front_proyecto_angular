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
    );
  }

  funGuardarCategoria() {
    if (this.categoria.id) { // Id debe tener un dato para editar categoria
      this.categoriaService.modificarCategoria(this.categoria.id, this.categoria).subscribe(
        (res: any) => {
          this.categorias = res;
          console.log(this.categorias)
        },
        (error) => {
          console.log(error)
        }
      );
    } else {
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

    this.categoria = {};
  }

  funEditarCategoria(cat: any) {
    this.categoria = cat;
  }

  funEliminarCategoria(cat: any) {
    if (confirm("¿Esta seguro de eliminar la categoria?")) {
      this.categoriaService.eliminarCategoria(cat.id).subscribe(
        (res: any) => {
          this.funGetCategorias();
        },
        (error) => {
          console.log(error)
        }
      )
    }
  }
}
