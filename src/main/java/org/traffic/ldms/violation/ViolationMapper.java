package org.traffic.ldms.violation;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;
@Mapper
public interface ViolationMapper {
	public void insert(Violation violation);
	public void update(String no);
	public int select(String no);
	public List<Violation> selectAll();
	public Violation selectViolation(String no);
	public void deleteBySchedule(); 
}
