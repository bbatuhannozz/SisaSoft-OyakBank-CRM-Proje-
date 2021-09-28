import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: "any"
  })
  
export class EmployeeService{
  constructor(private httpClient:HttpClient){}

  apiUrl = environment.BaseURL;
  postCustomerAssign (data: any): Observable<any> {
    return this.httpClient.post<any>(this.apiUrl+'/customerassignment', data, {headers:{'Content-Type':  'application/json'}})
  }

  //get customers who is assigned an employee
  getAssignedCustomers(data:any): Observable<any>{
    return this.httpClient.get<any>(this.apiUrl+'/Employees/AssignedCustomers?UserId='+data);
  }



}
