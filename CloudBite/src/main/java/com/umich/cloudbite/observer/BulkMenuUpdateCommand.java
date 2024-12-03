package com.umich.cloudbite.observer;

import java.util.List;

import com.umich.cloudbite.model.MenuItem;

public class BulkMenuUpdateCommand implements UpdateCommand {
	private List<MenuItem> items;
	private String operation; // "add" or "delete"
	private String id;

	// Constructor, getters and setters
	public BulkMenuUpdateCommand(List<MenuItem> items, String operation) {
		this.items = items;
		this.operation = operation;
	}

	public BulkMenuUpdateCommand(String id, String operation) {
		this.id = id;
		this.operation = operation;
	}

	public List<MenuItem> getItems() {
		return items;
	}

	public String getOperation() {
		return operation;
	}

	public String getId() {
		return id;
	}
}
