package com.umich.cloudbite.observer;

import java.util.List;

import com.umich.cloudbite.model.MenuItem;

public class BulkMenuUpdateCommand {
	private List<MenuItem> items;
	private String operation; // "add" or "delete"
	private String id;

	// Constructor, getters and setters
	public MenuUpdateCommand(List<MenuItem> items, String operation) {
		this.items = item;
		this.operation = operation;
	}

	public MenuUpdateCommand(String id, String operation) {
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
