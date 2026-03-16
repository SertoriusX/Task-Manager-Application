import { Routes } from '@angular/router';
import { RegisterPage } from '../pages/register-page/register-page';
import { LoginPage } from '../pages/login-page/login-page';
import { Board } from '../pages/board/board';
import { ListDetail } from '../components/list/list-detail/list-detail';

export const routes: Routes = [

  { path: '', redirectTo: '/login', pathMatch: 'full' },
  {path:'board',component:Board},
  {path:'board/:id',component:Board},
    {path:'listDetail/:id',component:ListDetail},
  { path: 'register', component: RegisterPage },
  { path: 'login', component: LoginPage },
  { path: '**', redirectTo: '/login' },
];
