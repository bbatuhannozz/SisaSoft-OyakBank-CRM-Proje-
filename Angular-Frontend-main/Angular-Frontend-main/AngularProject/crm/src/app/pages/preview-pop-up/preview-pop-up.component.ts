import { Component, EventEmitter, OnInit, Input, Output } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { CustomerModel } from 'src/app/models/customerModel';
import { CrudService } from 'src/app/services/crud.service';

@Component({
  selector: 'preview-pop-up',
  templateUrl: './preview-pop-up.component.html',
  styleUrls: ['./preview-pop-up.component.css']
})
export class PreviewPopUpComponent implements OnInit {

  @Input() isPopupVisible: boolean;
  @Input() customerId: number;
  @Output() postMessageEvent = new EventEmitter<boolean>();
  customer: CustomerModel = new CustomerModel();
  
  constructor( 
    public activeModal: NgbActiveModal,
    public crudService: CrudService)
  {
    this.isPopupVisible = true;
    this.closeModal = this.closeModal.bind(this);
  }

  closeModal(){
    this.isPopupVisible = false;
    this.postMessageEvent.emit(false);
  }

  ngOnInit(): void {
    this.crudService.getCustomer(this.customerId).subscribe(
      (data) => {
          this.customer = data;
      },
      (err) => {
          console.log(err);
      }
    );
  }

}