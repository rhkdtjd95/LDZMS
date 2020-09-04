 package org.traffic.ldms.institution;

import java.sql.Date;
import java.util.List;

import org.traffic.ldms.account.Account;

public interface InstitutionService {
	public String addInstitution(Institution institution);
	public List<Institution> getInstitutionsInfo(Institution institution);
	public Date setExpiration(String id);
	public Institution selectInstituton(String id);
	public Institution checkId(String id);
}
