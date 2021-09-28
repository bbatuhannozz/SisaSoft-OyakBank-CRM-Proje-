import { CrudService } from '../../services/crud.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserProfileModel } from 'src/app/models/userProfileModel';
import { UserDetailsModel } from 'src/app/models/userDetailsModel';
import { ToastrService } from 'ngx-toastr';
import validationEngine from "devextreme/ui/validation_engine"

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  userDetails: UserDetailsModel;
  userUpdateProfile:UserProfileModel;
  confirmNewPassword:string;
  
  isPopupVisible: boolean = false;


    constructor(private service: CrudService, private toastrService: ToastrService) {
      this.changeUserDetails=this.changeUserDetails.bind(this);
    }
  
  ngOnInit(): void {
    this.service.getUserProfile().subscribe(
      (res:any) => {
        this.userDetails = res;
      },
      err => {
        console.log(err);
      },
    );
    
  }
  closePopup=()=>{
    this.isPopupVisible= false;
  }

  resetValidation(){
    validationEngine.resetGroup('userData');
  }

  formValidation=(e:any)=>{
    let result = e.validationGroup.validate();
    if (result.isValid) {
        this.changeUserDetails();
    }
    else
    this.toastrService.error("Lütfen bilgileriniz tekrar gözden geçiriniz");
  }

  checkNewPassword(params:any){
    if(params.value.length >= 4 || params.value == "") 
      return true;
    else
      return false;
  }

  changeUserDetails(){
    this.switchUserDetails();
    this.service.changeUserDetails(this.userDetails).subscribe(
      (data:any)=>{
        this.toastrService.success("Bilgileriniz başarıyla güncellendi");      
      },
      err => {
        console.log(err);
        this.toastrService.error(err.error.message);
      },
      );
  }

  matchUserDetails=()=>{
    this.userUpdateProfile={
      formUserName:this.userDetails.userName,
      formEmail:this.userDetails.email,
      formFullName:this.userDetails.fullName
    }; 
  }

  switchUserDetails(){
    this.userDetails={
      userName:this.userUpdateProfile.formUserName,
      email:this.userUpdateProfile.formEmail,
      fullName:this.userUpdateProfile.formFullName,
      password:this.userUpdateProfile.formPassword,
      newPassword:this.userUpdateProfile.formNewPassword
    }
  }

  passwordComparison = () => {
    if(this.userUpdateProfile.formNewPassword == null)
      return "";
    else
      return this.userUpdateProfile.formNewPassword
  };
  
}
