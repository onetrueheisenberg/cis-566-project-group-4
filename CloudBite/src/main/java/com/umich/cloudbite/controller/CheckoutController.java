package com.umich.cloudbite.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.umich.cloudbite.model.CartItem;
import com.umich.cloudbite.model.CheckoutItem;
import com.umich.cloudbite.service.CartService;
import com.umich.cloudbite.service.CheckoutItemService;

@RestController
@RequestMapping("/api/checkoutItems")
public class CheckoutController {

    @Autowired
    private CheckoutItemService checkoutItemService;
    @Autowired
    private CartService cartService;

    // Endpoint to checkout all items from the cart
    @PostMapping("/add")
    public ResponseEntity<?> checkoutCartItems() {
        List<CartItem> cartItems = cartService.getAllCartItems(); // This should fetch all items in the cart
        if (cartItems.isEmpty()) {
            return ResponseEntity.badRequest().body("No items in the cart to checkout.");
        }

        List<CheckoutItem> checkoutItems = cartItems.stream()
                .map(ci -> new CheckoutItem(ci.getId(), ci.getName(), ci.getPrice(), ci.getQuantity(), ci.getImageUrl(), ci.getPrepTime()))
                .collect(Collectors.toList());

        // Save all checkout items which internally sets the orderId
        List<CheckoutItem> savedItems = checkoutItemService.saveAllCheckoutItems(checkoutItems);

        // Calculate the total order price
        double totalOrderPrice = savedItems.stream()
                .mapToDouble(item -> item.getPrice() * item.getQuantity())
                .sum();

        String orderId = savedItems.stream().findFirst().map(CheckoutItem::getOrderId).orElse("");
        // rabbitMQSender.send(new Message(message, savedItems));

        Map<String, Object> response = new HashMap<>();
        response.put("orderId", orderId);
        response.put("totalOrderPrice", totalOrderPrice);
        response.put("items", savedItems);

        return ResponseEntity.ok(response);
    }

    // Endpoint to delete all checkout items by orderId
    @DeleteMapping("/remove/{orderId}")
    public ResponseEntity<Void> deleteCheckoutItemsByOrderId(@PathVariable String orderId) {
        checkoutItemService.deleteAllCheckoutItemsByOrderId(orderId);
        return ResponseEntity.ok().build();
    }

    // Endpoint to get all checkout items by orderId
    @GetMapping("/get/{orderId}")
    public ResponseEntity<List<CheckoutItem>> getCheckoutItemsByOrderId(@PathVariable String orderId) {
        List<CheckoutItem> items = checkoutItemService.getCheckoutItemsByOrderId(orderId);
        return ResponseEntity.ok(items);
    }
}
