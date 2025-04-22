import { Routes } from '@angular/router';
import {HomeComponent} from "./pages/home/home.component";
import {GroupPageComponent} from "./pages/group-page/group-page.component";
import {OrganizationPageComponent} from "./pages/organization-page/organization-page.component";

export const routes: Routes = [
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: 'home', component: HomeComponent, pathMatch: 'full'},
  {path: 'groups', component: GroupPageComponent, pathMatch: 'full'},
  {path: 'orgs', component: OrganizationPageComponent, pathMatch: 'full'}
];
