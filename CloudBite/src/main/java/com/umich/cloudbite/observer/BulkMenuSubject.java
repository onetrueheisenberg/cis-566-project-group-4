package com.umich.cloudbite.observer;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import com.umich.cloudbite.model.MenuItem;
import com.umich.cloudbite.repository.MenuRepository;

import jakarta.annotation.PostConstruct;

@Component
public class BulkMenuSubject implements Subject {
    private List<Observer> observers = new ArrayList<>();
    private List<MenuItem> menuItems = new ArrayList<>();

    @Autowired
    private List<Observer> autoRegisteredObservers;
    @Autowired
    private MenuRepository menuRepository;

    @PostConstruct
    public void registerAutoObservers() {
        autoRegisteredObservers.forEach(this::registerObserver);
    }

    @PostConstruct
    public void initializeMenuItems() {
        // Load existing menu items from the database at startup
        menuItems.addAll(menuRepository.findAll());
        System.out.println("Loaded menu items: " + menuItems);
    }

    @Override
    public void registerObserver(Observer o) {
        if (o != null && !observers.contains(o)) {
            observers.add(o);
        }
    }

    @Override
    public void removeObserver(Observer o) {
        observers.remove(o);
    }

    @Override
    public void notifyObservers(UpdateCommand command) {
        if (!observers.isEmpty()) {
            observers.forEach(observer -> observer.update(command));
        }
    }

    public boolean addBulkMenuItems(List<MenuItem> items) {
        if (items == null) {
            return false;
        }
        System.out.println("item added");
        menuItems.addAll(items);
        notifyObservers(new BulkMenuUpdateCommand(items, "add"));
        return true;
    }
}
