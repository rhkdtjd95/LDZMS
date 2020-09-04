<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>

<jsp:include page="/WEB-INF/jsp/common/top.jsp" />

					<div id="pagetitle" class="clearfix"><h1 class="left">기관 목록 조회</h1></div>
				</div>
			</header>

			<div class="container_16 clearfix" id="actualbody">
	            <div class="grid_16 widget first">
	                <div class="widget_title clearfix" style="padding-top: 3px;"></div>
	                <div class="widget_body" style="padding-bottom: 1px;">
	                	<form id="form_search" action="/institution/list" method="get">
	                        <table class="simple">
	                            <tr>
	                                <td width="10%" style="padding-left: 10px;"><label for="title">기관명</label></td>
			            			<td width="10%" style="padding-left: 10px;">
			            				<input type="text" id="name" name="name" value="${keyword}" class="medium" style="width: 100px;">
			            			</td>
	                                <td><a href="#" class="btn right medium" title="검색" id="function_search"><span>검색</span></a></td>
	                            </tr>
	                        </table>
	                	</form>
	                </div>
	            </div>
            	<div class="clear"></div>

				<div class="grid_16 widget first">
					<div class="widget_title clearfix" style="padding-top: 3px;"></div>
					<div class="widget_body">
						<table>
							<thead>
								<tr>
									<th class="align-left"></th>
									<th class="align-left">번호</th>
									<th class="align-left">기관명</th>
									<th class="align-left">아이디</th>
									<th class="align-left">접근키</th>
									<th class="align-left">주소</th>
									<th class="align-left">연락처</th>
									<th class="align-left">유효기간</th>
									<th class="align-left">만료 갱신</th>
								</tr>
							</thead>
							<tbody id="draw_table">
								<c:if test="${not empty institutions}">
									<c:forEach items="${institutions}" var="institution" varStatus="object">
									    <tr class="odd">
											<td></td>
											<td><c:out value="${object.count}" /></td>
											<td><c:out value="${institution.name}" /></td>
											<td><c:out value="${institution.id}" /></td>
											<td><c:out value="${institution.accessKey}" /></td>
											<td><c:out value="${institution.address}" /></td>
											<td><c:out value="${institution.phoneNumber}" /></td>
											<td><div id="${institution.id}"><c:out value="${institution.validity}" /></div></td>
											<td><input type="button" value="만료 갱신" onclick="setExpiration('${institution.id}')"></td>
										</tr>
									</c:forEach>
								</c:if>
								<c:if test="${empty institutions}">
									<tr class="gradeC">
										<td colspan="9" class="center"><h6>&nbsp;</h6></td>
									</tr>
								</c:if>
							</tbody>
						</table>
						<div id="draw_navigator"></div>
						
						<div class="clear"></div>
					</div>
				</div>
			</div>
    		<div class="clear"></div>
    	</div>
	</div>

	<script>
		$(document).ready(function() {
			$("#function_search").click(function() {
				$("#form_search").submit();
			});
		});
		
		function setExpiration(id) {
 			$.ajax({
                url: "${pageContext.request.contextPath}/institution/validity/" + id,
                type: "get",
                headers : {
                    "Content-Type" : "application/json;charset=utf-8"                    
                },
                data: {
                },
                dataType : "json",
                success: function(data) {
					document.getElementById(id).innerHTML = "<font color='red'>" + data.expirationDate + "</font>";
                }
            })
		};
	</script>

<jsp:include page="/WEB-INF/jsp/common/footer.jsp" />