package com.umich.cloudbite.model;

import java.util.List;
import com.umich.cloudbite.model.CheckoutItem;

public class Message {
    private String message;

    private List<CheckoutItem> checkoutItem;

    public Message() {
    }

    public Message(String message, List<CheckoutItem> checkoutItem) {
        this.message = message;
        this.checkoutItem = checkoutItem;
    }

    public String getMessage() {
        return message;
    }

    @Override
    public String toString() {
        return "Message{" +
                "message='" + message + '\'' +
                "checkoutItem = " + checkoutItem + '\'' +
                '}';
    }
}