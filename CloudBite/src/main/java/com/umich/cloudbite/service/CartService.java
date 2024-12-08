package com.umich.cloudbite.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.context.annotation.SessionScope;

import com.umich.cloudbite.model.CartItem;
import com.umich.cloudbite.model.ShoppingCart;
import com.umich.cloudbite.repository.CartRepository;


@Service
@SessionScope // This annotation ensures each session has its own instance of the shopping
              // cart
public class CartService {

    private ShoppingCart cart = new ShoppingCart();

    @Autowired
    private CartRepository cartItemRepository;

    public ShoppingCart getCart() {
        return cart;
    }

    public void addToCart(CartItem item) {
        updateOrAddItem(item);
    }

    public void removeFromCart(CartItem item, int quantity) {
        cart.removeItem(item, quantity); // Pass the quantity to be removed
        CartItem updatedItem = cart.getItems().stream()
                .filter(i -> i.getId().equals(item.getId()))
                .findFirst()
                .orElseThrow(() -> new IllegalArgumentException("Item not found in the cart"));
        System.out.println("item service " + updatedItem.getQuantity());
        if (updatedItem.getQuantity() <= 0) {
            cartItemRepository.delete(updatedItem);
        } else {
            cartItemRepository.save(updatedItem);
            System.out.println("service" + updatedItem.getQuantity());
        }
    }

    private void updateOrAddItem(CartItem newItem) {
        Optional<CartItem> existingItem = cart.getItems().stream()
                .filter(item -> item.getId().equals(newItem.getId()))
                .findFirst();

        if (existingItem.isPresent()) {
            // Update the quantity of the existing item
            CartItem itemToUpdate = existingItem.get();
            itemToUpdate.setQuantity(itemToUpdate.getQuantity() + newItem.getQuantity());
            cart.addItem(newItem);
            cartItemRepository.save(itemToUpdate); // Update the item in the database
        } else {
            // Add the new item to the cart and save it to the database
            cart.addItem(newItem);
            cartItemRepository.save(newItem); // Save the new item to the database
        }
        cart.recalculateTotal(); // Update the total after modifying the cart
    }

    public void updateItemQuantity(String itemId, int newQuantity) {
        CartItem item = cart.getItems().stream()
                .filter(i -> i.getId().equals(itemId))
                .findFirst()
                .orElseThrow(() -> new IllegalArgumentException("Item not found in the cart"));
        item.setQuantity(newQuantity);
        cart.recalculateTotal();
        cartItemRepository.save(item); // Save the updated item to the database
    }

    public Optional<CartItem> findCartItemById(String itemId) {
        // Fetch the item from the repository
        return cartItemRepository.findById(itemId);
    }

    public List<CartItem> getAllCartItems() {
        return cartItemRepository.findAll(); // Assuming ShoppingCart has a method getItems() that returns List<CartItem>
    }
}