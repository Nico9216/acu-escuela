import {
  Component,
  OnInit,
  ViewChild,
  Inject,
} from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AgendarClaseComponent } from '../agendar-clase/agendar-clase.component';
import { MatDialogRef, MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AlumnoService } from 'src/app/core/services/alumno.service';
import { Alumno } from '@core/model/alumno.model';

@Component({
  selector: 'app-seleccionar-alumno',
  templateUrl: './seleccionar-alumno.component.html',
  styleUrls: ['./seleccionar-alumno.component.scss']
})
export class SeleccionarAlumnoComponent implements OnInit { // , AfterViewInit, AfterViewChecked {

  displayedColumns: string[] = ['actions', 'AluNro', 'AluNomComp', 'AluCI'];

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  // MatPaginator Output
  // pageEvent: PageEvent;

  // MatPaginator Inputs
  // pageSize = 10;
  pageSizeOptions: number[] = [5, 10, 25, 100];
  cantidad = 60000;


  filtro: string;

  // Test paginator
  pageEvent: PageEvent;
  dataSource: MatTableDataSource<Alumno>;
  pageIndex: number;
  pageSize: number;
  length: number;



  constructor(
    public dialogRef: MatDialogRef<AgendarClaseComponent>,
    public dialog: MatDialog,
    private alumnoService: AlumnoService,
    @Inject(MAT_DIALOG_DATA) public data: any) {

    // this.alumnos = this.data.alumnos;
    console.log('1) this.data: ', this.data);
    console.log('2) cantidad: ', this.data.cantidad);

    this.dataSource = this.data.alumnos;
    this.pageSize = 5;
    this.filtro = this.data.filtro;
    this.cantidad = this.data.cantidad;

    this.length = this.data.cantidad;

  }

  ngOnInit() {
    this.ejecutoEvent(null);

    this.dataSource.paginator = this.paginator;
    this.dataSource.paginator.length = this.cantidad;
    this.dataSource.sort = this.sort;


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

        console.log('3) Input Value:', this.filtro);
        console.log('3) Input this.pageSize:', this.pageSize);

        this.getAlumnos(this.pageSize, 1, this.filtro);
      }, 500);
    });
  }



  getAlumnos(pageSize, pageNumber, filtro) {
    console.log('4) filtro: ', filtro);
    console.log('4) pageSize: ', pageSize);


    if (pageNumber === 0) {
      pageNumber = 1;
    }

    this.alumnoService.obtenerAlumnos(pageSize, pageNumber, filtro)
      .subscribe((res: any) => {
        console.log('res: ', res);
        console.log('5) filtro: ', filtro);
        // this.pageEvent.length = res.Cantidad;

        this.length = res.Cantidad;
        this.actualizarDatasource(res, pageSize, pageNumber - 1);


      });
  }

  ejecutoEvent(pageEvento: PageEvent) {
    this.pageEvent = pageEvento;
    const filter = (this.filtro) ? this.filtro : '';

    console.log('ejecutoEvent, pageEvento: ', pageEvento);
    if (pageEvento) {
      let index = pageEvento.pageIndex;
      this.pageSize = pageEvento.pageSize;
      index += 1;
      // Si estoy retrocediendo saco 1 del index
      if (pageEvento.previousPageIndex > pageEvento.pageIndex) {
        index -= 1;
      }
      console.log('index: ', index);

      this.getAlumnos(pageEvento.pageSize, index, filter);

    }
    return pageEvento;

  }

  actualizarDatasource(data, size?, index?) {

    this.dataSource = data.Alumnos;
    // this.pageIndex =  pageIndex;
    if (size) {
      this.pageSize = size;
    }
    console.log('cantidad: ', data.Cantidad);

    this.length = data.Cantidad;
    console.log('this.length: ', this.length);

    // this.dataSource = new MatTableDataSource(data);
    if (index) {
      this.pageIndex = index;
    }
    this.dataSource.paginator = this.paginator;
    // this.dataSource.paginator.length = cantidad;
    this.dataSource.sort = this.sort;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }


}
