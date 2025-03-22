import { Component, OnInit } from '@angular/core';
import { OrderService, Order } from '../services/order.service';
import { InventoryService } from '../services/inventory.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class OrdersComponent implements OnInit {
  orders: Order[] = [];
  inventory: any[] = [];
  newOrder: Order = { customerName: '', items: [], totalAmount: 0 };

  constructor(private orderService: OrderService, private inventoryService: InventoryService) {}

  ngOnInit() {
    this.fetchOrders();
    this.fetchInventory();
  }

  /** ✅ Fetch Orders */
  fetchOrders() {
    this.orderService.getOrders().subscribe({
      next: (data) => {
        console.log("✅ Orders Fetched:", data);
        this.orders = data;
      },
      error: (error) => {
        console.error("❌ Error fetching orders:", error);
      }
    });
  }

  /** ✅ Fetch Inventory */
  fetchInventory() {
    this.inventoryService.getInventory().subscribe({
      next: (data) => {
        this.inventory = data;
      },
      error: (error) => {
        console.error("❌ Error fetching inventory:", error);
      }
    });
  }

  /** ✅ Handle Item Selection from Dropdown */
  onItemSelect(event: Event) {
    const selectedItemId = (event.target as HTMLSelectElement).value;
    const item = this.inventory.find(i => i._id === selectedItemId);
    
    if (item) {
      this.addItem(item);
    }
  }

  /** ✅ Add Selected Item to Order */
  addItem(item: any) {
    const existingItem = this.newOrder.items.find(i => i.itemId === item._id);
    
    if (existingItem) {
      alert("⚠ This item is already added to the order.");
      return;
    }

    this.newOrder.items.push({ 
      itemId: item._id, 
      itemName: item.item, 
      quantity: 1, 
      price: item.price 
    });

    this.calculateTotalAmount();
  }

  /** ✅ Calculate Total Order Amount */
  calculateTotalAmount() {
    this.newOrder.totalAmount = this.newOrder.items.reduce((sum, item) => sum + item.quantity * item.price, 0);
  }

  /** ✅ Add Order */
  addOrder() {
    if (!this.newOrder.customerName.trim() || this.newOrder.items.length === 0) {
      alert("⚠ Please enter customer name and select at least one item.");
      return;
    }

    const orderPayload = {
      customerName: this.newOrder.customerName,
      items: this.newOrder.items.map(item => ({
        itemId: item.itemId,
        itemName: item.itemName,
        quantity: item.quantity,
        price: item.price
      })),
      totalAmount: this.newOrder.totalAmount
    };

    this.orderService.addOrder(orderPayload).subscribe({
      next: () => {
        alert("✅ Order placed successfully!");
        this.fetchOrders();
        this.newOrder = { customerName: '', items: [], totalAmount: 0 };
      },
      error: (error) => {
        console.error("❌ Error placing order:", error);
        alert(`❌ Failed to place order: ${error.error?.message || 'Unknown error'}`);
      }
    });
  }

  /** ✅ Mark Order as Completed */
  completeOrder(orderId: string | undefined) {
    if (!orderId) {
      alert("❌ Order ID is missing!");
      return;
    }

    this.orderService.updateOrderStatus(orderId, "Completed").subscribe({
      next: () => {
        alert("✅ Order marked as completed!");
        this.fetchOrders();
      },
      error: (error) => {
        console.error("❌ Error updating order status:", error);
      }
    });
  }

  /** ✅ Delete Order */
  deleteOrder(orderId: string | undefined) {
    if (!orderId) {
      alert("❌ Order ID is missing!");
      return;
    }

    if (confirm("Are you sure you want to delete this order?")) {
      this.orderService.deleteOrder(orderId).subscribe({
        next: () => {
          alert("✅ Order deleted successfully!");
          this.fetchOrders();
        },
        error: (error) => {
          console.error("❌ Error deleting order:", error);
        }
      });
    }
  }
}
