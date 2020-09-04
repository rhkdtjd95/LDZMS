<%@ page language="java" contentType="text/html; charset=EUC-KR"
	pageEncoding="EUC-KR"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="EUC-KR">
<title>Insert title here</title>
</head>
<body>
	<h2>경차 전용구역 관리 시스템</h2>
	<hr>
	<h3>위반 차량 목록</h3>
	<hr>
	<table style="width: 100%;" border="1">
		<thead>
			<tr>
				<td>차량 번호</td>
				<td>위반 일시</td>
				<td>모델명</td>
				<td>배기량</td>
				
			</tr>
		</thead>

		<tbody>
			<c:if test="${!empty violations}">
				<c:forEach items="${violations}" var="vio">
					<tr>
				     	<td><c:out value="${vio.no}" /></td>
						<td><c:out value="${vio.violationDate}" /></td>
						<td><c:out value="${vio.model}" /></td>
						<td><c:out value="${vio.cc}" /></td>
					</tr>
				</c:forEach>
			</c:if>
			<c:if test="${empty violations }">
				<tr>
					<td style="text-algin: center;" colspan="7">목록이 존재하지 않습니다.</td>
				</tr>
			</c:if>
		</tbody>
	</table>
</body>
</html>