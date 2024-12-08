package com.umich.cloudbite.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "cartItems")
public class CartItem {

    @Id
    private String id;
    private String name;
    private double price;
    private int quantity;
    private String imageUrl; 
    private int prepTime; 

    public CartItem() {
    }

    // Constructor
    public CartItem(String id, String name, double price, int quantity, String imageUrl, int prepTime) {
        this.id = id;
        this.name = name;
        this.price = price;
        this.quantity = quantity;
        this.imageUrl = imageUrl;
        this.prepTime = prepTime;
    }

    // Getters and Setters
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public double getPrice() {
        return price;
    }

    public void setPrice(double price) {
        this.price = price;
    }

    public int getQuantity() {
        return quantity;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }

    public String getImageUrl() { return imageUrl; }
    public void setImageUrl(String imageUrl) { this.imageUrl = imageUrl; }
    public int getPrepTime() { return prepTime; }
    public void setPrepTime(int prepTime) { this.prepTime = prepTime; }
    
    @Override
    public String toString() {
        return "Id = " + this.getId() + " & Name = " + this.getName() + " & quantity = " + this.getQuantity()
                + " & price = " + this.getPrice();
    }
}