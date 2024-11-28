package com.umich.cloudbite.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.umich.cloudbite.model.CheckoutItem;
import com.umich.cloudbite.repository.CheckoutRepository;
import com.umich.cloudbite.util.OrderIdGenerator;
import com.umich.cloudbite.model.Message;
import com.umich.cloudbite.messaging.RabbitMQSender;

@Service
public class CheckoutItemService {
    @Autowired
    private RabbitMQSender rabbitMQSender;
    @Autowired
    private CheckoutRepository checkoutItemRepository;

    // Save multiple checkout items with an automatically generated orderId
    public List<CheckoutItem> saveAllCheckoutItems(List<CheckoutItem> items) {
        String orderId = OrderIdGenerator.generate(); // Generate a unique orderId
        items.forEach(item -> item.setOrderId(orderId)); // Set the orderId for all items
        String message = "You have a new message with no " + orderId;
        rabbitMQSender.send(new Message(message, items));
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
}
