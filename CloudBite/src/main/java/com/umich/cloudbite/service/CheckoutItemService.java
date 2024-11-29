package com.umich.cloudbite.service;

import java.util.List;
import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.umich.cloudbite.model.CheckoutItem;
import com.umich.cloudbite.repository.CheckoutRepository;
import com.umich.cloudbite.util.OrderIdGenerator;
import com.umich.cloudbite.model.Message;
import com.umich.cloudbite.messaging.RabbitMQSender;

import org.apache.commons.lang3.SerializationUtils;

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
        String message = "You have a new message with no " + items;
        // SerializationUtils.deserialize(message);
        byte[] byted = SerializationUtils.serialize(new ArrayList(items));
        rabbitMQSender.send(byted);
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
