package org.traffic.ldms.common;

import org.traffic.ldms.account.Account;

public interface LoginService {
	public boolean isAuthenticate(Account account);
}
