import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { PasswordModule } from 'primeng/password';
import { CheckboxModule } from 'primeng/checkbox';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { RippleModule } from 'primeng/ripple';
import { ToolbarModule } from 'primeng/toolbar';
import { ToastModule } from 'primeng/toast';

import { ConfirmationService, MessageService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { FileUploadModule } from 'primeng/fileupload';
import { DropdownModule } from 'primeng/dropdown';
import { TagModule } from 'primeng/tag';
import { RadioButtonModule } from 'primeng/radiobutton';
import { RatingModule } from 'primeng/rating';
import { FormsModule } from '@angular/forms';
import { InputNumberModule } from 'primeng/inputnumber';

import { LazyLoadEvent } from 'primeng/api';

const modulos = [
  TableModule,
  ButtonModule,
  PasswordModule,
  CheckboxModule,
  DialogModule,
  InputTextModule,
  InputTextareaModule,
  RippleModule,
  ToolbarModule,
  ToastModule,
  ConfirmDialogModule,
  FileUploadModule,
  DropdownModule,
  TagModule,
  RadioButtonModule,
  RatingModule,
  FormsModule,
  InputNumberModule,
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
  ],
  providers: [
    ConfirmationService,
    MessageService
  ]
})
export class PrimeModule { }
