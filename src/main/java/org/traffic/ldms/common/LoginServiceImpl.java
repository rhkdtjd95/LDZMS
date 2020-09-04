package org.traffic.ldms.common;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.traffic.ldms.account.Account;
import org.traffic.ldms.account.AccountMapper;

@Service
public class LoginServiceImpl implements LoginService {
	@Autowired
	private AccountMapper accountMapper;

	@Override
	public boolean isAuthenticate(Account parameter) {
		Account account = this.accountMapper.select(parameter);
		if (account != null) {
			return true;
		}
		return false;
	}
}
