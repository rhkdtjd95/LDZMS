package org.traffic.ldms.parking;

import java.io.Serializable;

public class Parking implements Serializable {
	private String locationNo;
	private String ip;

	public Parking() {
	}

	public Parking(String locationNo, String ip) {
		this.locationNo = locationNo;
		this.ip = ip;
	}

	public String getLocationNo() {
		return locationNo;
	}

	public void setLocationNo(String locationNo) {
		this.locationNo = locationNo;
	}

	public String getIp() {
		return ip;
	}

	public void setIp(String ip) {
		this.ip = ip;
	}
}
