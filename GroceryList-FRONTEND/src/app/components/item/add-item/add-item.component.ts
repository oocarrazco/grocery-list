import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { GroceryItem } from '../../../models/grocery-item.model';

@Component({
  selector: 'app-add-item',
  templateUrl: './add-item.component.html',
  styleUrls: ['./add-item.component.css'],
  standalone: true,
  imports: [FormsModule]
})
export class AddItemComponent {
  @Input() newItem: Partial<GroceryItem> = { name: '', quantity: 1, isPurchased: false };
  @Input() editMode: boolean = false;
  @Output() add = new EventEmitter<Partial<GroceryItem>>();
  @Output() edit = new EventEmitter<Partial<GroceryItem>>();

  addOrEditItem() {
    if (this.newItem.name && this.newItem.quantity) {
      if (this.editMode) {
        // Only update name, quantity, and updatedAt, preserve createdAt and other fields
        const edited = {
          ...this.newItem,
          name: this.newItem.name,
          quantity: this.newItem.quantity,
          updatedAt: new Date(),
          createdAt: this.newItem.createdAt // preserve createdAt if present
        };
        this.edit.emit(edited);
      } else {
        this.add.emit({ ...this.newItem });
      }
      this.newItem = { name: '', quantity: 1, isPurchased: false };
    }
  }
}
