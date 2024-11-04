package com.umich.cloudbite.service;

import org.springframework.stereotype.Service;
import org.springframework.web.context.annotation.SessionScope;

import com.umich.cloudbite.model.CartItem;
import com.umich.cloudbite.model.ShoppingCart;

@Service
@SessionScope // This annotation ensures each session has its own instance of the shopping cart
public class CartService {

    private ShoppingCart cart = new ShoppingCart();

    public ShoppingCart getCart() {
        return cart;
    }

    public void addToCart(CartItem item) {
        cart.addItem(item);
    }

    public void removeFromCart(CartItem item) {
        cart.removeItem(item);
    }
}