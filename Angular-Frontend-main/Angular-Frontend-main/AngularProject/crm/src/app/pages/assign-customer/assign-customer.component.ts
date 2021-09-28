import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { CustomerAssignmentModel } from 'src/app/models/customerAssignmentModel';
import { EmployeeModel } from 'src/app/models/employeeModel';
import { CrudService } from 'src/app/services/crud.service';
import { EmployeeService } from 'src/app/services/employee.service';


@Component({
  selector: 'app-assign-customer',
  templateUrl: './assign-customer.component.html',
  styleUrls: ['./assign-customer.component.css']
})
export class AssignCustomerComponent implements OnInit {

  @Input() selectedCustomerData: any[];
  customerRepresentative : EmployeeModel[];
  customerAssignin: CustomerAssignmentModel[]=[];
  customerAssigninObj:CustomerAssignmentModel;
  employeeName:string;
  employeeId:string;
  myList : string[]=[] ;
  constructor(
    public activeModal: NgbActiveModal ,
    private crudService: CrudService,
    private employeeService:EmployeeService)
  { 
    
  }

  ngOnInit(): void {
    this.crudService.getEmployee().subscribe(
      (res: any) => {
        this.customerRepresentative = res;
        this.customerRepresentative.map(x=> this.myList.push(x.userName!));
        
      },
      (err: any) => {
        console.log(err);
      },
    );

  }

  Assign(){
    this.findUserId(this.employeeName);
    this.selectedCustomerData.forEach(e=>{
      this.customerAssigninObj={
        customerId:e.customerId,
        customerName:e.name,
        id:this.employeeId,
        userName:this.employeeName
        
      }
      this.customerAssignin.push(this.customerAssigninObj);
    });
      
      this.employeeService.postCustomerAssign(this.customerAssignin).subscribe(
        (data:any)=>{     
        },
        err => {
          console.log(err);
        },
        );
        this.activeModal.close('Close click')
  }

  findUserId(name:string){
    this.customerRepresentative.map(x=> {
      if(x.userName==name){
        this.employeeId=x.id!;
      };
    });
  }


}
