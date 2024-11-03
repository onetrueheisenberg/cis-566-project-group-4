package com.cis566.group4.demo;

import com.cis566.group4.demo.messaging.model.Message;
import com.cis566.group4.demo.messaging.RabbitMQSender;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import java.util.Random;

@SpringBootApplication
public class RabbitmqSenderApplication implements CommandLineRunner {
	@Autowired
	private RabbitMQSender rabbitMQSender;

	public static void main(String[] args) {
		SpringApplication.run(RabbitmqSenderApplication.class, args);
	}

	@Override
	public void run(String... args) {
		process("Sender-1");

		process("Sender-2");

		process("Sender-3");

	}

	private void process(String s) {
		new Thread(() -> {
			Random random = new Random();
			for (long i = 0;; i++) {
				String message = "You have a new message with no " + i;
				rabbitMQSender.send(new Message(message));

				try {
					Thread.sleep(random.nextInt((15000 - 4000) + 1) + 4000);
				} catch (InterruptedException e) {
					e.printStackTrace();
				}
			}

		}, s).start();
	}
}
