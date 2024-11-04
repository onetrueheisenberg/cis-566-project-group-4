package com.umich.cloudbite;

import com.umich.cloudbite.messaging.model.Message;
import com.umich.cloudbite.messaging.RabbitMQSender;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;

@RestController
@RequestMapping(value = "/rabbitmq/")
public class Endpoint {
    @Autowired
    private RabbitMQSender rabbitMQSender;

    @PostMapping(value = "/producer")
    public String producer(@RequestBody Message message) throws IOException {
        rabbitMQSender.send(message);
        return "Message sent to the RabbitMQ Successfully";
    }
}
