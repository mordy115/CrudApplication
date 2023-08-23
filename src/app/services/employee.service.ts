import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {EMPLOYEES_API_URL} from '../utils/api-utils';
@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private _http:HttpClient) { }
  addEmployee(data:any):Observable<any>{
    return this._http.post(EMPLOYEES_API_URL,data)
  }
  updateEmployee(id: number,data:any):Observable<any>{
    return this._http.put(EMPLOYEES_API_URL+`/${id}`,data)
  }
  getEmployeeList():Observable<any>{
    return this._http.get(EMPLOYEES_API_URL)
  }
  deleteEmployee(id:number):Observable<any>{
    return this._http.delete(EMPLOYEES_API_URL+`/${id}`);
  }
}
