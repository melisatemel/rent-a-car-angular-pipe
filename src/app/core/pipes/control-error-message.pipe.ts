import { Pipe, PipeTransform } from '@angular/core';
import { AbstractControl, ValidationErrors } from '@angular/forms';

@Pipe({
  name: 'controlErrorMessage',
  standalone: true
})
export class ControlErrorMessagePipe implements PipeTransform {
  

  transform(control: ValidationErrors | null | undefined, ...args: unknown[]): string | unknown  {
    if (!control) {
      return '';
    }

    return  control['required'] ? 'Bu alan zorunludur.' :
            control['minlength'] ? 'Minimum 3 karakter olmalıdır.' :
            control['maxlength'] ? 'Maksimum 20 karakter olmalıdır.' : 'Invalid';
  }
}