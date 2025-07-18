import { Component, OnInit, DestroyRef, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GroceryListService } from '../../services/grocery-list.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { GroceryList } from '../../models/grocery-list.model';
import { GroceryListManagerComponent } from '../grocery-list-manager/grocery-list-manager.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, GroceryListManagerComponent],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  groceryLists: GroceryList[] = [];
  constructor(private groceryListService: GroceryListService) {}
  private readonly destroyRef = inject(DestroyRef);

  ngOnInit(): void {
    this.loadLists();
  }

  loadLists(): void {
    this.groceryListService.getGroceryLists().pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      next: (lists) => {
        this.groceryLists = lists.filter(l => l != null);
      },
      error: (err) => console.error('Error loading grocery lists:', err)
    });
  }
} 