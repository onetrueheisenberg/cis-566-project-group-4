package com.umich.cloudbite.observer;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.umich.cloudbite.service.UpdateMenuService;

@Component
public class CustomerMenuObserver implements Observer {
	
	@Autowired
	private UpdateMenuService menuItemService;
    @Override
    public void update(Object arg) {
    	 if (arg instanceof MenuUpdateCommand) {
 	        MenuUpdateCommand update = (MenuUpdateCommand) arg;
 	        if ("add".equals(update.getOperation())) {
 	        	menuItemService.saveMenuItem(update.getItems());
 	            System.out.println("Kitchen Display Menu Updated: " + update.getItems());
 	        } else if ("delete".equals(update.getOperation())) {
 	        	menuItemService.deleteMenuItem(update.getId());
 	            System.out.println("Kitchen Display Menu Items Removed: " + update.getItems());
 	        }
 	    }
    }
}
