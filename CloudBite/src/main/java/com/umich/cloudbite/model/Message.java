package com.umich.cloudbite.model;

import java.util.List;

public class Message {
    private String message;

    private List<CartItem> cart;

    public Message() {
    }

    public Message(String message, List<CartItem> cart) {
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