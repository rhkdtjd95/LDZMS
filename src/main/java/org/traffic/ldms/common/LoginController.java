package org.traffic.ldms.common;

import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.validation.Errors;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.view.RedirectView;
import org.traffic.ldms.account.Account;
import org.traffic.ldms.institution.Institution;
import org.traffic.ldms.institution.InstitutionValidator;

@RestController
public class LoginController {
	@Autowired
	LoginServiceImpl loginServiceImpl;

	@GetMapping(value = "/login/login")
	public ModelAndView login() {
		return new ModelAndView("login/login");
	}

	@PostMapping(value = "/login/login")
	public ModelAndView login(Institution institution, Errors errors, HttpSession session, Account account,HttpServletResponse response) {
		new InstitutionValidator().validate(institution, errors);
		try {
			response.setContentType("text/html; charset=UTF-8");
			PrintWriter out = response.getWriter();
		

		boolean isAuthenticate = loginServiceImpl.isAuthenticate(account);
		if (isAuthenticate) {
			session.setAttribute("isSupervisor", "true");

			return new ModelAndView(new RedirectView("/institution/list"));
		} else {
			out.println("<script>alert('아이디와 비밀번호가 일치하지 않습니다'); location.href='/login/login';</script>");
			out.flush();
			return new ModelAndView(new RedirectView("/login/login"));
			
		}
	
	} catch (IOException e) {
		e.printStackTrace();
		return null;
	}
}

	@GetMapping(value = "/logout")
	public ModelAndView logout(HttpSession session) {
		session.invalidate();
		return new ModelAndView(new RedirectView("/login/login"));
	}
}
