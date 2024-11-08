package com.umich.cloudbite.observer;

import java.util.ArrayList;
import java.util.List;

public class MenuSubject implements Subject {
    private List<Observer> observers = new ArrayList<>();
    private List<String> availableMenuItems;

    @Override
    public void registerObserver(Observer o) {
        if (!observers.contains(o)) {
            observers.add(o);
        }
    }

    @Override
    public void removeObserver(Observer o) {
        observers.remove(o);
    }

    @Override
    public void notifyObservers() {
        for (Observer observer : observers) {
            observer.update(new ArrayList<>(availableMenuItems));  // Provide a copy to avoid modification
        }
    }

    public void setMenuItems(List<String> menuItems) {
        this.availableMenuItems = menuItems;
        notifyObservers();  // Notify all observers about the menu change
    }
}

