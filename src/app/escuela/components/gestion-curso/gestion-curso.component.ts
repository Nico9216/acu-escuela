import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AcuService } from '@core/services/acu.service';
import { Curso } from '@core/model/curso.model';
import { Router } from '@angular/router';
import { confirmacionUsuario, mensajeConfirmacion } from '@utils/sweet-alert';
import { ClaseEstimada, ClaseEstimadaDetalle } from '../../../core/model/clase-estimada.model';
import { MatSelectChange } from '@angular/material/select';
import { FormBuilder, FormGroup } from '@angular/forms';


@Component({
  selector: 'app-gestion-curso',
  templateUrl: './gestion-curso.component.html',
  styleUrls: ['./gestion-curso.component.scss']
})
export class GestionCursoComponent implements OnInit {

  displayedColumns: string[] = ['actions', 'TipCurId', 'TipCurNom', 'TipCurEst'];
  dataSource: MatTableDataSource<Curso>;
  verCurso: boolean;
  filtro: string;

  estados = [];
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
    this.getCursos('A');
    this.generateEstados();

  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  abmCurso(modo: string, curso: Curso) {
    switch (modo) {
      case 'INS':
        this.acuService.sendDataCurso(modo, curso, 0);
        this.router.navigate(['/escuela/abm-curso']);

        break;
      case 'UPD':

        this.acuService.sendDataCurso(modo, curso);
        this.router.navigate(['/escuela/abm-curso']);
        break;
      case 'DLT':
        confirmacionUsuario('Confirmación de Usuario', `Está seguro que desea eliminar el curso: ${curso.TipCurNom}`).then((confirm) => {
          if (confirm.isConfirmed) {
            this.acuService.gestionCurso(modo, curso).subscribe((res: any) => {
              console.log('res eli:', res);

              mensajeConfirmacion('Ok', res.Curso.ErrorMessage).then((res2) => {

                this.getCursos(this.filtro);

              });

            });
          }
        });

        break;

      default:
        break;
    }

  }

  getCursos(TipCurEst?: string) {

    this.verCurso = false;
    this.acuService.getCursos().subscribe((cursos: Curso[]) => {
      console.log('Cursos: ', cursos);


      this.verCurso = true;
      const auxCursos = (TipCurEst === '-' || !TipCurEst)
        ? cursos
        : cursos.filter(curso => curso.TipCurEst === TipCurEst);
      // Assign the data to the data source for the table to render
      this.dataSource = new MatTableDataSource(auxCursos);

      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  buildForm() {

    this.form = this.fb.group({
      tipCurEst: ['A'],
    });
  }
  verActivos(event: MatSelectChange) {
    console.log('event: ', event);

    const filterValue = event.value;
    console.log('filterValue: ', filterValue);
    this.getCursos(filterValue);
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
      value: 'A',
      description: 'Activo'
    };
    this.estados.push(estado1);

    const estado2 = {
      id: 2,
      value: 'B',
      description: 'Baja'
    };
    this.estados.push(estado2);



    console.log('estados: ', this.estados);
  }

}

