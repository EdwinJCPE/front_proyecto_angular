import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { LayoutService } from './service/app.layout.service';

@Component({
    selector: 'app-menu',
    templateUrl: './app.menu.component.html'
})
export class AppMenuComponent implements OnInit {

    model: any[] = [];

    constructor(public layoutService: LayoutService) { }

    ngOnInit() {
        this.model = [
            {
                label: 'Administración',
                items: [
                    { label: 'Administrador', icon: 'pi pi-fw pi-home', routerLink: ['/admin'] },
                    { label: 'Perfil', icon: 'pi pi-fw pi-user', routerLink: ['/admin/perfil'] }
                ]
            },
            {
                label: 'Gestión',
                items: [
                    { label: 'Categoría', icon: 'pi pi-fw pi-id-card', routerLink: ['/admin/categoria'] },
                    { label: 'Category', icon: 'pi pi-fw pi-check-square', routerLink: ['/admin/category'] },
                    { label: 'Producto', icon: 'pi pi-fw pi-bookmark', routerLink: ['/admin/producto'] }
                ]
            },
            {
                label: 'Pedidos',
                items: [
                    { label: 'Pedidos', icon: 'pi pi-fw pi-eye', routerLink: ['/admin/pedido'], badge: 'NEW' },
                    { label: 'Nuevo Pedido', icon: 'pi pi-fw pi-globe', routerLink: ['/admin/pedido/nuevo'] },
                ]
            },
        ];
    }
}
