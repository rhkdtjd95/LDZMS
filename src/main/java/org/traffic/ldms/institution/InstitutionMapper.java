package org.traffic.ldms.institution;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface InstitutionMapper {
	public List<Institution> selectAll(Institution institution);
	public Institution select(Institution institution);
	public void insert(Institution institution);
	public void update(Institution institution);
	public Institution select(String id);
	public Institution check(String id);
}

