package com.cis566.group4.demo.messaging;

import com.cis566.group4.demo.messaging.model.Message;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.stereotype.Service;

import java.util.concurrent.atomic.AtomicLong;

@Service
public class RabbitMQReceiver {
    private AtomicLong count = new AtomicLong(0L);

    @RabbitListener(queues = "${sample.rabbitmq.queue}")
    public void recievedMessage(Message message) {
        System.out.println("( " + count.incrementAndGet() + " ) Received = : " + message);
    }
}
