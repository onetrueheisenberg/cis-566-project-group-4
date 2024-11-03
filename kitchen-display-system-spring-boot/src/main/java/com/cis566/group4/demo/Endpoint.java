package com.cis566.group4.demo;

import com.cis566.group4.demo.messaging.model.Message;
import com.cis566.group4.demo.messaging.RabbitMQSender;
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
