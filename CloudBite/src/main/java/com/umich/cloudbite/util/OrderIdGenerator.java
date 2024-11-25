package com.umich.cloudbite.util;

import java.util.UUID;

public class OrderIdGenerator {
    public static String generate() {
        // Generate a random UUID and convert to string
        String uuid = UUID.randomUUID().toString();
        
        // Remove all hyphens from the UUID and take the first 12 characters
        return uuid.replace("-", "").substring(0, 12);
    }
}
