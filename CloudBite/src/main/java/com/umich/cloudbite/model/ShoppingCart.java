package com.umich.cloudbite.model;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

public class ShoppingCart {
    private List<CartItem> items = new ArrayList<>();
    private double total;

    public void addItem(CartItem newItem) {
        Optional<CartItem> existingItem = items.stream()
                .filter(item -> item.getId().equals(newItem.getId()))
                .findFirst();

        if (existingItem.isPresent()) {
            existingItem.get().setQuantity(existingItem.get().getQuantity() + newItem.getQuantity());
        } else {
            items.add(newItem);
        }
        recalculateTotal();
    }

    public void removeItem(CartItem itemToRemove, int quantity) {
        Optional<CartItem> foundItem = items.stream()
            .filter(item -> item.getId().equals(itemToRemove.getId()))
            .findFirst();

        if (foundItem.isPresent()) {
        	System.out.println(foundItem.get().getName());
            CartItem item = foundItem.get();
            int newQuantity = item.getQuantity() - quantity;
            if (newQuantity > 0) {
                item.setQuantity(newQuantity);
                System.out.println("item quan"+item.getQuantity());
            } else {
                items.remove(item);
            }
            recalculateTotal();
        }
    }

    public void updateItemQuantity(String itemId, int newQuantity) {
        items.stream()
                .filter(item -> item.getId().equals(itemId))
                .findFirst()
                .ifPresent(item -> {
                    item.setQuantity(newQuantity);
                    recalculateTotal();
                });
    }

    public void recalculateTotal() {
        total = items.stream()
                     .mapToDouble(item -> item.getPrice() * item.getQuantity())
                     .sum();
    }

    public List<CartItem> getItems() { return new ArrayList<>(items); }
    public double getTotal() { return total; }
}