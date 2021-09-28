import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { CustomerModel } from '../models/customerModel';
import { UserProfileModel } from '../models/userProfileModel';
import { UserDetailsModel } from '../models/userDetailsModel';

@Injectable({
  providedIn: 'root'
})
export class CrudService {
    apiUrl = environment.BaseURL;
    constructor(private httpClient: HttpClient){}

    getUserProfile() {
      return this.httpClient.get(this.apiUrl + '/UserProfile');
    }
    
    public postData(data: any): Observable<any>{
      return this.httpClient.post<any>(this.apiUrl+'/customers', data, {headers:{'Content-Type':  'application/json'}})   
    }
  
    get(): Observable<any>{
        return this.httpClient.get<any>(this.apiUrl+'/customers');
    }

    UpdateCustomer(cusId: number, data:CustomerModel){
      return this.httpClient.put(this.apiUrl+'/customers/' + cusId, data);
    }

    getCustomer(cusId: number): Observable<CustomerModel>{
      return this.httpClient.get<CustomerModel>(this.apiUrl+'/customers/' + cusId);
    }

    public deleteCustomer(deleteId: any){
      const deleteEndpoint = this.apiUrl+'/customers/' + deleteId;
      return this.httpClient.delete(deleteEndpoint);
    }

    postUserCustomer (data: any): Observable<any> {
      return this.httpClient.post<any>(this.apiUrl+'/usercustomer', data, {headers:{'Content-Type':  'application/json'}})   
    }


  postCustomer(data:any){
    return this.httpClient.post(this.apiUrl+'/customers', data);
  }

  changeUserDetails(data: any){
    return this.httpClient.put(this.apiUrl+'/UserProfile', data);
  }

  getEmployee(){
    return this.httpClient.get(this.apiUrl+'/Employees');
  }

  getAssignedCustomers(){
    return this.httpClient.get(this.apiUrl+'/Customers/Assigned')
  }
  getUnassignedCustomers(){
    return this.httpClient.get(this.apiUrl+'/Customers/Unassigned')
  }

  controlUserName(data:any){
    return this.httpClient.post(this.apiUrl+'/UserProfile/CheckUserName',data,{headers:{'Content-Type':  'application/json'}});
  }

  getDistricts(data:any): Observable<any>{
    return this.httpClient.get<any>(this.apiUrl+'/Customers/Districts?ProvinceName='+data);
  }
  getProvinces(): Observable<any>{
    return this.httpClient.get<any>(this.apiUrl+'/Customers/Provinces');
  }
  getCustomerAssignmentRate(): Observable<any>{
    return this.httpClient.get<any>(this.apiUrl+'/CustomerAssignment/CustomerRate');
  }
}
