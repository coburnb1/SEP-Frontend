import { Routes } from '@angular/router';
import {HomeComponent} from "./pages/home/home.component";
//import {GroupPageComponent} from "./pages/group-page/group-page.component";
import {OrganizationPageComponent} from "./pages/organization-page/organization-page.component";
import {SettingsComponent} from "./pages/settings/settings.component";
import {LoginComponent} from "./pages/login/login.component";
import {AuthGuard} from "./guards/auth.guard";

export const routes: Routes = [
  {
    path: '',
    canActivate: [AuthGuard],
    loadComponent: () => import('./pages/home/home.component').then(m => m.HomeComponent)
  },
  {
    path: 'login',
    loadComponent: () => import('./pages/login/login.component').then(m => m.LoginComponent)
  },
  {path: 'login', component: LoginComponent, pathMatch: 'full'},
  {path: 'home', component: HomeComponent, pathMatch: 'full'},
  //{path: 'groups', component: GroupPageComponent, pathMatch: 'full'},
  {path: 'orgs', component: OrganizationPageComponent, pathMatch: 'full'},
  {path: 'settings', component: SettingsComponent, pathMatch: 'full'}
];
