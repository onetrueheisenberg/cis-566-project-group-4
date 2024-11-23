//package com.umich.cloudbite.service;
//
//import org.springframework.stereotype.Service;
//import java.util.Arrays;
//import java.util.List;
//import java.util.stream.Collectors;
//
//import com.umich.cloudbite.model.MenuItem;
//import com.umich.cloudbite.observer.CustomerMenuObserver;
//import com.umich.cloudbite.observer.KitchenMenuObserver;
//import com.umich.cloudbite.observer.MenuSubject;
//
//@Service
//public class MenuService {
//    private MenuSubject menuSubject;
//
//    public MenuService() {
//        menuSubject = new MenuSubject();
//        // Register observers
//        menuSubject.registerObserver(new CustomerMenuObserver());
//        menuSubject.registerObserver(new KitchenMenuObserver());
//    }
//
//    public void updateMenuAvailability(MenuItem newMenuItems) {
//        menuSubject.addMenuItem(newMenuItems);
//    }
//
//    // Example method to simulate a menu update with realistic MenuItem objects
////    public void simulateMenuUpdate() {
////        List<MenuItem> simulatedItems = Arrays.asList(
////            new MenuItem("1", "Pizza", "Classic cheese pizza", 9.99),
////            new MenuItem("2", "Burger", "Beef burger with cheese", 8.99),
////            new MenuItem("3", "Salad", "Caesar salad", 7.99)
////        );
////        updateMenuAvailability(simulatedItems);
////    }
//}
