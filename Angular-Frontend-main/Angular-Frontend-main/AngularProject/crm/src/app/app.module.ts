import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { DxButtonModule, DxDataGridModule, DxDropDownButtonModule, DxListModule, DxPieChartModule} from 'devextreme-angular';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { Routes, RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthModule } from './auth/auth.module';
import { PagesModule } from './pages/pages.module';
import { DxoPopupModule, DxoToolbarModule } from 'devextreme-angular/ui/nested';
import { AuthService } from './services/auth.service';
import { AuthInterceptor } from './guards/auth.interceptor';
import { ToastrModule } from 'ngx-toastr';
import { FullCalendarModule } from '@fullcalendar/angular';


const routes: Routes = [];

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    DxListModule,
    FullCalendarModule,
    FormsModule,
    PagesModule,
    AuthModule,
    DxDropDownButtonModule,
    DxPieChartModule,
    AppRoutingModule,
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    DxButtonModule,
    DxDataGridModule,
    ReactiveFormsModule,
    FormsModule,
    DxoPopupModule,
    DxoToolbarModule,
    RouterModule.forRoot(routes),
    ToastrModule.forRoot({
      positionClass:"toast-bottom-right"
    })
  ],
  providers: [AuthService, {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true
  }],
  bootstrap: [AppComponent],
  exports: [RouterModule]
})
export class AppModule { }