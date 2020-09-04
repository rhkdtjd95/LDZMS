<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" isELIgnored="false" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>

<jsp:include page="/WEB-INF/jsp/common/topNormal.jsp" />

					<div id="pagetitle" class="clearfix"><h1 class="left">기관 등록</h1></div>
				</div>
			</header>

			<div class="container_16 clearfix" id="actualbody">
				<div class="grid_16 widget first">
				    <div class="widget_title clearfix">
				        <h2>기관 등록 안내</h2>
				    </div>
				    <div class="widget_body">
				        <div class="widget_content">
				            <p>The form uses <a href="http://www.vanadiumjs.com/">Vanadium JS</a> to validate the forms from the client side. Vanaadium is simple, inituative, yet powerful. There is no need for coding and it is easily extensible and customizable.</p>
				            <p>You can use AJAX to perform the validation server side. It is possible to use inline markup as well as using JSON</p>
				            <p>For more, see <a href="http://www.vanadiumjs.com/">the Vanadium JS documentation</a></p>
				        </div>

				        <form id="form_add" action="${pageContext.request.contextPath}/request/add" method="post">
					        <table>
					            <tbody>
					            	<tr class="odd">
					                	<td width="10%" style="padding-left: 10px;"><label for="fullname">아이디</label></td>
					                	<td><input type="text" name="name"></td>
					            	</tr>
						            <tr class="even">
						                <td width="10%" style="padding-left: 10px;"><label for="Email">차량번호</label></td>
						                <td><input type="text" name="phoneNumber"></td>
						            </tr>
						            <tr class="even">
						                <td width="10%" style="padding-left: 10px;"></td>
						                <td style="padding:9px 5px 15px">
						                	<input type="button" id="function_add" class="btn large" style="width: 100px;" value="기관 등록">
						                </td>
						            </tr>
					        	</tbody>
					        </table>
				        </form>
				    </div>
				</div>
			</div>
    		<div class="clear"></div>
    	</div>
	</div>

	<script>
		$(document).ready(function() {
			$("#function_add").click(function() {
				$('#form_add').submit();
			});
		});
	</script>

<jsp:include page="/WEB-INF/jsp/common/footer.jsp"></jsp:include>