import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TaskListComponent } from './task-list/task-list.component';
import {TodoComponent} from './todo/todo.component';
import { LoginComponent } from './auth/login/login.component';
import {SignupComponent} from './auth/signup/signup.component';
import { AuthGuard } from './auth/auth-data/auth.guard';

const routes: Routes = [
  {path: '', component: TaskListComponent},
  {path: 'create', component: TodoComponent, canActivate: [AuthGuard] },
  {path: 'edit/:postId', component: TodoComponent, canActivate: [AuthGuard]},
  {path: 'login', component: LoginComponent},
  {path: 'signup', component: SignupComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule { }
