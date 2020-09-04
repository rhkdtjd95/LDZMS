package org.traffic.ldms.account;

import java.io.Serializable;

import org.traffic.ldms.common.IdPasswordNotMatchingException;

public class Account implements Serializable {
	private static final long serialVersionUID = -9082559417167366982L;

	private String id;
	private String password;
	
	public Account() {	
	}

	public Account(String id, String password) {
		this.id = id;
		this.password = password;
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
	
	public void changePassword(String oldPassword, String newPassword) {
		if (!password.equals(oldPassword))
			throw new IdPasswordNotMatchingException();
		this.password = newPassword;
	}
	
	public boolean matchPassword(String pwd) {
		return this.password.equals(pwd);
	}
}
