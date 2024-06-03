import { Component, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../core/services/auth.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  // loginForm: FormGroup;
  loginForm!: FormGroup;

  // router = inject(Router);
  authService = inject(AuthService);

  // constructor() {}
  constructor(fb: FormBuilder, private router: Router) {
  // constructor(fb: FormBuilder, private authService: AuthService) {
    // this.loginForm = fb.group({
    //   email: fb.control('', [Validators.required, Validators.email]),
    //   password: fb.control('', [Validators.required])
    // });
    console.log('constructor');
  }

  ngOnInit(): void {
    console.log('ngOnInit');

    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', Validators.required)
    });
  }

  funIngresar() {
    // console.log(this.loginForm.value);

    // if (this.loginForm.valid) {

    // }

    this.authService.login(this.loginForm.value).subscribe(
      (res: any) => {
        console.log("LOGIN ****:", res)
        localStorage.setItem('access_token', res.access_token);
        this.router.navigate(['/admin/categoria']);
        // this.router.navigateByUrl('/admin/categoria');

      },
      (error) => {
        // console.log(error)
        console.log(error.error.message);

        Swal.fire({
          title: 'Error!',
          text: error.error.message,
          icon: 'error',
          confirmButtonText: 'Aceptar'
        })
      }
    )

  }
}
