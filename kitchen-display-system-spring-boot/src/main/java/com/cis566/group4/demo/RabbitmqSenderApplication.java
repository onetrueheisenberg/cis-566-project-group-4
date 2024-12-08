package com.cis566.group4.demo;

import com.cis566.group4.demo.messaging.model.Message;
import com.cis566.group4.demo.messaging.RabbitMQSender;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import java.util.Random;

@SpringBootApplication
public class RabbitmqSenderApplication {
	@Autowired
	private RabbitMQSender rabbitMQSender;

	public static void main(String[] args) {
		SpringApplication.run(RabbitmqSenderApplication.class, args);
	}
}
