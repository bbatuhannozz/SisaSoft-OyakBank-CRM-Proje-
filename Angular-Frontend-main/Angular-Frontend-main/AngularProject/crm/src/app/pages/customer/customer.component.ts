import { Component, enableProdMode, Injectable, OnInit, ViewChild } from '@angular/core';
import { CustomerModel } from 'src/app/models/customerModel';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { EditPopUpComponent } from '../edit-pop-up/edit-pop-up.component';
import { Router } from '@angular/router';
import { DeletePopUpComponent } from '../delete-pop-up/delete-pop-up.component';
import { PreviewPopUpComponent } from '../preview-pop-up/preview-pop-up.component';
import { CrudService } from 'src/app/services/crud.service';
import { AddPopUpComponent } from '../add-pop-up/add-pop-up.component';
import { DxDataGridComponent } from 'devextreme-angular';
import { AssignCustomerComponent } from '../assign-customer/assign-customer.component';


@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})

export class CustomerComponent implements OnInit {
  
  dataSource: any[] = [0,1];
  modalReference: NgbModalRef;
  selectedItemData: any[] = [];
  flag: number;
  gridTitles: string[] = ["Atama Bekleyen Müşteriler", "Atanan Müşteriler"];


  constructor(
      private router: Router,
      private crudService: CrudService,
      private modalService: NgbModal
    )
    {  
      this.OpenPreviewModal = this.OpenPreviewModal.bind(this);
    }

  
  ngOnInit(): void {
      this.getCustomers();
  }

  OpenPreviewModal(data: any) {
    const modalRef = this.modalService.open(PreviewPopUpComponent, {centered:true, size: 'md'});
    modalRef.componentInstance.customerId = data[this.flag];
  }

  
  getCustomers(){
    this.crudService.getUnassignedCustomers().subscribe(
        (data) => {
          this.dataSource[0] = data;
        },
        (err) => {
            console.log(err);
        }
    );
    this.crudService.getAssignedCustomers().subscribe(
      (data) => {
        this.dataSource[1] = data;
      },
      (err) => {
          console.log(err);
      }
    )
  }


  onToolbarPreparing(e: any, grid: any) {

    if(grid == this.dataSource[0])
      {
        this.flag = 1;

        e.toolbarOptions.items.unshift(
          {
            location:"before",
            widget: 'dxButton',
            options: {
              icon : "group",
              text: "Yeni Müşteri Ekle",
              onClick: this.OpenAddModal.bind(this)
            }
          }, {
            location:"before",
            widget: 'dxButton',
            options: {
                icon: 'card',
                text: "Müşteriyi Ata",
                onInitialized: (args: any) => {
                  this.btnExportInstance = args.component;
                },
                disabled: !this.selectedItemData.length,
                onClick: this.assignCustomer.bind(this)
            }
          }
        );
      }  
      else{
        this.flag = 0;
      }

    
  }
  private btnExportInstance: any = null;
  private updateBtnStates() {
    if (this.btnExportInstance !== null) {
      this.btnExportInstance.option({
        disabled: !this.selectedItemData.length
      });
    }
  }

  selectionChanged(data: any) {
    this.selectedItemData=data.selectedRowsData;
    this.updateBtnStates();
  }


  OpenAddModal = () => {
    const modalRef = this.modalService.open(AddPopUpComponent, {centered:true, size: 'lg'});
  }

  assignCustomer(){
    const modalRef = this.modalService.open(AssignCustomerComponent, {centered:true, size: 'md'});
    modalRef.componentInstance.selectedCustomerData = this.selectedItemData;
  }

  OpenEditModal=(data: any)=>{
    const modalRef = this.modalReference = this.modalService.open(EditPopUpComponent, {size: "lg"});
    modalRef.componentInstance.employeeId = data[1];
  }

  deleteCustomer(inputData: any){
    this.crudService.deleteCustomer(inputData[1]).subscribe(
      (data) => {
        console.log(data);
        
    },
    (err) => {
        console.log(err);
    }
    );   
  }

