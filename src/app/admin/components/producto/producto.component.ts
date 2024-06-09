import { Component, OnInit } from '@angular/core';
import { ProductoService } from '../../../core/services/producto.service';
import { CategoriaService } from '../../../core/services/categoria.service';
import { Categoria } from '../../../core/interfaces/categoria';

@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrl: './producto.component.scss'
})
// export class ProductoComponent {
export class ProductoComponent implements OnInit {
  productos: any[] = [];
  categorias: any[] = [];
  categoriaSeleccionada: number = -1;

  // productoService2 = inject(ProductoService)
  // categoriaService2 = inject(CategoriaService)

  constructor(private productoService: ProductoService, private categoriaService: CategoriaService) {
    // this.getProductos()
    }
    ngOnInit(): void {
      this.getProductos()
      this.getCategorias()
  }

  getProductos() {
    this.productoService.listarProductos().subscribe(
      (res: any) => {
        console.log(res)
        this.productos = res.data;
      },
      (error) => {
        console.log(error)
      }
    );
  }

  getCategorias() {
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

  funObtenerLosProductos(): void {
    console.log(this.categoriaSeleccionada);
    this.categoriaService.mostrarCategoria(this.categoriaSeleccionada).subscribe(
      (res: any) => {
        this.productos = res.productos;
        console.log(this.categorias)
      },
      (error) => {
        console.log(error)
      }
    );
  }

}
