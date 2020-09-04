package org.traffic.ldms.violation;

import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.view.RedirectView;
import org.traffic.ldms.institution.Institution;
import org.traffic.ldms.institution.InstitutionService;
import org.traffic.ldms.request.Request;
import org.traffic.ldms.request.RequestService;

import com.google.gson.GsonBuilder;

@RestController
public class ViolationController {
	@Autowired
	private ViolationService violationService;
	@Autowired
	private InstitutionService institutionService;

	@Autowired
	private RequestService requestService;

	@GetMapping(value = "/violation/add")
	public Map<String, String> addViolationInfo(@RequestParam(required = false) String no, @RequestParam(required = false) String locationNo, Violation violation) {
		this.violationService.addInfo(no, locationNo,violation);
		
		Map<String, String> result = new HashMap<String, String>();
		result.put("code", "200");

		return result;
	}

	@GetMapping(value = "/violation")
	public void getViolationInfo(HttpServletResponse response, HttpServletRequest request) throws IOException {
		response.setContentType("text/html;charset=UTF-8");

		String accessKey = request.getParameter("accessKey");
		String id = request.getParameter("id");
		String no = request.getParameter("no");

		Request request1 = new Request();
		request1.setId(id);
		request1.setVehicleNo(no);

		String msg = "";

		if (id != null & accessKey != null & no != null) {
			Institution institution = this.institutionService.selectInstituton(id);
			if (institution == null) {
				msg = getMessage(new Message("600", "요청 정보를 찾을 수 없습니다."));
				response.getWriter().write(msg);
				return;
			}

			if (accessKey.equals(institution.getAccessKey()) && institution.getId().equals(id)) {
				msg = getMessage(no);
				this.requestService.registerRecord(request1);
			} else {
				msg = getMessage(new Message("600", "요청 정보를 찾을 수 없습니다."));
			}

		} else {
			msg = getMessage(new Message("500", "요청 값이 잘못되었습니다."));
		}
		response.getWriter().write(msg);
	}

	private String getMessage(String no) {
		Map<String, Object> result = new HashMap<String, Object>();
		Violation violation = this.violationService.selectVioInfo(no);
		if (violation != null) {
			result.put("message", new Message("200", ""));
			result.put("vehicle", violation);
			System.out.println(violation.toString());
		} else {
			result.put("message", new Message("600", "요청 정보를 찾을 수 없습니다."));
			result.put("vehicle", new Violation());
		}

		return toJSON(result);
	}

	private String getMessage(Message message) {
		Map<String, Object> result = new HashMap<String, Object>();
		result.put("message", message);
		result.put("violation", new Violation());

		return toJSON(result);
	}

	private String toJSON(Map<String, Object> object) {
		return new GsonBuilder().setPrettyPrinting().serializeNulls().create().toJson(object);
	}

}
