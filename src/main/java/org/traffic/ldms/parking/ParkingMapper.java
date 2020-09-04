package org.traffic.ldms.parking;

import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface ParkingMapper {
	public void insert(Parking parking);
	public Parking select(String locationNo);
}
