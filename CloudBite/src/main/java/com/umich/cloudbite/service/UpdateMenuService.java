package com.umich.cloudbite.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.umich.cloudbite.model.MenuItem;
import com.umich.cloudbite.repository.MenuRepository;

@Service
public class UpdateMenuService {

    @Autowired
    private MenuRepository menuItemRepository;

    public MenuItem saveMenuItem(MenuItem menuItem) {
    	System.out.println("menu itemsaved - "+menuItem.getName());
        return menuItemRepository.save(menuItem);
    }

    public void deleteMenuItem(String id) {
    	System.out.println("menu item removed - ");
        menuItemRepository.deleteById(id);
    }
}