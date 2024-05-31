import { Component } from '@angular/core';
import { ProductoService } from '../../../core/services/producto.service';
import { CategoriaService } from '../../../core/services/categoria.service';

@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrl: './producto.component.scss'
})
export class ProductoComponent {
  productos: any[] = [];
  // productoService2 = inject(ProductoService)
  // categoriaService2 = inject(CategoriaService)

  constructor(private productoService: ProductoService, private categoriaService: CategoriaService) {
    this.getProductos()
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

}
