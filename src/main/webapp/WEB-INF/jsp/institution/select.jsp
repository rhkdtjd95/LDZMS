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
	<table style="width: 100%;" border="1">
		<thead>
			<tr>
				<td>번호</td>
				<td>위반 일시</td>
				<td>차량 번호</td>
				<td>모델명</td>
				<td>배기량</td>
				
			</tr>
		</thead>
		<tbody>
			<c:if test="${!empty institution }">
					<tr>
						<td><c:out value="${institution.id}" /></td>
						<td><c:out value="${institution.password}" /></td>
						<td><c:out value="${institution.name}" /></td>
						<td><c:out value="${institution.phoneNumber}" /></td>
						<td><c:out value="${institution.address}" /></td>
						<td><c:out value="${institution.accessKey}" /></td>
						<td><c:out value="${institution.validity}" /></td>
					</tr>
			</c:if>
			<c:if test="${empty institution }">
				<tr>
					<td style="text-algin: center;" colspan="7">목록이 존재하지 않습니다.</td>
				</tr>
			</c:if>
		</tbody>
	</table>
</body>
</html>