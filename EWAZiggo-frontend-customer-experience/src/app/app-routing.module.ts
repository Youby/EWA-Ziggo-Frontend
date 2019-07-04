import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {EmployeeComponent} from './components/employee/employee.component';
import {ChatComponent} from './components/employee/chat/chat.component';
import {ClientChatComponent} from './components/client-chat/client-chat.component';
import {AdminComponent} from './components/admin/admin.component';
import {UsersComponent} from './components/admin/users/users.component';
import {HomeComponent} from './components/home/home.component';
import {QuestionnaireComponent} from './components/questionnaire/questionnaire.component';
import {LoginComponent} from './components/customer/login';
import {RegisterComponent} from './components/customer/register';
import {StatisticsComponent} from './components/admin/statistics/statistics.component';
import {QuestionnaireManagerComponent} from './components/admin/questionnaire-manager/questionnaire-manager.component';

const routes: Routes = [

  {
    path: 'employee',
    component: EmployeeComponent
    , children: [
      {path: 'chats', component: ChatComponent}]
  },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  {
    path: 'client-chat',
    component: ClientChatComponent
  },
  {
    path: 'questionnaire',
    component: QuestionnaireComponent

  },
  {
    path: 'admin',
    component: AdminComponent
    , children: [
      {path: 'users', component: UsersComponent},
      {path: 'statistics', component: StatisticsComponent},
      {path: 'questionnaire', component: QuestionnaireManagerComponent},
      { path: '**', redirectTo: 'statistics', pathMatch: 'full' }]
  },
  {
    path: 'home',
    component: HomeComponent
  },
  { path: '**', redirectTo: 'home', pathMatch: 'full' }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
