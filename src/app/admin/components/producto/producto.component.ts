import { Component, OnInit, inject } from '@angular/core';
import { ProductoService } from '../../../core/services/producto.service';
import { CategoriaService } from '../../../core/services/categoria.service';
import { Categoria } from '../../../core/interfaces/categoria';
// import { Product } from '../../../core/interfaces/product';
import { ConfirmationService, LazyLoadEvent, MessageService } from 'primeng/api';
// import { TableLazyLoadEvent } from 'primeng/table';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable'

interface Producto {
  // id?: number;
  id: number;
  nombre: string;
  precio: number;
  descripcion: string;
  imagen: string;
  stock: number;
  categoria: Categoria;
}

interface UploadEvent {
  originalEvent: Event;
  files: File[];
}

@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrl: './producto.component.scss'
})
// export class ProductoComponent {
export class ProductoComponent implements OnInit {
  // productos: any[] = [];
  // producto: any = {};
  categorias: any[] = [];
  categoriaSeleccionada: number = -1;

  productoDialog: boolean = false;
  productos!: Producto[];
  producto!: Producto;
  selectedProductos!: Producto[] | null;
  submitted: boolean = false;

  // totalRecords!: number;
  totalRecords: number = 0;
  loading: boolean = false;

  imagenProductoDialog: boolean = false;
  uploadedFiles: any[] = [];
  filterProduct: string = '';

  // productoService = inject(ProductoService)
  // categoriaService = inject(CategoriaService)
  // messageService = inject(MessageService)
  // confirmationService = inject(ConfirmationService)

  // constructor() {
  // constructor(private productoService: ProductoService, private categoriaService: CategoriaService) {
  constructor(private productoService: ProductoService, private categoriaService: CategoriaService, private messageService: MessageService, private confirmationService: ConfirmationService) {
    // this.getProductos()
    }
    ngOnInit(): void {
      this.getProductos()
      this.getCategorias()
  }

  // getProductos(page: number, limit: number) {
  getProductos(page: number = 1, limit: number = 10, q: string = "") {
    this.loading = true;
    this.productoService.listarProductos(page, limit, q).subscribe(
      (res: any) => {
        console.log(res)
        this.productos = res.data;

        this.totalRecords = res.total;
        this.loading = false;
      },
      (error) => {
        console.log(error)
      }
    );
  }

  // loadProductos(event: LazyLoadEvent) {
  loadProductos(event: any) {
  // loadProductos(event: TableLazyLoadEvent) {
    console.log('event:', event)

    // let page = (event.first / event.rows) + 1;
    // this.getProductos(page, event.rows);

    if (event.first != null && event.rows != null) {
      let page = Math.floor(event.first / event.rows) + 1;

      this.getProductos(page, event.rows);

    } else {
      console.error('Invalid event data');
    }

    // setTimeout(() => {
    //     this.customerService.getCustomers({ lazyEvent: JSON.stringify(event) }).then((res) => {
    //         this.customers = res.customers;
    //         this.totalRecords = res.totalRecords;
    //         this.loading = false;
    //     });
    // }, 1000);
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

  openNew() {
    // this.producto = {descripcion: "", imagen: "", nombre: "", precio: 0, stock: 0};
    this.producto = {} as Producto;
    this.submitted = false;
    this.productoDialog = true;
  }

  deleteSelectedProductos() {
    console.log("deleteSelectedProductos");
    this.confirmationService.confirm({
        message: 'Are you sure you want to delete the selected products?',
        header: 'Confirm',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
            this.productos = this.productos.filter((val) => !this.selectedProductos?.includes(val));
            this.selectedProductos = null;
            this.messageService.add({ severity: 'success', summary: 'Éxito', detail: 'Products Deleted', life: 3000 });
        }
    });
}

  editProduct(producto: Producto) {
    this.producto = { ...producto };
    this.productoDialog = true;
  }

  deleteProduct(producto: Producto) {
    this.confirmationService.confirm({
        message: 'Are you sure you want to delete ' + producto.nombre + '?',
        header: 'Confirm',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
            this.productos = this.productos.filter((val) => val.id !== producto.id);
            this.producto = {} as Producto;
            this.messageService.add({ severity: 'success', summary: 'Éxito', detail: 'Product Deleted', life: 3000 });
        }
    });
  }

  actualizaImagen(producto: Producto) {
    this.producto = {...producto };
    this.imagenProductoDialog = true;
  }

  subirImagen(event: any) {
    console.log(event);
    // this.uploadedFiles = event.files;

    let formData = new FormData()
    formData.append('imagen', event.files[0]);
    this.productoService.actualizaImagen(this.producto.id, formData).subscribe(
      (res: any) => {
        console.log(res)
        // this.producto.imagen = res.imagen;
        this.imagenProductoDialog = false;
        this.producto = {} as Producto;
        this.uploadedFiles = [];
        this.messageService.add({ severity:'success', summary: 'Éxito', detail: 'Imagen Subida', life: 3000 });
        this.getProductos();
      },
      (error) => {
        console.log(error)
      }
    );

  }

  exportarPdf() {
    const doc = new jsPDF();

    const filas = this.productos.map(item => {
      return [item.id, item.nombre, item.precio, item.stock, item.categoria?.nombre]
    })

    console.log(filas);

    // const filas = this.productos.map(item => [item.id, item.nombre, item.precio, item.stock, item.categoria.nombre])

    autoTable(doc, {
      head: [['ID', 'Nombre', 'Precio', 'Stock', 'Categoría']],
      body: filas
    })

    doc.save('a4.pdf')
  }

  // buscar() {
  //   this.getProductos(1, 10, this.filterProduct)
  // }

  // buscar(event: KeyboardEvent) {
  //   if (event.key === 'Enter') {
  //     this.getProductos(1, 10, this.filterProduct)
  //   }
  // }

  onEnter() {
    if (this.filterProduct.length > 3) {
      this.getProductos(1, 10, this.filterProduct)
    }
  }
}
