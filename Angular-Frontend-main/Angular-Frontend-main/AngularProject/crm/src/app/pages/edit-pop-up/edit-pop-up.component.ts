import { AfterViewInit, ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { CustomerModel } from 'src/app/models/customerModel';
import { EmployeeService } from 'src/app/services/employee.service';
import { CrudService } from 'src/app/services/crud.service';

@Component({
  selector: 'edit-pop-up',
  templateUrl: './edit-pop-up.component.html',
  styleUrls: ['./edit-pop-up.component.css']
})
export class EditPopUpComponent implements OnInit {

  customer: CustomerModel=new CustomerModel();
  provinceId: number;
  districtId: number;
  districtsList:string[]=[];
  provincesList:string[]=[];
  tempArray:string[] = [];

  @Input() employeeId: number;
  @Output() postEmployeeBack = new EventEmitter<CustomerModel>();
  
  constructor(
    public activeModal: NgbActiveModal,
    private crudService: CrudService,
    private cdref: ChangeDetectorRef)
    {
    }

  ngOnInit(): void {
    this.getProvinces();

    this.crudService.getCustomer(this.employeeId).subscribe((result) => {
      this.customer = result;

      this.crudService.getDistricts(this.customer.province).subscribe(
        (response: any) => {
            this.districtsList = response;
            this.findInitialId(this.customer.district, true);
        },
        (err: any) => {
            console.log(err);
        }
      );
      
      this.findInitialId(this.customer.province, false);

    });
    
  }

  ngAfterContentChecked() {
    this.cdref.detectChanges();
  }


  Save(){
    this.crudService.UpdateCustomer(this.customer.customerId, this.customer).subscribe(() => {
    })
    this.activeModal.close('Close click')
  }

  onValueChanged(e:any){
    if(this.customer.province!=null){
      this.getDistricts();
      this.districtId = -1;
    }
  }

  getDistricts(){
    this.crudService.getDistricts(this.customer.province).subscribe(
      (response: any) => {
          this.districtsList=response;
      },
      (err: any) => {
          console.log(err);
      }
    );
  }


  getProvinces(){
    this.crudService.getProvinces().subscribe(
      (response: any) => {
          this.provincesList=response;
      },
      (err: any) => {
          console.log(err);
      }
    );
  }


  // type: 
  // 0 => province
  // 1 => district
  findInitialId(initialName: string, type: boolean){
    
    if(!type)         this.tempArray = this.provincesList;
    else              this.tempArray = this.districtsList;
    
    let i = this.tempArray.indexOf(initialName);
    if(!type)       this.provinceId = i;
    else            this.districtId = i;
  }



}