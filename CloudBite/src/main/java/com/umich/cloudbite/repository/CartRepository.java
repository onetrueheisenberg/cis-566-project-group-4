package com.umich.cloudbite.repository;

import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.umich.cloudbite.model.CartItem;

public interface CartRepository extends MongoRepository<CartItem, String> {
    // This will provide basic CRUD operations
	
	Optional<CartItem> findById(String id);
}