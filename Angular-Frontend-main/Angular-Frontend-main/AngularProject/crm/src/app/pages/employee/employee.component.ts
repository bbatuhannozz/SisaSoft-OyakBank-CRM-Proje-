import { Component, enableProdMode, Injectable, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { PreviewPopUpComponent } from '../preview-pop-up/preview-pop-up.component';
import { CrudService } from 'src/app/services/crud.service';
import { EmployeeModel } from 'src/app/models/employeeModel';
import { CustomerModel } from 'src/app/models/customerModel';
import { EmployeeService } from 'src/app/services/employee.service';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})

export class EmployeeComponent implements OnInit {
  
  tempData: EmployeeModel[];
  customerModels: CustomerModel[];
  headers: ["İsim", "Doğum Tarihi", "Müşteri Numarası"];

  constructor(
    private router: Router,
    private crudService: CrudService,
    private employeeService: EmployeeService,
    private modalService: NgbModal
    )
  {   
  }

  
  ngOnInit(): void {

      this.crudService.getEmployee().subscribe(
        (res: any) => {
          this.tempData = res;
        },
        (err: any) => {
          console.log(err);
        },
      );
  }

  

  selectionChanged(e: any){
    
    e.component.collapseAll(-1);
    e.component.expandRow(e.currentSelectedRowKeys[0]);

    this.employeeService.getAssignedCustomers(e.currentSelectedRowKeys[0].id).subscribe(
      (data:any)=>{
        this.customerModels = data;
      },
      err => {
        console.log(err);
      }
    )
      
  }

  contentReady(e: any){
    if (!e.component.getSelectedRowKeys().length){
      //e.component.selectRowsByIndexes(0);
    }
    else{
      
    }
  }

 


}
