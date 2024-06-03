import { Component, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  // loginForm: FormGroup;
  loginForm!: FormGroup;

  authService = inject(AuthService);

  // constructor() {}
  constructor(fb: FormBuilder) {
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
        // this.authService.setToken(res.token);
      },
      (error) => {
        console.log(error)
      }
    )

  }
}
