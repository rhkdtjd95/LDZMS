package org.traffic.ldms.violation;

import java.util.List;
	
public interface ViolationService{
	public void addInfo(String no, String locationNo,Violation violation);
	public Violation selectVioInfo(String no);
	public void removeViolationInfo();
	
}
