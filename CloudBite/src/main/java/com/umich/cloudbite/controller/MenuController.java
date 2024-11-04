package com.umich.cloudbite.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.umich.cloudbite.model.MenuItem;
import com.umich.cloudbite.repository.MenuRepository;

import java.util.List;

@RestController
@RequestMapping("/api/menus")
public class MenuController {

    @Autowired
    private MenuRepository menuRepository;

    @GetMapping("/items")
    public ResponseEntity<List<MenuItem>> getAllMenuItems() {
    	List<MenuItem> items = menuRepository.findAll();
	    System.out.println("Fetching menu items: " + items);
	    return ResponseEntity.ok(items);
    }
}