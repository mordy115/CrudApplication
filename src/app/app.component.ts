import { Dialog } from '@angular/cdk/dialog';
import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import { EmpAddEditComponent } from './emp-add-edit/emp-add-edit.component';
import { EmployeeService } from './services/employee.service';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog} from '@angular/material/dialog';
import { SnackbarService } from './services/snackbar.service';


// export interface empData {
//   id: string;
//   firstname: string;
//   lastname: string;
//   email: string;
//   date: string;
//   gender: string;
//   education: string;
//   position: string;
// }

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent  implements OnInit{
  
  displayedColumns: string[] = [
    'id',
    'firstName',
    'lastName',
    'email',
    'date',
    'gender',
    'education',
    'position',
    'action'
];
  dataSource!: MatTableDataSource<any>;
  
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(
    private _dialog:MatDialog, 
    private _empService:EmployeeService ,
    private _snackService:SnackbarService
  ){
    // this.getEmployeeList()  // run fan in constructor ,but best  run ngOnInti()
  }
  

  ngOnInit(): void {
    this.getEmployeeList();
  }
  
  openAddEditEmp(): void {
    
    const dialogRef= this._dialog.open(EmpAddEditComponent );
    dialogRef.afterClosed().subscribe({
      next: (val) => {
           this.getEmployeeList();
           
      },
    });    
    
  }
  
  getEmployeeList(){
     this._empService.getEmployeeList().subscribe({
      next:(res)=>{
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;

      },
      error(err) {
        console.log(err);
      },
     })
  }
  ngAfterViewInit() {
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
  deleteEmployee(id:number){
    if(window.confirm("Do you want to delete this Employee?")){
      this._empService.deleteEmployee(id).subscribe({
        next:(value)=> {
          this._snackService.openSnackBarTop('Employee deleted!','done')
          this.getEmployeeList()
        },
        error : console.log,
      })
    }
    
  }
  openEditEmp(data:any): void {
    
    const dialogRef=this._dialog.open(EmpAddEditComponent, {data});

    dialogRef.afterClosed().subscribe({
      next: (val) => {
           this.getEmployeeList();
           
      },
    });    
    
  }
  
}
