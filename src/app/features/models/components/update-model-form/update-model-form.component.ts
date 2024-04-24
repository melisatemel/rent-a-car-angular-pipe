import { ActivatedRoute } from '@angular/router';
import { ModelsApiService } from './../../services/modelsApi.service';
import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ControlErrorMessagePipe } from '../../../../core/pipes/control-error-message.pipe';

@Component({
  selector: 'app-update-model-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ControlErrorMessagePipe,
  ],
  templateUrl: './update-model-form.component.html',
  styleUrl: './update-model-form.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UpdateModelFormComponent implements OnInit{ 
  modelForm: FormGroup = this.formBuilder.group({
  });
  activeId: number = 0;
  constructor(private formBuilder: FormBuilder, private modelsApiService : ModelsApiService, private activatedRoute : ActivatedRoute){

  }
  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      console.log(params)
      this.activeId = params['id'];
      console.log(this.activeId)
      this.modelsApiService.getById(this.activeId).subscribe(data=>{
        this.modelForm=this.formBuilder.group({
          brandId: [data.brandId, Validators.required],
          name: [data.name, Validators.required],
          modelYear: [data.modelYear, Validators.required],
          imageUrl:[data.imageUrl, Validators.required],
          dailyPrice: [data.dailyPrice, Validators.required],
        });
      })
    });    
    
  }
  onSubmit(){if(this.modelForm.invalid){
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
    this.modelsApiService.putModel(request,this.activeId).subscribe(data=>{console.log(data)});
  }
}
}
