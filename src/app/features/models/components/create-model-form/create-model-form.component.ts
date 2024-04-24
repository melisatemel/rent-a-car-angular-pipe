import { ModelsApiService } from './../../services/modelsApi.service';
import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ControlErrorMessagePipe } from '../../../../core/pipes/control-error-message.pipe';


@Component({
  selector: 'app-create-model-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
  ],
  templateUrl: './create-model-form.component.html',
  styleUrl: './create-model-form.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
 
})
export class CreateModelFormComponent implements OnInit{

  modelForm: FormGroup = this.formBuilder.group({
    brandId: ['',Validators.required],
    name: ['', Validators.required],
    modelYear: ['', Validators.required],
    imageUrl:['', Validators.required],
    dailyPrice: ['', Validators.required],
  });;

    constructor(private formBuilder: FormBuilder, private modelApiService: ModelsApiService){
    }

  ngOnInit(): void {
  }

    onSubmit(){
      if(this.modelForm.invalid){
        console.error('form is invalid');
      }
      else{
        console.log(3)
        const request = {  
          
          brandId:this.modelForm.get('brandId')?.value,   
          name:this.modelForm.get('name')?.value,          
          modelYear: this.modelForm.get('modelYear')?.value,   
          imageUrl: this.modelForm.get('imageUrl')?.value,      
          dailyPrice:  this.modelForm.get('dailyPrice')?.value,   
        }
        this.modelApiService.postModel(request).subscribe(data=>{console.log(data)});
      }
    }
 }
