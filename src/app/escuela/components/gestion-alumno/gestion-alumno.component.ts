import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AcuService } from '@core/services/acu.service';
import { Alumno } from '@core/model/alumno.model';
import { Router } from '@angular/router';
import { confirmacionUsuario, mensajeConfirmacion } from '@utils/sweet-alert';


@Component({
  selector: 'app-gestion-alumno',
  templateUrl: './gestion-alumno.component.html',
  styleUrls: ['./gestion-alumno.component.scss']
})
export class GestionAlumnoComponent implements OnInit {

  displayedColumns: string[] = ['actions', 'AluNro', 'AluNomComp', 'AluCI'];

  dataSource: MatTableDataSource<Alumno>;
  verAlumnos: boolean;
  filtro: string;


  // Test paginator
  pageEvent: PageEvent;
  pageIndex: number;
  pageSize = 5;
  length: number;
  cantidad = 60000;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(
    private acuService: AcuService,
    private router: Router) {
    console.log('constructor gestion-alumno');


  }

  ngOnInit() {
    console.log('ngoninit gestion-alumno');
    const event = this.ejecutoEvent(null);


    // Get the input box
    const input = document.getElementById('search');

    // Init a timeout variable to be used below
    let timeout = null;

    // Listen for keystroke events
    input.addEventListener('keyup', (e) => {
      // Clear the timeout if it has already been set.
      // This will prevent the previous task from executing
      // if it has been less than <MILLISECONDS>
      clearTimeout(timeout);

      // Make a new timeout set to go off in 1000ms (1 second)
      timeout = setTimeout(() => {

        this.getAlumnos(this.pageSize, 1, this.filtro);
      }, 500);
    });

  }

  abmAlumno(modo: string, alumno: Alumno) {
    switch (modo) {
      case 'INS':
        this.acuService.getAlumnoNumero().subscribe((res: { numero: number }) => {
          console.log('res: ', res);


          this.acuService.sendDataAlumno(modo, alumno, res.numero);
          this.router.navigate(['/escuela/abm-alumno']);
        });
        break;
      case 'UPD':

        this.acuService.sendDataAlumno(modo, alumno);
        this.router.navigate(['/escuela/abm-alumno']);
        break;
      case 'DLT':
        confirmacionUsuario('Confirmación de Usuario', `Está seguro que desea eliminar el alumno: ${alumno.AluNomComp}`).then((res) => {
          if (res.isConfirmed) {
            this.acuService.gestionAlumno(modo, alumno).subscribe((res: any) => {
              console.log('res eli:', res);

              mensajeConfirmacion('Ok', res.Alumno.ErrorMessage).then((res2) => {

                this.getAlumnos(this.pageSize, 1, '');

              });

            });
          }
        });

        break;

      default:
        break;
    }


  }

  getAlumnos(pageSize, pageNumber, filtro) {


    if (pageNumber === 0) {
      pageNumber = 1;
    }
    this.verAlumnos = false;
    this.acuService.obtenerAlumnos(pageSize, pageNumber, filtro)
      .subscribe((res: any) => {

        console.log('getAlumnos : ', res);
        this.length = res.Cantidad;
        this.actualizarDatasource(res, pageSize, pageNumber - 1);


      });
  }

  ejecutoEvent(pageEvento: PageEvent) {
    this.pageEvent = pageEvento;
    const filter = (this.filtro) ? this.filtro : '';
    console.log(`ejecuto Event: ${pageEvento}`);

    if (pageEvento) {
      console.log(` 1) ejecuto Event: ${pageEvento}`);
      let index = pageEvento.pageIndex;
      this.pageSize = pageEvento.pageSize;
      index += 1;
      // Si estoy retrocediendo saco 1 del index
      if (pageEvento.previousPageIndex > pageEvento.pageIndex) {
        index -= 1;
      }

      this.getAlumnos(pageEvento.pageSize, index, filter);

    } else {
      console.log(` 2) ejecuto Event: ${pageEvento}`);
      this.getAlumnos(this.pageSize, 1, '');

    }
    return pageEvento;

  }

  actualizarDatasource(data, size?, index?) {

    this.dataSource = data.Alumnos;
    this.verAlumnos = true;

    if (size) {
      this.pageSize = size;
    }

    this.length = data.Cantidad;

    if (index) {
      this.pageIndex = index;
    }

    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;


  }

}