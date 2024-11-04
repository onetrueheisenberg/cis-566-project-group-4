package com.umich.cloudbite.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.umich.cloudbite.model.CartItem;
import com.umich.cloudbite.model.ShoppingCart;
import com.umich.cloudbite.service.CartService;

@RestController
@RequestMapping("/api/cart")
public class CartController {

    @Autowired
    private CartService cartService;

    @PostMapping("/add")
    public ResponseEntity<Void> addToCart(@RequestBody CartItem item) {
        cartService.addToCart(item);
        return ResponseEntity.ok().build();
    }

    @PostMapping("/remove")
    public ResponseEntity<Void> removeFromCart(@RequestBody CartItem item) {
        cartService.removeFromCart(item);
        return ResponseEntity.ok().build();
    }

    @GetMapping
    public ResponseEntity<ShoppingCart> getCart() {
        ShoppingCart cart = cartService.getCart();
        return ResponseEntity.ok(cart);
    }
}