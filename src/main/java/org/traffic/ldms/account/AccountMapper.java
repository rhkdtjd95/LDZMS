package org.traffic.ldms.account;

import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface AccountMapper {
	public Account select(Account account);
	public int checkId(String id,String password);
}
