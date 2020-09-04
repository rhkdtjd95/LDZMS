package org.traffic.ldms.institution;

import java.io.Serializable;
import java.sql.Date;

public class Institution implements Serializable {
	private static final long serialVersionUID = -4227998568959068963L;

	private String id;
	private String password;
	private String name;
	private String phoneNumber;
	private String address;
	private String accessKey;
	private Date validity;

	public Institution() {
	}

	public Institution(String id, String password, String name, String phoneNumber, String address, String accessKey, Date validity) {
		this.id = id;
		this.name = name;
		this.phoneNumber = phoneNumber;
		this.address = address;
		this.accessKey = accessKey;
		this.validity = validity;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getPhoneNumber() {
		return phoneNumber;
	}

	public void setPhoneNumber(String phoneNumber) {
		this.phoneNumber = phoneNumber;
	}

	public String getAddress() {
		return address;
	}

	public void setAddress(String address) {
		this.address = address;
	}

	public String getAccessKey() {
		return accessKey;
	}

	public void setAccessKey(String accessKey) {
		this.accessKey = accessKey;
	}

	public Date getValidity() {
		return validity;
	}

	public void setValidity(Date validity) {
		this.validity = validity;
	}
}
