import { Component, OnInit, inject } from '@angular/core';
import { Category } from '../../../core/interfaces/category';
import { CategoryService } from '../../../core/services/category.service';
import { catchError, forkJoin, of, tap } from 'rxjs';
import Swal from 'sweetalert2';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrl: './category.component.scss',
  // providers: [ // Ya se ha importado en el prime.module.ts
  //   MessageService
  // ]
})
export class CategoryComponent implements OnInit {
  categories: Category[] = [];
  category: Category = {} as Category; // Inicializar la interfaz
  visible: boolean = false;
  selectedCategories: Category[] = [];
  deleteCategoriesDialog: boolean = false;

  categoryService = inject(CategoryService)
  messageService = inject(MessageService)
  // constructor(private categoryService: CategoryService, private messageService: MessageService) { }
  constructor() {
  }

  ngOnInit(): void {
    this.fnGetAllCategory();
  }

  fnGetAllCategory(): void {
    this.categoryService.getAllCategory().subscribe(
      (res: Category[]) => {
        this.categories = res;
      }, (error) => {
        console.log(error);
    });
  }

  fnSaveCategory(): void {
    const saveObservable = this.category.id ? this.categoryService.updateCategory(this.category.id, this.category) : this.categoryService.createCategory(this.category);

    saveObservable
      .pipe(
        tap((res: Category) => {
          this.category = res;
          console.log(this.category);
          this.fnGetAllCategory();
        }),
        catchError(error => {
          console.error(error);

          Swal.fire({
            icon: "error",
            title: "Ups...",
            text: error.error.message, //, "Something went wrong!",
            // footer: '<a href="#">Why do I have this issue?</a>'
          });
          return of(null);
        })
      ).subscribe();

    this.visible = false;
    this.category = {} as Category;
  }

  fnEditCategory(category: Category): void {
    this.category = { ...category };
  }

  fnDeleteCategory(category: Category): void {
    // if (confirm("¿Está seguro de eliminar la categoría?")) {
    //   this.categoryService.deleteCategory(category.id)
    //     .pipe(
    //       tap(() => this.fnGetAllCategory()),
    //       catchError(error => {
    //         console.error(error);
    //         // Retorna un observable que emite `null` y se completa
    //         return of(null);
    //       })
    //     ).subscribe();
    // }

    Swal.fire({
      title: `¿Esta seguro que desea eliminar la categoria con ID: ${category.id}?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Si",
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        this.categoryService.deleteCategory(category.id).subscribe(
          (res: any) => {
            this.fnGetAllCategory();
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
    this.category = {} as Category;
    this.visible = true;
  }

  editOpenDialog(category: Category) {
    this.category = { ...category };
    this.visible = true;
  }

  deleteSelectedCategories() {
    this.deleteCategoriesDialog = true;
  }

  confirmDeleteSelected() {
    this.deleteCategoriesDialog = false;

    if (this.selectedCategories.length === 0) {
      return;
    }

    // // 1ERA FORMA
    // //this.categories = this.categories.filter(val => !this.selectedCategories.includes(val));
    // this.categories = this.categories.filter(cat => {
    //   if (this.selectedCategories.includes(cat)) {
    //     // console.log('Eliminar: ',cat.id, ' - ' ,cat.nombre);
    //     this.categoryService.deleteCategory(cat.id).subscribe(
    //       (res: any) => {

    //       },
    //       (error) => {
    //         console.log(error)
    //       }
    //     )
    //   }
    //   return !this.selectedCategories.includes(cat)
    // });

    // this.selectedCategories = [];
    // this.fnGetAllCategory();
    // this.messageService.add({ severity: 'success', summary: 'Éxito', detail: 'Categorias Eliminadas', life: 3000 });

    // 2DA FORMA
    const deleteObservables = this.selectedCategories.map(cat => {
      console.log('Eliminar: ', cat.id, ' - ', cat.nombre);
      return this.categoryService.deleteCategory(cat.id).pipe(
        catchError(error => {
          console.log(`Error al eliminar la categoría con id ${cat.id}:`, error);
          // Retorna un observable que emite `null` para continuar con las eliminaciones restantes
          return of(null);
        })
      );
    });

    forkJoin(deleteObservables).subscribe({
      next: () => {
        // Filtra las categorías eliminadas de la lista
        this.categories = this.categories.filter(cat => !this.selectedCategories.includes(cat));
        // Limpia la selección después de la eliminación
        this.selectedCategories = [];
        // Recarga las categorías del servidor
        this.fnGetAllCategory();
        this.messageService.add({ severity: 'success', summary: 'Éxito', detail: 'Categorias Eliminadas', life: 3000 });
      },
      error: (error) => {
        console.log('Error en el proceso de eliminación:', error);
      }
    });
  }
}
