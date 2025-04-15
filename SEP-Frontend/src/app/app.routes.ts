import { Routes } from '@angular/router';
import {HomeComponent} from "./pages/home/home.component";
import {GroupPageComponent} from "./pages/group-page/group-page.component";

export const routes: Routes = [
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: 'home', component: HomeComponent, pathMatch: 'full'},
  {path: 'group', component: GroupPageComponent, pathMatch: 'full'},
];
