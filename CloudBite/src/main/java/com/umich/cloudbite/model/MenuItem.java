package com.umich.cloudbite.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document (collection = "menuItems")
public class MenuItem {
    @Id
    private String id;
    private String name;
    private String description;
    private double price; 
    private String imageUrl; 
    private int prepTime; 
    
    public MenuItem() {
        // no-arg constructor
    	
    }

    // parameterized constructor (if you need one)
    public MenuItem(String id, String name, String description, double price, String imageUrl, int prepTime) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.price = price;
        this.imageUrl = imageUrl;
        this.prepTime = prepTime;
    }

    // Getters and Setters
    public String getId() { return id; }
    public void setId(String id) { this.id = id; }
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }
    public double getPrice() { return price; }
    public void setPrice(double price) { this.price = price; }
    public String getImageUrl() { return imageUrl; }
    public void setImageUrl(String imageUrl) { this.imageUrl = imageUrl; }
    public int getPrepTime() { return prepTime; }
    public void setPrepTime(int prepTime) { this.prepTime = prepTime; }
}