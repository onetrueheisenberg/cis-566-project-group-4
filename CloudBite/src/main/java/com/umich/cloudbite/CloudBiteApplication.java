package com.umich.cloudbite;

import com.umich.cloudbite.messaging.model.Message;
import com.umich.cloudbite.messaging.RabbitMQSender;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;

import java.util.Random;

@SpringBootApplication
public class CloudBiteApplication implements CommandLineRunner {

	@Autowired
	private RabbitMQSender rabbitMQSender;

	public static void main(String[] args) {
		SpringApplication.run(CloudBiteApplication.class, args);
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
