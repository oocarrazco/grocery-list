import { Component, Input, Output, EventEmitter } from '@angular/core';
import { GroceryItem } from '../../../models/grocery-item.model';
import { CommonModule, DatePipe } from '@angular/common';

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.css'],
  standalone: true,
  imports: [CommonModule, DatePipe]
})
export class ItemListComponent {
  @Input() groceryItems: GroceryItem[] = [];
  @Output() edit = new EventEmitter<GroceryItem>();
  @Output() delete = new EventEmitter<number>();
  @Output() toggle = new EventEmitter<GroceryItem>();

  editItem(item: GroceryItem) {
    this.edit.emit(item);
  }
  deleteItem(id: number) {
    this.delete.emit(id);
  }
  togglePurchased(item: GroceryItem) {
    this.toggle.emit(item);
  }
}
