package com.umich.cloudbite.model;

import java.util.List;
import com.umich.cloudbite.model.ShoppingCart;

public class Message {
    private String message;

    private ShoppingCart cart;

    public Message() {
    }

    public Message(String message, ShoppingCart cart) {
        this.message = message;
        this.cart = cart;
    }

    public String getMessage() {
        return message;
    }

    @Override
    public String toString() {
        return "Message{" +
                "message='" + message + '\'' +
                "cart = " + cart + '\'' +
                '}';
    }
}