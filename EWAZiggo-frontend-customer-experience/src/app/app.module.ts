import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing.module';
import {EmployeeComponent} from './components/employee/employee.component';
import {MaterialModule} from './material.module';
import {ChatComponent} from './components/employee/chat/chat.component';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ChatService} from './services/chat.service';
import {UsersComponent} from './components/admin/users/users.component';
import {EmployeeService} from './services/employee.service';
import {HomeComponent} from './components/home/home.component';
import {QuestionnaireComponent} from './components/questionnaire/questionnaire.component';
import {QuestionnaireService} from './services/questionnaire.service';
import {ClientChatComponent} from './components/client-chat/client-chat.component';
import {AdminComponent} from './components/admin/admin.component';
import {CreateEmployeeComponent} from './components/admin/users/create-employee/create-employee.component';
import {AlertComponent} from './components/customer/_components';
import {LoginComponent} from './components/customer/login';
import {RegisterComponent} from './components/customer/register';
import {CustomMaterialModule} from './components/customer/core/material.module';
import {CloseDialogComponent} from './components/employee/chat/close-dialog/close-dialog.component';
import {RatingDialogComponent} from './components/client-chat/rating-dialog/rating-dialog.component';
import {StatisticsComponent} from './components/admin/statistics/statistics.component';
import {ChartsModule} from 'ng2-charts';
import {QuestionnaireManagerComponent} from './components/admin/questionnaire-manager/questionnaire-manager.component';
import {ErrorDialogComponent} from './components/client-chat/error-dialog/error-dialog.component';
import {RegisterDialogComponent} from './components/customer/register/register-dialog/register-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    EmployeeComponent,
    ChatComponent,
    ClientChatComponent,
    AdminComponent,
    UsersComponent,
    HomeComponent,
    QuestionnaireComponent,
    CreateEmployeeComponent,
    AlertComponent,
    LoginComponent,
    RegisterComponent,
    CloseDialogComponent,
    RatingDialogComponent,
    StatisticsComponent,
    QuestionnaireManagerComponent,
    ErrorDialogComponent,
    RegisterDialogComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    CustomMaterialModule,
    ChartsModule,
  ],
  providers: [ChatService, EmployeeService, QuestionnaireService],
  entryComponents: [CreateEmployeeComponent, CloseDialogComponent, RatingDialogComponent, ErrorDialogComponent, RegisterDialogComponent],
  bootstrap: [AppComponent]
})
export class AppModule {
}
