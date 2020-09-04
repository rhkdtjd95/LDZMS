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
				<td>��ȣ</td>
				<td>���� �Ͻ�</td>
				<td>���� ��ȣ</td>
				<td>�𵨸�</td>
				<td>��ⷮ</td>
				
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
					<td style="text-algin: center;" colspan="7">����� �������� �ʽ��ϴ�.</td>
				</tr>
			</c:if>
		</tbody>
	</table>
</body>
</html>