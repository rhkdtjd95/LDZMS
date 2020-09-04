package org.traffic.ldms.request;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class RequestServiceImpl implements RequestService{

	@Autowired
	private RequestMapper requestMapper;
	
	@Override
	public void registerRecord(Request request) {
		this.requestMapper.insert(request);
	}

}
