import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { GroceryListManagerComponent } from './components/grocery-list-manager/grocery-list-manager.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';

export const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'login', component: LoginComponent },
  { path: 'lists', component: GroceryListManagerComponent },
  // Optional deep-link to open specific list ID
  { path: 'lists/:id', component: GroceryListManagerComponent },
  { path: '**', redirectTo: 'lists' }
];
