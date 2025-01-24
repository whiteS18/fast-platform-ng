import { Routes } from '@angular/router';
import {LayoutComponent} from './layout/layout.component';
import {WelcomeComponent} from './pages/welcome/welcome.component';
import {LoginComponent} from './login/login.component';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/welcome' },
  {
    path: '',
    component: LayoutComponent, // 主布局
    children: [
      { path: 'welcome', component: WelcomeComponent },
      // 其他路由
    ]
  },
  { path: 'login', component: LoginComponent },


]
