package org.traffic.ldms.request;

import java.io.Serializable;

public class Request implements Serializable {
	private static final long serialVersionUID = -6470788072303641929L;

	private int no;
	private String vehicleNo;
	private String id;

	public Request() {
	}

	public Request(int no, String vehicleNo, String id) {
		this.no = no;
		this.vehicleNo = vehicleNo;
		this.id = id;
	}

	public int getNo() {
		return no;
	}

	public void setNo(int no) {
		this.no = no;
	}

	public String getVehicleNo() {
		return vehicleNo;
	}

	public void setVehicleNo(String vehicleNo) {
		this.vehicleNo = vehicleNo;
	}

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public static long getSerialversionuid() {
		return serialVersionUID;
	}
}
