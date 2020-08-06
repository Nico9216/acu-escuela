import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AcuService } from '@core/services/acu.service';
import { Router } from '@angular/router';
import { confirmacionUsuario, mensajeConfirmacion } from '@utils/sweet-alert';
import { Instructor } from '@core/model/instructor.model';
import { filter } from 'rxjs/operators';
import { MatSelectChange } from '@angular/material/select';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-gestion-instructor',
  templateUrl: './gestion-instructor.component.html',
  styleUrls: ['./gestion-instructor.component.scss']
})
export class GestionInstructorComponent implements OnInit {

  displayedColumns: string[] = ['actions', 'EscInsId', 'EscInsNom', 'EscInsTel', 'EscInsAct'];
  dataSource: MatTableDataSource<Instructor>;
  verInstructor: boolean;
  filtro: string;
  estados = [];
  instructores: Instructor[];
  form: FormGroup;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(

    private fb: FormBuilder,
    private acuService: AcuService,
    private router: Router) {


  }

  ngOnInit() {


    this.buildForm();
    this.getInstructores('S');
    this.generateEstados();

  }

  buildForm() {

    this.form = this.fb.group({
      escInsAct: ['S'],
    });
  }
  verActivos(event: MatSelectChange) {
    console.log('event: ', event);

    const filterValue = event.value;
    console.log('filterValue: ', filterValue);
    const instructores = (filterValue === '-')
      ? this.instructores
      : this.instructores.filter(instructor => instructor.EscInsAct === filterValue);


    console.log('instructores: ', instructores);
    this.dataSource = new MatTableDataSource(instructores);

    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  abmInstructor(modo: string, instructor: Instructor) {
    switch (modo) {
      case 'INS':

        this.acuService.sendDataInstructor(modo, instructor, 0);
        this.router.navigate(['/escuela/abm-instructor']);
        // });
        break;
      case 'UPD':

        this.acuService.sendDataInstructor(modo, instructor);
        this.router.navigate(['/escuela/abm-instructor']);
        break;
      case 'DLT':
        confirmacionUsuario(
          'Confirmación de Usuario',
          `Está seguro que desea eliminar el instructor: ${instructor.EscInsNom}`)
          .then((confirm) => {
            if (confirm.isConfirmed) {
              this.acuService.gestionInstructor(modo, instructor).subscribe((res: any) => {
                console.log('res eli:', res);

                mensajeConfirmacion('Ok', res.Instructor.ErrorMessage).then((res2) => {

                  this.getInstructores(this.filtro);

                });

              });
            }
          });

        break;

      default:
        break;
    }

  }

  generateEstados() {
    const estado0 = {
      id: 0,
      value: '-',
      description: 'Todos'
    };

    this.estados.push(estado0);

    const estado1 = {
      id: 1,
      value: 'S',
      description: 'Si'
    };
    this.estados.push(estado1);

    const estado2 = {
      id: 2,
      value: 'N',
      description: 'No'
    };
    this.estados.push(estado2);



    console.log('estados: ', this.estados);
  }

  getInstructores(EscInsAct?: string) {

    this.verInstructor = false;
    this.acuService.getInstructores()
      .subscribe((instructores: Instructor[]) => {
        console.log('instructores instructoinstructores: ', instructores);


        this.verInstructor = true;
        // Assign the data to the data source for the table to render
        this.instructores = instructores;
        const auxInstructores = (EscInsAct === '-')
          ? this.instructores.filter(instructor => (instructor.EscInsAct === 'S' || instructor.EscInsAct === 'N'))
          : this.instructores.filter(instructor => instructor.EscInsAct === EscInsAct);

        this.dataSource = new MatTableDataSource(auxInstructores);

        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      });

  }

}

