import { Component, inject } from '@angular/core';
import { Category } from '../../../core/interfaces/category';
import { CategoryService } from '../../../core/services/category.service';
import { catchError, of, tap } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrl: './category.component.scss'
})
export class CategoryComponent {
  categories: Category[] = [];
  category: Category = {} as Category; // Inicializar la interfaz
  visible: boolean = false;

  categoryService = inject(CategoryService)
  // constructor(private categoryService: CategoryService) { }
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
}
