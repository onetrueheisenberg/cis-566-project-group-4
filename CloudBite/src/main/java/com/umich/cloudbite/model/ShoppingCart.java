package com.umich.cloudbite.model;

import java.util.ArrayList;
import java.util.List;

public class ShoppingCart {
    private List<CartItem> items = new ArrayList<>();
    private double total;

    public void addItem(CartItem item) {
        this.items.add(item);
        this.total += item.getPrice() * item.getQuantity();
    }

    public void removeItem(CartItem item) {
        this.items.remove(item);
        this.total -= item.getPrice() * item.getQuantity();
    }

    // Method to update an item's quantity
    public void updateItemQuantity(CartItem item, int quantity) {
        if(this.items.contains(item)) {
            item.setQuantity(quantity);
            recalculateTotal();
        }
    }

    // Recalculates the total price of the cart
    private void recalculateTotal() {
        total = 0;
        for (CartItem item : items) {
            total += item.getPrice() * item.getQuantity();
        }
    }

    public List<CartItem> getItems() { return items; }
    public double getTotal() { return total; }
}
