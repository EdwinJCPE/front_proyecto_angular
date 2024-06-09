import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { PasswordModule } from 'primeng/password';
import { CheckboxModule } from 'primeng/checkbox';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';

const modulos = [
  TableModule,
  ButtonModule,
  PasswordModule,
  CheckboxModule,
  DialogModule,
  InputTextModule,
  InputTextareaModule
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    // TableModule,
    // ButtonModule
    modulos
  ],
  exports: [
    // TableModule,
    // ButtonModule
    modulos
  ]
})
export class PrimeModule { }
