package com.umich.cloudbite.observer;

import java.util.List;

public class CustomerMenuObserver implements Observer {
    @Override
    public void update(Object arg) {
        if (arg instanceof List) {
            System.out.println("Customer App Menu Updated: " + arg);
        }
    }
}
