<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>

<!doctype html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">

<link rel="stylesheet" type="text/css" href="${pageContext.request.contextPath}/style/style.css" />
<link rel="stylesheet" type="text/css" href="${pageContext.request.contextPath}/style/fixed.css" title="fixed" media="screen" />

<title>경차 전용 관리 시스템</title>

<!--[if lt IE 9]><script src="http://html5shim.googlecode.com/svn/trunk/html5.js"></script><![endif]-->
<!--[if !IE 7]><style>#wrap {display:table;height:100%}</style><![endif]-->
	<script>
	 function login() {
        var form = document.loginForm;
        if (form.id.value == "") {
			alert("아이디를 입력해야 합니다!");
			form.id.focus();
			return;
        }
         if (form.password.value == "") {
              alert("패스워드를 입력 해야 합니다!");
              form.password.focus();
              return;
        }
			form.submit();
	  	}
	</script>
</head>

<body id="loginpage">
	<div class="container_16 clearfix">
		<div class="widget push_5 grid_6" id="login">
			<div class="widget_title">
				<h2>경차 전용 관리 시스템</h2>
			</div>

			<form name="loginForm" action="${pageContext.request.contextPath}/login/login" method="post" onsubmit="return validate();" class="form-signin">
				<div class="widget_body">
					<div class="widget_content">
						<label class="block" for="username">아이디</label> <input type="text"
							name="id" maxlength="11" class="large" /> <label class="block" for="password">비밀번호</label>
						<input type="password" name="password" maxlength="11" class="large" />
						<div style="margin-top: 10px">
							<!-- 
								<input type="submit" class="btn right large" style="width: 100%;" value="로그인" />
							-->
							<input type="button" value="로그인 " onclick="login();" />
						</div>
						<div class="clear"></div>
					</div>
				</div>
			</form>
		</div>
	</div>
</body>
</html>

