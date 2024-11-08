package com.umich.cloudbite.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import com.umich.cloudbite.model.CartItem;
import com.umich.cloudbite.model.ShoppingCart;
import com.umich.cloudbite.service.CartService;

@RestController
@RequestMapping("/api/cart")
public class CartController {

    @Autowired
    private CartService cartService;

    @PostMapping("/add")
    public ResponseEntity<ShoppingCart> addToCart(@RequestBody CartItem item) {
        cartService.addToCart(item);
        System.out.println("Added to cart: " + item.getName());
        return ResponseEntity.ok().build();
        
    }

    @PostMapping("/remove")
    public ResponseEntity<ShoppingCart> removeFromCart(@RequestParam(name = "Id") String itemId, @RequestParam(name = "quantity") int quantity) {
        
        CartItem item = cartService.findCartItemById(itemId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Item not found"));
        cartService.removeFromCart(item, quantity);
        return ResponseEntity.ok().build();  // Return the updated cart after removal
    }

    @GetMapping
    public ResponseEntity<ShoppingCart> getCart() {
        ShoppingCart cart = cartService.getCart();
        return ResponseEntity.ok(cart);
    }
}