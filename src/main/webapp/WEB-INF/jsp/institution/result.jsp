<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" isELIgnored="false"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<jsp:include page="/WEB-INF/jsp/common/topNormal.jsp" />
				<div id="pagetitle" class="clearfix"><h1 class="left">경차 전용구역 관리 시스템</h1></div>
			</div>
		</header>
		<div class="container_16 clearfix" id="actualbody">
			<div class="grid_16 widget first">
				<div class="widget_title clearfix">
					<h2>기관 등록 완료</h2>
				</div>
				<div class="widget_body">
					<div class="widget_content">
						<!-- 내용 문구를 이 사이에 작성한다. -->
						<c:if test="${accessKey != null}">
							<div class="widget_content" style="width: 99%;">
								<p><strong># 발급된 접근키는 아래와 같습니다.</strong></p>
				                <div class="failure" style="height: 20px; padding: 5px;">
				                    <span><b><i>접근키 : <font color='red'><c:out value="${accessKey}" /></font></i></b></span>
				                </div>
							</div><br>
						</c:if>
						<div class="widget_content" style="width: 99%;">
			               	<p><strong>1. 요청 명세 (POST 방식)</strong></p>
			                <div class="settings" style="height: 20px; padding: 10px;">
			                    <span>'위반 차량 정보 요청' 인터페이스의 요청 명세는 다음과 같습니다.</span>
			                </div>
						</div>
						<div class="widget_body" style="width: 99%; text-align: right; margin-left: 10px; padding-top: 5px;">
							<table>
								<thead>
									<tr>
										<th></th>
										<th>구분</th>
										<th>항목(한글)</th>
										<th>항목(영문)</th>
										<th>타입</th>
										<th>필수</th>
										<th>설명</th>
									</tr>
								</thead>
								<tbody>
									<tr>
										<td class="center"></td>
										<td class="center">요청</td>
										<td class="center">접근키</td>
										<td class="center">accessKey</td>
										<td class="center">문자열</td>
										<td class="center">O</td>
										<td>서버에 접근하기 위한 키</td>
									</tr>
									<tr>
										<td class="center"></td>
										<td class="center">요청</td>
										<td class="center">차량 번호</td>
										<td class="center">no</td>
										<td class="center">문자열</td>
										<td class="center">O</td>
										<td>정보 조회를 위해 서버에 전송하는 차량 번호</td>
									</tr>
									<tr>
										<td class="center"></td>
										<td class="center">요청</td>
										<td class="center">기관 아이디</td>
										<td class="center">id</td>
										<td class="center">문자열</td>
										<td class="center">O</td>
										<td>기관 아이디</td>
									</tr>
								</tbody>
							</table>
						</div>
						<div class="widget_content" style="width: 99%;">
							<p><strong>예시)</strong></p>
			                <div class="settings" style="height: 20px; padding: 5px;">
			                    <span><b><i>http://ldms.traffic.org/violation&accessKey={접근키}&no={차량번호}&id={기관아이디}</i></b></span>
			                </div>
						</div><br>
						<div class="widget_content" style="width: 99%;">
			               	<p><strong>2. 응답 명세 (JSON)</strong></p>
			                <div class="settings" style="height: 20px; padding: 10px;">
			                    <span>'위반 차량 정보 요청' 인터페이스의 응답 명세는 다음과 같습니다.</span>
			                </div>
						</div>
						<div class="widget_body" style="width: 99%; text-align: right; margin-left: 10px; padding-top: 5px;">
							<table>
								<thead>
									<tr>
										<th></th>
										<th>구분</th>
										<th>항목(한글)</th>
										<th>항목(영문)</th>
										<th>타입</th>
										<th>필수</th>
										<th>설명</th>
									</tr>
								</thead>
								<tbody>
									<tr>
										<td class="center"></td>
										<td class="center">응답</td>
										<td class="center">코드</td>
										<td class="center">code</td>
										<td class="center">문자열</td>
										<td class="center">O</td>
										<td>결과 코드</td>
									</tr>
									<tr>
										<td class="center"></td>
										<td class="center">응답</td>
										<td class="center">메시지</td>
										<td class="center">message</td>
										<td class="center">문자열</td>
										<td class="center"></td>
										<td>결과 메시지</td>
									</tr>
									<tr>
										<td class="center"></td>
										<td class="center">응답</td>
										<td class="center">차량 번호</td>
										<td class="center">no</td>
										<td class="center">문자열</td>
										<td class="center">O</td>
										<td>요청 차량의 번호</td>
									</tr>
									<tr>
										<td class="center"></td>
										<td class="center">응답</td>
										<td class="center">모델명</td>
										<td class="center">model</td>
										<td class="center">문자열</td>
										<td class="center">O</td>
										<td>요청 차량의 배기량</td>
									</tr>
									<tr>
										<td class="center"></td>
										<td class="center">응답</td>
										<td class="center">위반 일시</td>
										<td class="center">violationDate</td>
										<td class="center">문자열</td>
										<td class="center">O</td>
										<td>요청 차량의 위반 일시</td>
									</tr>
								</tbody>
							</table>
						</div>
						<div  style="width: 99%; margin-left: 10px; padding-top: 5px;">
<code><pre style="padding: 0px 0px 10px 15px; margin: 0px;"><b>
{
    "message": {
        "code":"200",
        "message":" "
    },
    "vehicle": {
        "no":"10가1234",
        "model":"matiz",
        "cc":990,
        "violationDate":2019-10-11 23:10:21
    }
}</b></pre></code>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div class="clear"></div>
	</div>
</div>
<jsp:include page="/WEB-INF/jsp/common/footer.jsp" />