package com.umich.cloudbite.repository;

import com.umich.cloudbite.model.MenuItem;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;
import com.umich.cloudbite.model.MenuItem;

public interface MenuRepository extends MongoRepository<MenuItem, String> {
    List<MenuItem> findAll();
}