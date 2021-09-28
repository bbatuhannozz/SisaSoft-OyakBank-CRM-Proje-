import { AfterViewInit, Component, ElementRef, OnInit } from '@angular/core';
import { CustomerRateModel } from 'src/app/models/customerAssignmentRateModel';
import { CrudService } from 'src/app/services/crud.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, AfterViewInit {
    rate: CustomerRateModel;
    areas:Area[]=[];
  constructor(private elementRef: ElementRef, private crudService: CrudService) { 
    
  }

  ngAfterViewInit() {
    this.elementRef.nativeElement.ownerDocument
        .body.style.backgroundColor = '#ffffff';
    
        
  }
  ngOnInit(): void {
      this.fillPieChart();
  }
  
  fillPieChart(){
      this.crudService.getCustomerAssignmentRate().subscribe(
        (res:any) => {
          this.rate = res;
          this.areas = [{
            assignmentStatus: "Ataması Yapılan Müşteriler",
            count: this.rate.assigned
            }, {
            assignmentStatus: "Ataması Yapılmayanlar Müşteriler",
            count: this.rate.unassigned
        }];
          
        },
        err => {
          console.log(err);
        },
      );
  }

  pointClickHandler(e: { target: any; }) {
      this.toggleVisibility(e.target);
  }

  legendClickHandler (e: { target: any; component: { getAllSeries: () => { getPointsByArg: (arg0: any) => any[]; }[]; }; }) {
      let arg = e.target,
          item = e.component.getAllSeries()[0].getPointsByArg(arg)[0];

      this.toggleVisibility(item);
  }

  toggleVisibility(item: { isVisible: () => any; hide: () => void; show: () => void; }) {
      if(item.isVisible()) {
          item.hide();
      } else { 
          item.show();
      }
  }

}

export class Area {
    assignmentStatus: string;
    count: number;
}
