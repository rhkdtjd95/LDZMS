package org.traffic.ldms.violation;

import java.io.Serializable;

public class Violation implements Serializable {
	private static final long serialVersionUID = 3621208273011780044L;
	
	private String no;
	private String model;
	private int cc;
	private String violationDate;
	
	public Violation() {
		
	}

	public Violation(String no, String model, int cc, String violationDate , int location) {
		this.no = no;
		this.model = model;
		this.cc = cc;
		this.violationDate = violationDate;
	}

	public String getNo() {
		return no;
	}

	public void setNo(String no) {
		this.no = no;
	}

	public String getModel() {
		return model;
	}

	public void setModel(String model) {
		this.model = model;
	}

	public int getCc() {
		return cc;
	}

	public void setCc(int cc) {
		this.cc = cc;
	}

	public String getViolationDate() {
		return violationDate;
	}

	public void setViolationDate(String violationDate) {
		this.violationDate = violationDate;
	}

	public String toString() {
		System.out.println("=============================="+"\n"+
				" 차량 번호 : "+no+"\n"+
				" 모댈명     : "+model+"\n"+
				" 배기량     : "+cc+"\n"+
				" 위반 일시 : "+violationDate+"\n"+
				"==============================");
		return "";
	}

}
