package com.umich.cloudbite.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.umich.cloudbite.model.MenuItem;
import com.umich.cloudbite.observer.MenuSubject;

@RestController
@RequestMapping("/api/menu")
public class UpdateMenuController {

    private final MenuSubject menuSubject;

    @Autowired
    public UpdateMenuController(MenuSubject menuSubject) {
        this.menuSubject = menuSubject;
    }

    @PostMapping("/add")
    public ResponseEntity<Void> addMenuItem(@RequestBody MenuItem item) {
        menuSubject.addMenuItem(item);
        return ResponseEntity.ok().build();
    }

    @PostMapping("/add/bulk")
    public ResponseEntity<Void> addBulkMenuItems(@RequestBody List<MenuItem> items) {
        menuSubject.addBulkMenuItems(items);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/remove")
    public ResponseEntity<Void> removeMenuItem(@RequestParam(name = "Id") String id) {
        menuSubject.deleteMenuItem(id);
        return ResponseEntity.ok().build();
    }
}