  OpenDeleteModal(data: any) {
      const modalRef = this.modalService.open(DeletePopUpComponent, {centered:true, size: 'sm'});
      modalRef.componentInstance.event.subscribe((rec: any) => {
          if(rec) this.deleteCustomer(data);
      })
  }



}

/* import { Component, enableProdMode, Injectable, OnInit, ViewChild } from '@angular/core';
import { CustomerModel } from 'src/app/models/customerModel';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { EditPopUpComponent } from '../edit-pop-up/edit-pop-up.component';
import { Router } from '@angular/router';
import { DeletePopUpComponent } from '../delete-pop-up/delete-pop-up.component';
import { PreviewPopUpComponent } from '../preview-pop-up/preview-pop-up.component';
import { CrudService } from 'src/app/services/crud.service';
import { AddPopUpComponent } from '../add-pop-up/add-pop-up.component';
import { DxDataGridComponent } from 'devextreme-angular';
import { AssignCustomerComponent } from '../assign-customer/assign-customer.component';


@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})

export class CustomerComponent implements OnInit {
  
  dataSource: CustomerModel[];
  modalReference: NgbModalRef;
  selectedItemData: any[] = [];
  constructor(
      private router: Router,
      private crudService: CrudService,
      private modalService: NgbModal
    )
    {  
      this.OpenPreviewModal = this.OpenPreviewModal.bind(this);
    }

  
  ngOnInit(): void {
      this.getCustomers();
  }

  OpenPreviewModal(data: any) {
    const modalRef = this.modalService.open(PreviewPopUpComponent, {centered:true, size: 'md'});
    modalRef.componentInstance.customerId = data[1];
  }

  
  getCustomers(){
    this.crudService.get().subscribe(
        (data) => {
            this.dataSource = data;
        },
        (err) => {
            console.log(err);
        }
    );
  }

  assignCustomer(){
    const modalRef = this.modalService.open(AssignCustomerComponent, {centered:true, size: 'md'});
    modalRef.componentInstance.selectedCustomerData = this.selectedItemData;
  }

  selectionChanged(data: any) {
    this.selectedItemData=data.selectedRowsData;
    this.updateBtnStates();
  }

  onToolbarPreparing(e: any) {

    e.toolbarOptions.items.unshift(
      {
        location:"before",
        widget: 'dxButton',
        options: {
          icon : "group",
          text: "Yeni Müşteri Ekle",
          onClick: this.OpenAddModal.bind(this)
        }
      }, {
        location:"before",
        widget: 'dxButton',
        options: {
            icon: 'card',
            text: "Müşteriyi Ata",
            onInitialized: (args: any) => {
              this.btnExportInstance = args.component;
            },
            disabled: !this.selectedItemData.length,
            onClick: this.assignCustomer.bind(this)
        }
      }
    );
  }
  private btnExportInstance: any = null;
  private updateBtnStates() {
    if (this.btnExportInstance !== null) {
      this.btnExportInstance.option({
        disabled: !this.selectedItemData.length
      });
    }
  }

  OpenAddModal = () => {
    const modalRef = this.modalService.open(AddPopUpComponent, {centered:true, size: 'lg'});
  }

  OpenEditModal=(data: any)=>{
    const modalRef = this.modalReference = this.modalService.open(EditPopUpComponent, {size: "lg"});
    modalRef.componentInstance.employeeId = data[1];
  }

  deleteCustomer(inputData: any){
    this.crudService.deleteCustomer(inputData[1]).subscribe(
      (data) => {
        console.log(data);
        
    },
    (err) => {
        console.log(err);
    }
    );   
  }

  OpenDeleteModal(data: any) {
      const modalRef = this.modalService.open(DeletePopUpComponent, {centered:true, size: 'sm'});
      modalRef.componentInstance.event.subscribe((rec: any) => {
          if(rec) this.deleteCustomer(data);
      })
  }

}
 */