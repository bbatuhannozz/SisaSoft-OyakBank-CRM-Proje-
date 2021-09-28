import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChatbotComponent } from './chatbot/chatbot.component';
import { CustomerComponent } from './customer/customer.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';
import { LeftsideComponent } from './leftside/leftside.component';
import { MainComponent } from './main/main.component';
import { NavbarComponent } from './navbar/navbar.component';
import { TableComponent } from './table/table.component';
import { LoginGuard } from '../guards/login.guard';
import { SigninComponent } from '../auth/signin/signin.component';
import { SignupComponent } from '../auth/signup/signup.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { EmployeeComponent } from './employee/employee.component';

const routes: Routes = [
  {path:"main",
  component: MainComponent, 
  children:[
    {path: "customer",component: CustomerComponent,canActivate:[LoginGuard]},
    {path: "employee",component: EmployeeComponent,canActivate:[LoginGuard]},
    {path: "home", component: HomeComponent,canActivate:[LoginGuard]},
    {path: "chatbot",component: ChatbotComponent,canActivate:[LoginGuard]},
    {path: "user-profile",component: UserProfileComponent,canActivate:[LoginGuard]},
]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
