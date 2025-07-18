

import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { GroceryListService } from '../../services/grocery-list.service';
import { ItemService } from '../../services/item.service';
import { GroceryList } from '../../models/grocery-list.model';
import { GroceryItem } from '../../models/grocery-item.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AddItemComponent } from '../item/add-item/add-item.component';
import { ItemListComponent } from '../item/item-list/item-list.component';
import { LoggingService } from '../../services/logging.service';
import { ConfirmationService } from '../../services/confirmation.service';

@Component({
  selector: 'app-grocery-list-manager',
  templateUrl: './grocery-list-manager.component.html',
  styleUrls: ['./grocery-list-manager.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule, AddItemComponent, ItemListComponent]
})
export class GroceryListManagerComponent implements OnInit {
  @Output() listChanged = new EventEmitter<void>();
  groceryLists: GroceryList[] = [];
  selectedList: GroceryList | null = null;
  listName: string = '';
  isEditing: boolean = false;
  error: string = '';
  itemEditMode: boolean = false;
  itemToEdit: Partial<GroceryItem> | null = null;

  constructor(
    private groceryListService: GroceryListService,
    private itemService: ItemService,
    private loggingService: LoggingService,
    private confirmationService: ConfirmationService
  ) {}

  ngOnInit() {
    this.loggingService.log('GroceryListManagerComponent initialized');
    this.loadLists();
  }

  loadLists() {
    this.loggingService.log('Loading grocery lists');
    this.groceryListService.getGroceryLists().subscribe({
      next: lists => {
        this.loggingService.log('Grocery lists loaded', lists);
        this.groceryLists = lists;
        this.listChanged.emit();
      },
      error: () => this.error = 'Failed to load lists.'
    });
  }

  saveList() {
    if (!this.listName.trim()) return;
    if (this.isEditing && this.selectedList) {
      // Only update the name
      this.groceryListService.renameGroceryList(this.selectedList.id, this.listName).subscribe({
        next: () => {
          this.loadLists();
          this.cancelEdit();
        },
        error: () => this.error = 'Failed to rename list.'
      });
    } else {
      this.groceryListService.addGroceryList(this.listName).subscribe({
        next: () => {
          this.loadLists();
          this.listName = '';
        },
        error: () => this.error = 'Failed to create list.'
      });
    }
  }

  editList(list: GroceryList) {
    this.selectedList = list;
    this.listName = list.name;
    this.isEditing = true;
  }

  deleteList(list: GroceryList) {
    this.confirmationService.confirm(`Delete list "${list.name}"?`).then(accepted => {
      if (accepted) {
        this.groceryListService.deleteGroceryList(list.id).subscribe({
          next: () => this.loadLists(),
          error: () => this.error = 'Failed to delete list.'
        });
      }
    });
  }


  selectListForItems(list: GroceryList) {
    this.selectedList = list;
    this.isEditing = false;
    this.listName = '';
    // Optionally, reload the list from API for latest items
  }

  // Add item using POST /api/Item
  addItem(newItem: Partial<GroceryItem> = { name: '', quantity: 1, isPurchased: false }) {
    if (!this.selectedList || !newItem.name || !newItem.quantity) return;
    const itemToAdd = {
      name: newItem.name,
      quantity: newItem.quantity,
      isPurchased: !!newItem.isPurchased,
      groceryListId: this.selectedList.id
    };
    this.itemService.addGroceryItem({ item: itemToAdd }).subscribe({
      next: (createdItem) => {
        this.loggingService.log('Backend returned new item:', createdItem);
        this.selectedList!.items.push(createdItem);
        this.loadLists();
      },
      error: (err) => {
        this.error = 'Failed to add item.';
        this.loggingService.log('Backend error:', err);
      }
    });
  }

  startEditItem(item: GroceryItem) {
    this.itemEditMode = true;
    this.itemToEdit = { ...item };
  }

  editItemSubmit(edited: Partial<GroceryItem>) {
    if (!this.selectedList || !edited.id) return;
    // Find the original item to preserve createdAt and other fields
    const original = this.selectedList.items.find(i => i.id === edited.id);
    const updatePayload = {
      id: edited.id,
      item: {
        ...original,
        name: edited.name,
        quantity: edited.quantity,
        updatedAt: new Date()
        // Do not set createdAt when editing
      }
    };
    this.itemService.updateGroceryItem(updatePayload).subscribe({
      next: (updatedItem) => {
        this.loggingService.log('Backend returned updated item:', updatedItem);
        // Reload lists and re-select the current list to update the view
        this.groceryListService.getGroceryLists().subscribe({
          next: lists => {
            this.groceryLists = lists;
            // Re-select the current list by ID
            const reselected = lists.find(l => l.id === this.selectedList?.id);
            this.selectedList = reselected ?? null;
            this.listChanged.emit();
            this.itemEditMode = false;
            this.itemToEdit = null;
          },
          error: () => {
            this.error = 'Failed to reload lists.';
            this.itemEditMode = false;
            this.itemToEdit = null;
          }
        });
      },
      error: (err) => {
        this.error = 'Failed to update item.';
        this.loggingService.log('Backend error:', err);
        this.itemEditMode = false;
        this.itemToEdit = null;
      }
    });
  }

  // ...existing code...

  deleteItem(itemId: number) {
    if (!this.selectedList) return;
    const item = this.selectedList.items.find(i => i.id === itemId);
    if (!item) return;
    this.confirmationService.confirm(`Delete item "${item.name}"?`).then(accepted => {
      if (accepted) {
        this.itemService.deleteGroceryItem({ id: itemId }).subscribe({
          next: () => {
            // Remove item from selectedList.items
            this.selectedList!.items = this.selectedList!.items.filter(i => i.id !== itemId);
            this.loadLists();
          },
          error: () => this.error = 'Failed to delete item.'
        });
      }
    });
  }

  toggleItem(item: GroceryItem) {
    if (!this.selectedList) return;
    const idx = this.selectedList.items.findIndex(i => i.id === item.id);
    if (idx === -1) return;
    const newStatus = !item.isPurchased;
    this.itemService.togglePurchaseStatus({ id: item.id, isPurchased: newStatus }).subscribe({
      next: updatedItem => {
        // Only update isPurchased and updatedAt, preserve other fields. Fallback to original updatedAt if missing.
        this.selectedList!.items[idx] = {
          ...item,
          isPurchased: updatedItem.isPurchased,
          updatedAt: updatedItem.updatedAt ?? item.updatedAt
        };
        this.loadLists();
      },
      error: () => this.error = 'Failed to toggle item.'
    });
  }

  cancelEdit() {
    this.selectedList = null;
    this.listName = '';
    this.isEditing = false;
  }
}
