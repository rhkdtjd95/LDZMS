package org.traffic.ldms.request;

import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface RequestMapper {
	public void insert(Request request);
	
}
