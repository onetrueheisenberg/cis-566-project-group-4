package com.umich.cloudbite.messaging;

import org.apache.commons.lang3.SerializationUtils;

import com.umich.cloudbite.model.Message;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.stereotype.Service;

import java.util.concurrent.atomic.AtomicLong;

@Service
public class RabbitMQReceiver {
    private AtomicLong count = new AtomicLong(0L);

    @RabbitListener(queues = "${sample.rabbitmq.queue}")
    public void recievedMessage(byte[] byted) {
        Object object = SerializationUtils.deserialize(byted);
        System.out.println("( " + count.incrementAndGet() + " ) Received = : " + object);

    }
}
