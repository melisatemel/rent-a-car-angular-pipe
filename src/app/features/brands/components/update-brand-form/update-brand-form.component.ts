import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Output } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { BrandsApiService } from '../../services/brands-api.service';
import { PutBrandRequest } from '../../models/put-brand-request';

@Component({
  selector: 'app-update-brand-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './update-brand-form.component.html',
  styleUrl: './update-brand-form.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UpdateBrandFormComponent { 
  form: FormGroup = this.fb.group({
    // Form Controls
    name: [
      '', // [0] : Başlangıç değeri
      [Validators.required], // [1] : Validasyonlar
    ],
  });
  constructor(
    private fb: FormBuilder,
    private brandsApiService: BrandsApiService
  ) {}

  updateBrand(){
    const request: PutBrandRequest = {
      name: this.form.value.name,
    };
    this.brandsApiService.putBrand(request).subscribe({
      next: (response) => {
        console.info('Response:', response);
      },
      error: (error) => {
        console.error('Error:', error);
      },
      complete: () => {
        console.info('Brand updated successfully');
        this.form.reset();
      },
    });
  }

  onFormSubmit() {
    console.log(this.form);

    if (this.form.invalid) {
      console.error('Form is invalid');
      return;
    }

    this.updateBrand();
  }

  
}
