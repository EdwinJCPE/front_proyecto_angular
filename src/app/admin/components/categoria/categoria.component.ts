import { Component } from '@angular/core';
import { CategoriaService } from '../../../core/services/categoria.service';
import { Categoria } from '../../../core/interfaces/categoria';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-categoria',
  templateUrl: './categoria.component.html',
  styleUrl: './categoria.component.scss'
})
export class CategoriaComponent {

  categorias: any[] = []
  categoria: any = {}
  visible: boolean = false;

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
          this.visible = false
          this.funGetCategorias();
        },
        (error) => {
          console.log(error)
        }
      );
    } else {
      this.categoriaService.guardarCategoria(this.categoria).subscribe(
        (res: any) => {
          console.log(res)
          this.visible = false
          this.funGetCategorias();
        },
        (error) => {
          console.log(error)
        }
      )
    }

    // this.visible = false
    this.categoria = {};
  }

  funEditarCategoria(cat: any) {
    this.categoria = cat;
  }

  funEliminarCategoria(cat: any) {
    // if (confirm("¿Esta seguro de eliminar la categoria?")) {
    //   this.categoriaService.eliminarCategoria(cat.id).subscribe(
    //     (res: any) => {
    //       this.funGetCategorias();
    //     },
    //     (error) => {
    //       console.log(error)
    //     }
    //   )
    // }

    Swal.fire({
      title: "¿Esta seguro que desea eliminar la categoria?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Si",
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        this.categoriaService.eliminarCategoria(cat.id).subscribe(
          (res: any) => {
            this.funGetCategorias();
          },
          (error) => {
            console.log(error)
          }
        )

      } else if (result.isDenied) {
      }
    });
  }

  newOpenDialog() {
    this.categoria = {};
    this.visible = true;
  }

  editOpenDialog(data: any) {
    // this.categoria = cat;
    let misdatos = data;
    const { id, nombre, detalle } = misdatos;
    this.categoria = {
      id,
      nombre,
      detalle
    }
    this.visible = true;
  }
}
