import { Directive } from '@angular/core';
import {
  AsyncValidatorFn,
  AsyncValidator,
  NG_ASYNC_VALIDATORS,
  AbstractControl,
  ValidationErrors,
} from '@angular/forms';

import { map } from 'rxjs/operators';

import { AlumnoService } from '@core/services/alumno.service';
import { Observable } from 'rxjs';
@Directive({
  selector:
    // tslint:disable-next-line: directive-selector
    '[existeAlumnoByCi][formControlName],[existeAlumnoByCi][formControl],[existeAlumnoByCi][ngModel]',
  providers: [
    {
      provide: NG_ASYNC_VALIDATORS,
      useExisting: ExisteAlumnoByCiValidatorDirective,
      multi: true,
    },
  ],
})
export class ExisteAlumnoByCiValidatorDirective implements AsyncValidator {

  constructor(private alumnoService: AlumnoService) {}

  validate(
    control: AbstractControl
  ): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> {
    return existeAlumnoByCiValidator(this.alumnoService)(control);
  }
}

export function existeAlumnoByCiValidator(
  alumnoService: AlumnoService
): AsyncValidatorFn {
  return (
    control: AbstractControl
  ): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> => {
    console.log('existeAlumnoByCiValidator :: aluId: ', alumnoService.aluId);
    const {aluId}= alumnoService;
    console.log('existeAlumnoByCiValidator :: 22 aluId: ', aluId);

    return alumnoService.existeAlumnoByCI(control.value, aluId).pipe(
      map((res: any) => {
        console.log('res: ', res);
        console.log('res.existe: ', res.existe);
        // tslint:disable-next-line: object-literal-key-quotes
        return res.existe && { existeAlumnoByCi: true };
      })
    );
  };
}