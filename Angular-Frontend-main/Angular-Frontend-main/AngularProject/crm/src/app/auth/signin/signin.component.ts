import { AfterViewInit, Component, ElementRef, OnInit } from '@angular/core';
import {FormGroup, FormControl, Validators, FormBuilder, NgForm  } from "@angular/forms";
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit , AfterViewInit{

  imagePath = "../../assets/oyak.png"

  formModel = {
    UserName: '',
    Password: ''
  }
  constructor(private service: AuthService, private router: Router, private toastr: ToastrService, private elementRef: ElementRef) {

    // this.onSubmit=this.onSubmit.bind(this);
   }
   ngAfterViewInit() {
    this.elementRef.nativeElement.ownerDocument
        .body.style.backgroundColor = '#ED1B2E';
        
}

  ngOnInit() {
    if (localStorage.getItem('token') != null)
      this.router.navigateByUrl('/signin');
  }

  onSubmit(form: NgForm) {
    this.service.login(form.value).subscribe(
      (res: any) => {
        localStorage.setItem('token', res.token);
        this.router.navigateByUrl('/main/home');
      },
      err => {
        if (err.status == 400)
          this.toastr.info('Gerçersiz kullanıcı adı ya da şifre.', 'Giriş başarısız.');
        else
          console.log(err);
      }
    );
  }

}
