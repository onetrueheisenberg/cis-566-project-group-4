package com.umich.cloudbite.repository;

import com.umich.cloudbite.model.MenuItem;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface MenuRepository extends MongoRepository<MenuItem, String> {
}