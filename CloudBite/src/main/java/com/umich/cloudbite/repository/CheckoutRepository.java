package com.umich.cloudbite.repository;

import com.umich.cloudbite.model.CheckoutItem;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;

public interface CheckoutRepository extends MongoRepository<CheckoutItem, String> {
    // You can define custom query methods here if needed
	 List<CheckoutItem> findByOrderId(String orderId);
	 void deleteByOrderId(String orderId);
}
