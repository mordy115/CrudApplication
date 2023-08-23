import { Component, Inject , OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { EmployeeService } from '../services/employee.service';

import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { SnackbarService } from '../services/snackbar.service';

@Component({
  selector: 'app-emp-add-edit',
  templateUrl: './emp-add-edit.component.html',
  styleUrls: ['./emp-add-edit.component.scss']
})
export class EmpAddEditComponent implements OnInit{
  employeeForm:FormGroup;
  mgs:any;
  education: string[]=[
    'Diploma',
    'Intermediate',
    'Graduate'
  ]
  constructor(private _fb:FormBuilder , 
    private _empServices:EmployeeService ,
    public _dailogREf:MatDialogRef<EmpAddEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _snackService:SnackbarService
    ){
    this.employeeForm=this._fb.group({
      firstName: new FormControl('', [
        Validators.required,
      ]),
      lastName: new FormControl('', [
        Validators.required,
      ]),
      email:new FormControl('', [
        Validators.required,
        Validators.email
      ]),
      date:new FormControl('', [
        Validators.required,
      ]),
      gender:new FormControl('', [
        Validators.required,
      ]),
      education:new FormControl('', [
        Validators.required,
      ]),
      position:new FormControl('', [
        Validators.required,
      ]),
    })
  }
  ngOnInit(): void {
    this.employeeForm.patchValue(this.data);
  }
 
  onFormSubmit(){
    if(this.employeeForm.valid){
      if(this.data){
        this._empServices.updateEmployee(this.data.id,this.employeeForm.value).subscribe({
          next:(val:any)=>{
            this._snackService.openSnackBarBottom("Employee updated!");
            this._dailogREf.close(true);
          },
          error(err) {
            console.error(err)
          },
        })
      }else{
        this._empServices.addEmployee(this.employeeForm.value).subscribe({
          next:(val:any)=>{
            this._snackService.openSnackBarTop("Employee added sussessfully",'done');
            this._dailogREf.close(true);
          },
          error(err) {
            console.error(err)
          },
        })
      }
      
    }
  }
}
