import { GroceryItem } from './grocery-item.model';
export interface GroceryList {
  id: number;
  name: string;
  items: GroceryItem[];
  createdAt: Date;
  updatedAt: Date;
}
