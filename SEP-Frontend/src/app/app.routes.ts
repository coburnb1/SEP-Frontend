import { Routes } from '@angular/router';
import {HomeComponent} from "./pages/home/home.component";
//import {GroupPageComponent} from "./pages/group-page/group-page.component";
import {OrganizationPageComponent} from "./pages/organization-page/organization-page.component";
import {SettingsComponent} from "./pages/settings/settings.component";
import {LoginComponent} from "./pages/login/login.component";
import {AuthGuard} from "./guards/auth.guard";
import {GroupPageComponent} from "./pages/group-page/group-page.component";

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
  {path: 'groups/:groupNumber', component: GroupPageComponent},
  {
    path: 'orgs/:orgId',
    component: OrganizationPageComponent
  },
  {path: 'settings', component: SettingsComponent, pathMatch: 'full'}
];
