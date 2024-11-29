package com.umich.cloudbite.service;

import org.springframework.stereotype.Service;
import org.springframework.beans.factory.annotation.Autowired;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

import com.umich.cloudbite.model.MenuItem;
import com.umich.cloudbite.observer.CustomerMenuObserver;
import com.umich.cloudbite.observer.KitchenMenuObserver;
import com.umich.cloudbite.observer.MenuSubject;

import com.umich.cloudbite.repository.MenuRepository;

@Service
public class MenuService {

    @Autowired
    private MenuRepository menuRepository;
    private MenuSubject menuSubject;

    public MenuService() {
        menuSubject = new MenuSubject();
        // Register observers
        menuSubject.registerObserver(new CustomerMenuObserver());
        menuSubject.registerObserver(new KitchenMenuObserver());
    }

    public void updateMenuAvailability(MenuItem newMenuItems) {
        menuSubject.addMenuItem(newMenuItems);
    }

    public List<MenuItem> getAllMenuItems() {
        List<MenuItem> menuItems = menuRepository.findAll(); // Assuming getCart() returns the current
                                                             // ShoppingCart
        return menuItems; // Assuming ShoppingCart has a method getItems() that returns
                          // List<CartItem>
    }
}
