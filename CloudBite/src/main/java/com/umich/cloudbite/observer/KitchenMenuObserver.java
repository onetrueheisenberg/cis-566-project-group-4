package com.umich.cloudbite.observer;

import java.util.List;

public class KitchenMenuObserver implements Observer {
    @Override
    public void update(Object arg) {
        if (arg instanceof List) {
            System.out.println("Kitchen Display Menu Updated: " + arg);
        }
    }
}
