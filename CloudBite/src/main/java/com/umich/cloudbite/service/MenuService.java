package com.umich.cloudbite.service;

import java.util.Arrays;
import java.util.List;

import org.springframework.stereotype.Service;

import com.umich.cloudbite.observer.CustomerMenuObserver;
import com.umich.cloudbite.observer.KitchenMenuObserver;
import com.umich.cloudbite.observer.MenuSubject;

@Service
public class MenuService {
    private MenuSubject menuSubject;

    public MenuService() {
        menuSubject = new MenuSubject();
        // Register observers
        menuSubject.registerObserver(new CustomerMenuObserver());
        menuSubject.registerObserver(new KitchenMenuObserver());
    }

    public void updateMenuAvailability(List<String> newMenuItems) {
        menuSubject.setMenuItems(newMenuItems);
    }

    // Example method to simulate a menu update
    public void simulateMenuUpdate() {
        updateMenuAvailability(Arrays.asList("Pizza", "Burger", "Salad"));
    }
}
