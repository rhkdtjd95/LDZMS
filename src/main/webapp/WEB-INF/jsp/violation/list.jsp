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
	<h2>���� ���뱸�� ���� �ý���</h2>
	<hr>
	<h3>���� ���� ���</h3>
	<hr>
	<table style="width: 100%;" border="1">
		<thead>
			<tr>
				<td>���� ��ȣ</td>
				<td>���� �Ͻ�</td>
				<td>�𵨸�</td>
				<td>��ⷮ</td>
				
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
					<td style="text-algin: center;" colspan="7">����� �������� �ʽ��ϴ�.</td>
				</tr>
			</c:if>
		</tbody>
	</table>
</body>
</html>