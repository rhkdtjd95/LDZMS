<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>

<!DOCTYPE html>
<html lang="kr">
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
	<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" >
	
    <link rel="stylesheet" type="text/css" href="/style/style.css" />
	<link id='sfluid' class="sswitch" rel="stylesheet" type="text/css" href="/style/fluid.css" title="fluid" media="screen" />
	<link id='sfixed' class="sswitch" rel="stylesheet" type="text/css" href="/style/fixed.css" title="fluid" media="screen" />
        
	<title>경차 전용 관리 시스템</title>
	<script type="text/javascript" src="/js/jquery-1.6.1.min.js"></script>
	<script type="text/javascript" src="/js/jquery-ui-1.8.14.custom.min.js"></script>
	
	<script type="text/javascript" src="/js/excanvas.min.js"></script>
	<script type="text/javascript" src="/js/jquery.flot.min.js"></script>
	<script type="text/javascript" src="/js/jquery.flot.pie.min.js"></script>
	<script type="text/javascript" src="/js/jquery.flot.stack.min.js"></script>
	
	<script type="text/javascript" src="/js/jquery.dataTables.min.js"></script>
	<script type="text/javascript" src="/js/jquery.labelify.js"></script>
	<script type="text/javascript" src="/js/iphone-style-checkboxes.js"></script>
	<script type="text/javascript" src="/js/jquery.ui.selectmenu.js"></script>
	<script type="text/javascript" src="/js/vanadium-min.js"></script>
	<script type="text/javascript" src="/js/jquery.cleditor.min.js"></script>
	<script type="text/javascript" src="/js/superfish.js"></script>
	<script type="text/javascript" src="/js/jquery.colorbox-min.js"></script>
	<script type="text/javascript" src="/js/styleswitch.js"></script>
	
	<script type="text/javascript" src="/js/fullcalendar.min.js"></script>
	<script type="text/javascript" src="/js/jquery.uploadify.v2.1.4.min.js"></script>
	<script type="text/javascript" src="/js/uploadify.js"></script>
	<script type="text/javascript" src="/js/jquery.tipsy.js"></script>
	
	<script type="text/javascript" src="/js/gcal.js"></script>
	<script type="text/javascript" src="/js/swfobject.js"></script>
	<script type="text/javascript" src="/js/jquery.pnotify.min.js"></script>
	<script type="text/javascript" src="/js/examples.js"></script>
	
	<script type="text/javascript" src="/js/sidemenu.js">// Strictly for sidebar </script>
	
	<!-- Toolbar for Demo Only -->
	<link rel="stylesheet" type="text/css" href="/demo/toolbar.css" />
	<link rel="stylesheet" media="screen" type="text/css" href="/demo/colorpicker/css/colorpicker.css" />
	<script type="text/javascript" src="/demo/colorpicker/js/colorpicker.js"></script>
	<!-- Demo js Only -->
	<script type="text/javascript" src="/js/demo.js"></script>
	
	<!--[if lt IE 9]>
	    <script type="text/javascript" src="/js/html5.js"></script>
	<![endif]-->
	
	<!--[if IE 7]>
	    <link rel="stylesheet" type="text/css" href="/style/IE7.css" />
	<![endif]-->
	<script>
		function commas(x) {
		    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
		};
	</script>
</head>

<body>
	<div id="wrap">
    	<div id="main">
        	<header>
            	<div class="container_16 clearfix">
                	<nav>
                    	<div id="navcontainer" class="clearfix">
	                    	<div id="user" class="clearfix">
	                        	<img src="/demo/avatar.png" alt="" />
	                        	<strong class="username">관리자</strong>
	                        	<ul class="piped">
	                        	</ul>
	                    	</div>
	                    	<div id="navclose"></div>
							<ul class="sf-menu">
	                        	<li>
	                            	<a href="${pageContext.request.contextPath}/logout">
	                                	<span class="icon"><img src="/images/menu/pages.png" /></span>
	                                	<span class="title">로그아웃</span>
	                            	</a>
	                        	</li>
	                        	<%-- <li>
	                            	<a href="gallery.html">
	                                	<span class="icon"><img src="/images/menu/gallery.png" /></span>
	                                	<span class="title">타 기관 관리</span>
	                            	</a>
	                        	</li>
	                        	<li>
	                            	<a href="charts.html">
	                                	<span class="icon"><img src="/images/menu/charts.png" /></span>
	                                	<span class="title">타 기관 관리</span>
	                            	</a>
	                        	</li>
	                        	<li>
	                            	<a href="settings.html">
	                                	<span class="icon"><img src="/images/menu/settings.png" /></span>
	                                	<span class="title">타 기관 관리</span>
	                            	</a>
                                	<ul>
                                		<li><a href="${pageContext.request.contextPath}/base/subjects">과목</a></li>
										<li><a href="${pageContext.request.contextPath}/base/referenceyears/1/form">기준년도</a></li>
                                	</ul>
	                        	</li> --%>
	                        	<li style="width: 115px;"></li>
							</ul>
						</div>
					</nav>