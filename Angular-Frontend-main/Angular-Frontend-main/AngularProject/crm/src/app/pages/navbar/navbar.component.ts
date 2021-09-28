import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CrudService } from 'src/app/services/crud.service';
import { Observable } from 'rxjs';
import { NavbarProfileInfoModel } from 'src/app/models/navbarProfileInfoModel';

export class SimpleObject {
  value: number | string;
  name: string;
  icon?: string;
  badge?: string;
}
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  profileSettings: SimpleObject[] = [
    { value: 1, name: "Profile", icon: "user" },
    // { value: 4, name: "Messages", icon: "email", badge: "5" },
    // { value: 2, name: "Friends", icon: "group" },
    { value: 3, name: "Exit", icon: "runner"}
];

  profileInfo:NavbarProfileInfoModel;
  profileName:string;

  constructor(private router: Router, private service: CrudService) {  }

  ngOnInit(): void {
    this.service.getUserProfile().subscribe(
      (res:any) => {
        this.profileInfo = res;
        this.profileName=this.profileInfo.fullName;
      },
      err => {
        console.log(err);
      },
    );
  }
	onItemClick(e: { itemData: { name: any; }; }) {
    if ( e.itemData.name === "Exit")
      this.onLogout(); 
    else if(e.itemData.name==="Profile")
      this.router.navigate(['/main/user-profile']);
	}

  onLogout() {
    localStorage.removeItem('token');
    this.router.navigate(['/signin']);
  }


}

function notify(arg0: any, arg1: string, arg2: number) {
  throw new Error('Function not implemented.');
}

