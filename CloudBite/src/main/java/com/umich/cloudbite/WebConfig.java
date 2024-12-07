package com.umich.cloudbite;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")  // Allow CORS requests for all paths
                .allowedOrigins("http://localhost:3000")  // Allowed origins
                .allowedMethods("GET", "POST", "PUT", "DELETE")  // Allowed methods
                .allowedHeaders("*")  // Allowed headers
                .allowCredentials(true)  // Credential support
                .maxAge(3600);  // Cache duration for preflight responses
    }
}