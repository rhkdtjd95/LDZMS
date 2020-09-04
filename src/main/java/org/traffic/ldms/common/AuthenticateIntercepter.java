package org.traffic.ldms.common;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerInterceptor;

@Component
public class AuthenticateIntercepter implements HandlerInterceptor {
	@Override
	public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler)
			throws Exception {
		HttpSession session = request.getSession();
		String isSupervisor = session.getAttribute("isSupervisor")  != null ? String.valueOf(session.getAttribute("isSupervisor")) : "false" ;

		if (Boolean.valueOf(isSupervisor)) {
			return true;
		} 

		response.sendRedirect("/login/login");

		return false;
	}
}
