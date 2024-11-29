package com.umich.cloudbite.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import com.umich.cloudbite.service.MenuService;
import com.umich.cloudbite.model.MenuItem;

@RestController
@RequestMapping("/api/menu/admin")
public class AdminController {

    @Autowired
    private MenuService service;

    @GetMapping("/items")
    public ResponseEntity<List<MenuItem>> getAllMenuItems() {
        List<MenuItem> items = service.getAllMenuItems();
        return ResponseEntity.ok(items);
    }

    @PostMapping("/add")
    public ResponseEntity<MenuItem> addToMenu(@RequestBody MenuItem item) {
        // setvice.addToMenu(item);
        // System.out.println("Added to cart: " + item.getName());
        return ResponseEntity.ok().build();

    }

    // @DeleteMapping("/remove")
    // public ResponseEntity<ShoppingCart> removeFromCart(@RequestParam(name = "Id")
    // String itemId,
    // @RequestParam(name = "quantity") int quantity) {

    // CartItem item = cartService.findCartItemById(itemId)
    // .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Item
    // not found"));
    // cartService.removeFromCart(item, quantity);
    // return ResponseEntity.ok().build(); // Return the updated cart after removal
    // }
}