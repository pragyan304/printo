package com.printo.project.entities;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity(name="admin")
@Table(name="admin")
public class Admin {
	@Id
	@Column(nullable = false)
	private String id;
	@Column(nullable = false)
	private String password;
	@Column(nullable = false)
	private String name;


	

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}	
	public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
	}
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}
	public Admin() {}
	
	public Admin(String id, String password, String name) {
		this.id = id;
		this.password = password;
		this.name = name;
		
	}
	@Override
	public String toString() {
		return this.id+" "+this.name+" "+this.password;
	}
}