package org.traffic.ldms.institution;

import java.sql.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class InstitutionServiceImpl implements InstitutionService {
	@Autowired
	private InstitutionMapper institutionMapper;

	@Override
	public String addInstitution(Institution institution) {
		String accessKey = String.valueOf(System.nanoTime()).substring(4).toString();
		institution.setAccessKey(accessKey);

		this.institutionMapper.insert(institution);

		return institution.getAccessKey();
	}

	@Override
	public List<Institution> getInstitutionsInfo(Institution institution) {
		return this.institutionMapper.selectAll(institution);
	}

	@Override
	public Date setExpiration(String id) {
		Institution institution = new Institution();
		institution.setId(id);
		institution.setValidity(new Date(0000));

		this.institutionMapper.update(institution);

		institution = new Institution();
		institution.setId(id);

		institution = this.institutionMapper.select(institution);

		return institution.getValidity();
	}

	@Override
	public Institution selectInstituton(String id) {
		return institutionMapper.select(id);
	}

	@Override
	public Institution checkId(String id) {
		return institutionMapper.check(id);
	}
}
