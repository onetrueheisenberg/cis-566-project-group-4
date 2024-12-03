package com.umich.cloudbite.observer;

import com.umich.cloudbite.model.MenuItem;

public class MenuUpdateCommand implements UpdateCommand {
	private MenuItem items;
	private String operation; // "add" or "delete"
	private String id;

	// Constructor, getters and setters
	public MenuUpdateCommand(MenuItem item, String operation) {
		this.items = item;
		this.operation = operation;
	}

	public MenuUpdateCommand(String id, String operation) {
		this.id = id;
		this.operation = operation;
	}

	public MenuItem getItems() {
		return items;
	}

	public String getOperation() {
		return operation;
	}

	public String getId() {
		return id;
	}
}
