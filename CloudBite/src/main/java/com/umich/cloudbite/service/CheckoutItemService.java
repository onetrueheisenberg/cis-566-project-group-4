package com.umich.cloudbite.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.google.gson.Gson;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.umich.cloudbite.messaging.RabbitMQSender;
import com.umich.cloudbite.model.CheckoutItem;
import com.umich.cloudbite.model.OrderStatus;
import com.umich.cloudbite.repository.CheckoutRepository;
import com.umich.cloudbite.util.OrderIdGenerator;

@Service
public class CheckoutItemService {
    @Autowired
    private RabbitMQSender rabbitMQSender;
    @Autowired
    private CheckoutRepository checkoutItemRepository;


    // Save multiple checkout items with an automatically generated orderId
    public List<CheckoutItem> saveAllCheckoutItems(List<CheckoutItem> items) throws JsonProcessingException {
        String orderId = OrderIdGenerator.generate(); // Generate a unique orderId
        items.forEach(item -> item.setOrderId(orderId)); // Set the orderId for all items
        items.forEach(item -> item.setStatus(OrderStatus.NEW));
//        Gson gson = new Gson();
//        String jsonString = gson.toJson(items);
        ObjectMapper objectMapper = new ObjectMapper();
        String jsonString = objectMapper.writeValueAsString(items);
        rabbitMQSender.send(jsonString);
        return checkoutItemRepository.saveAll(items);
    }

    // Delete all checkout items by orderId
    public void deleteAllCheckoutItemsByOrderId(String orderId) {
        List<CheckoutItem> itemsToDelete = checkoutItemRepository.findByOrderId(orderId);
        checkoutItemRepository.deleteAll(itemsToDelete);
    }

    // Get all checkout items by orderId
    public List<CheckoutItem> getCheckoutItemsByOrderId(String orderId) {
        return checkoutItemRepository.findByOrderId(orderId);
    }
    
    // Get all existing orders
    public List<CheckoutItem> getAllOrders() {
        return checkoutItemRepository.findAll();
    }
    
    // Save or update a single checkout item
    public CheckoutItem saveCheckoutItem(CheckoutItem item) {
        return checkoutItemRepository.save(item);
    }

}
