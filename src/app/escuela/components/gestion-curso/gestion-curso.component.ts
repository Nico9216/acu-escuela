import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AcuService } from '@core/services/acu.service';
import { Curso } from '@core/model/curso.model';
import { Router } from '@angular/router';
import { confirmacionUsuario, mensajeConfirmacion } from '@utils/sweet-alert';
import { ClaseEstimada, ClaseEstimadaDetalle } from '../../../core/model/clase-estimada.model';


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

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(
    private acuService: AcuService,
    private router: Router) {

  }

  openPdf() {
    const planDeClase: ClaseEstimada = {
    };
    planDeClase.AluId = -8462;
    planDeClase.EscInsId = 'JN';
    planDeClase.EscInsNom = 'JOSE NOBLE';
    planDeClase.FechaInicio = new Date(2020, 7, 29);
    planDeClase.FechaFin = new Date(2020, 11, 9);

    const detalle: ClaseEstimadaDetalle[] = [
      { Fecha: '2020-08-03', HoraInicio: 900, HoraFin: 1000 },
      { Fecha: '2020-08-10', HoraInicio: 900, HoraFin: 1000 },
      { Fecha: '2020-08-17', HoraInicio: 900, HoraFin: 1000 },
      { Fecha: '2020-08-24', HoraInicio: 900, HoraFin: 1000 },
      { Fecha: '2020-08-31', HoraInicio: 900, HoraFin: 1000 },
      { Fecha: '2020-09-07', HoraInicio: 900, HoraFin: 1000 },
      { Fecha: '2020-09-14', HoraInicio: 900, HoraFin: 1000 },
      { Fecha: '2020-09-21', HoraInicio: 900, HoraFin: 1000 },
      { Fecha: '2020-09-28', HoraInicio: 900, HoraFin: 1000 },
      { Fecha: '2020-10-05', HoraInicio: 900, HoraFin: 1000 },
      { Fecha: '2020-10-12', HoraInicio: 900, HoraFin: 1000 },
      { Fecha: '2020-10-19', HoraInicio: 900, HoraFin: 1000 },
      { Fecha: '2020-10-26', HoraInicio: 900, HoraFin: 1000 },
      { Fecha: '2020-11-02', HoraInicio: 900, HoraFin: 1000 },
      { Fecha: '2020-11-09', HoraInicio: 900, HoraFin: 1000 }];

    planDeClase.Detalle = detalle;


    this.acuService.getPDFPlanDeClases(planDeClase).subscribe(pdf => {
      this.acuService.openPDF(pdf);
    });

  }

  openSamePdf() {
    const planDeClase: ClaseEstimada = {
    };
    planDeClase.AluId = -8462;
    planDeClase.EscInsId = 'JN';
    planDeClase.EscInsNom = 'JOSE NOBLE';
    planDeClase.FechaInicio = new Date(2020, 7, 29);
    planDeClase.FechaFin = new Date(2020, 11, 9);

    const detalle: ClaseEstimadaDetalle[] = [
      { Fecha: '2020-08-03', HoraInicio: 900, HoraFin: 1000 },
      { Fecha: '2020-08-10', HoraInicio: 900, HoraFin: 1000 },
      { Fecha: '2020-08-17', HoraInicio: 900, HoraFin: 1000 },
      { Fecha: '2020-08-24', HoraInicio: 900, HoraFin: 1000 },
      { Fecha: '2020-08-31', HoraInicio: 900, HoraFin: 1000 },
      { Fecha: '2020-09-07', HoraInicio: 900, HoraFin: 1000 },
      { Fecha: '2020-09-14', HoraInicio: 900, HoraFin: 1000 },
      { Fecha: '2020-09-21', HoraInicio: 900, HoraFin: 1000 },
      { Fecha: '2020-09-28', HoraInicio: 900, HoraFin: 1000 },
      { Fecha: '2020-10-05', HoraInicio: 900, HoraFin: 1000 },
      { Fecha: '2020-10-12', HoraInicio: 900, HoraFin: 1000 },
      { Fecha: '2020-10-19', HoraInicio: 900, HoraFin: 1000 },
      { Fecha: '2020-10-26', HoraInicio: 900, HoraFin: 1000 },
      { Fecha: '2020-11-02', HoraInicio: 900, HoraFin: 1000 },
      { Fecha: '2020-11-09', HoraInicio: 900, HoraFin: 1000 }];

    planDeClase.Detalle = detalle;


    this.acuService.getPDFPlanDeClases(planDeClase).subscribe(pdf => {
      this.acuService.openSamePDF(pdf, 'PlanDeClases');
    });

  }

  getPdf() {
    const planDeClase: ClaseEstimada = {
    };
    planDeClase.AluId = -8462;
    planDeClase.EscInsId = 'JN';
    planDeClase.EscInsNom = 'JOSE NOBLE';
    planDeClase.FechaInicio = new Date(2020, 7, 29);
    planDeClase.FechaFin = new Date(2020, 11, 9);

    const detalle: ClaseEstimadaDetalle[] = [
      { Fecha: '2020-08-03', HoraInicio: 900, HoraFin: 1000 },
      { Fecha: '2020-08-10', HoraInicio: 900, HoraFin: 1000 },
      { Fecha: '2020-08-17', HoraInicio: 900, HoraFin: 1000 },
      { Fecha: '2020-08-24', HoraInicio: 900, HoraFin: 1000 },
      { Fecha: '2020-08-31', HoraInicio: 900, HoraFin: 1000 },
      { Fecha: '2020-09-07', HoraInicio: 900, HoraFin: 1000 },
      { Fecha: '2020-09-14', HoraInicio: 900, HoraFin: 1000 },
      { Fecha: '2020-09-21', HoraInicio: 900, HoraFin: 1000 },
      { Fecha: '2020-09-28', HoraInicio: 900, HoraFin: 1000 },
      { Fecha: '2020-10-05', HoraInicio: 900, HoraFin: 1000 },
      { Fecha: '2020-10-12', HoraInicio: 900, HoraFin: 1000 },
      { Fecha: '2020-10-19', HoraInicio: 900, HoraFin: 1000 },
      { Fecha: '2020-10-26', HoraInicio: 900, HoraFin: 1000 },
      { Fecha: '2020-11-02', HoraInicio: 900, HoraFin: 1000 },
      { Fecha: '2020-11-09', HoraInicio: 900, HoraFin: 1000 }];

    planDeClase.Detalle = detalle;


    this.acuService.getPDFPlanDeClases(planDeClase).subscribe(pdf => {
      this.acuService.getPDF(pdf, 'PlanDeClases');
    });

  }


  ngOnInit() {



    this.getCursos();

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
        // this.acuService.getCursoNumero().subscribe((res: { numero: number }) => {
        //   console.log('res: ', res);


        this.acuService.sendDataCurso(modo, curso, 0);
        this.router.navigate(['/escuela/abm-curso']);
        // });
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

                this.getCursos();

              });

            });
          }
        });

        break;

      default:
        break;
    }

  }

  getCursos() {

    this.verCurso = false;
    this.acuService.getCursos().subscribe((cursos: Curso[]) => {
      console.log('Cursos: ', cursos);


      this.verCurso = true;
      // Assign the data to the data source for the table to render
      this.dataSource = new MatTableDataSource(cursos);

      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

}

