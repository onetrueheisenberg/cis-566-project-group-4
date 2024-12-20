package com.umich.cloudbite.model;

import java.io.Serializable;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "checkoutItems")
public class CheckoutItem implements Serializable {

    private static final long serialVersionUID = 1L;
    @Id
    private String id;
    private String orderId;
    private String name;
    private double price;
    private int quantity;
    private OrderStatus status;
    private String imageUrl; 
    private int prepTime;

    // Constructors, Getters, and Setters
    public CheckoutItem() {
    }

    public CheckoutItem(String id, String orderId, String name, double price, int quantity, String imageUrl, int prepTime) {
        this.id = id;
        this.orderId = orderId;
        this.name = name;
        this.price = price;
        this.quantity = quantity;
        this.imageUrl = imageUrl;
        this.prepTime = prepTime;
    }

    public CheckoutItem(String id, String name, double price, int quantity, String imageUrl, int prepTime) {
        this.id = id;
        this.name = name;
        this.price = price;
        this.quantity = quantity;
        this.imageUrl = imageUrl;
        this.prepTime = prepTime;
    }

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

    public String getOrderId() {
        return orderId;
    }

    public void setOrderId(String orderId) {
        this.orderId = orderId;
    }
    
    public String getImageUrl() { return imageUrl; }
    public void setImageUrl(String imageUrl) { this.imageUrl = imageUrl; }
    public int getPrepTime() { return prepTime; }
    public void setPrepTime(int prepTime) { this.prepTime = prepTime; }

    public OrderStatus getStatus() {
		return status;
	}

	public void setStatus(OrderStatus status) {
		this.status = status;
	}

	@Override
    public String toString() {
        return "Id=" + this.getOrderId() + "&Name=" + this.getName() + "&quantity=" + this.getQuantity()
                + "&price=" + this.getPrice() + "&status=" + this.getStatus() + 
                "&imageURL=" + this.getImageUrl();
    }
}
