import { Component, OnInit, inject } from '@angular/core';
import { AuthService } from '../../../core/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrl: './perfil.component.scss'
})
export class PerfilComponent implements OnInit{
  authService = inject(AuthService);
  router = inject(Router);

  perfil: any = {};
  // constructor(private authService: AuthService) { }
  constructor() { }

  ngOnInit(): void {
    this.authService.perfil().subscribe(
      (res: any) => {
        console.log(res);
        this.perfil = res;
      },
      (err: any) => {
        console.log(err);
      }
    );
  }

  funSalir() {
    localStorage.removeItem('access_token');
    this.router.navigate(['/auth/login']);
  }

  logout(): void {
    // this.authService.logout();
  }


}
