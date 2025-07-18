import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { GroceryListManagerComponent } from './components/grocery-list-manager/grocery-list-manager.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { authGuard, guestGuard } from './guards/auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent, canActivate: [authGuard] },
  { path: 'login', component: LoginComponent, canActivate: [guestGuard] },
  { path: 'lists', component: GroceryListManagerComponent, canActivate: [authGuard] },
  // Optional deep-link to open specific list ID
  { path: 'lists/:id', component: GroceryListManagerComponent, canActivate: [authGuard] },
  { path: '**', redirectTo: 'lists' }
];
