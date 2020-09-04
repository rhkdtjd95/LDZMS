<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" isELIgnored="false"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>

<jsp:include page="/WEB-INF/jsp/common/topNormal.jsp" />

						<div id="pagetitle" class="clearfix"><h1 class="left">경차 전용구역 관리 시스템</h1></div>
					</div>
				</header>

				<div class="container_16 clearfix" id="actualbody">
					<div class="grid_16 widget first">
						<div class="widget_title clearfix">
							<h2>기관 등록 매뉴얼</h2>
						</div>
						<div class="widget_body">
							<div class="widget_content">
				               	<p><strong>STEP: #1</strong></p>
				                <div class="settings" style="height: 20px; padding: 5px;">
				                    <span>기관 정보 등록에 필요한 항목을 기재한다.</span>
				                </div>
							</div>
							<div class="widget_content">
				               	<p><strong>STEP: #2</strong></p>
				                <div class="settings" style="height: 20px; padding: 5px;">
				                    <span>기관 정보 등록 버튼을 눌렀을 때 발급되는 '<font style="color: red;">접근 키</font>'를 반드시 기록한다.</span>
				                </div>
							</div>
							<div class="widget_content">
				               	<p><strong>STEP: #3</strong></p>
				                <div class="settings" style="height: 20px; padding: 5px;">
				                    <span>기관 정보 등록 시 입력한 '<font style="color: red;">아이디</font>'와 발급된 '<font style="color: red;">접근 키</font>'를 사용해서 위반 차량 정보를 조회한다.</span>
				                </div>
							</div>
				
							<form id="form_add" action="${pageContext.request.contextPath}/institution/add" method="post" name="addForm" onsubmit="return availableCheck();">
								<table>
									<tbody>
										<tr class="odd">
											<td width="10%" style="padding-left: 10px;"><label
												for="fullname">기관명</label></td>
											<td><input type="text" name="name" maxlength="11"></td>
										</tr>
										<tr class="even">
											<td width="10%" style="padding-left: 10px;"><label
												for="Email">연락처</label></td>
												
											<td><input type="text" class="phone-number-check" name="phoneNumber" maxlength="30"/>
										</tr>
										<tr class="odd">
											<td width="10%" style="padding-left: 10px;"><label
												for="password">주소</label></td>
											<td><input type="text" name="address" maxlength="30"></td>
										</tr>
										<tr class="even">
											<td width="10%" style="padding-left: 10px;"><label
												for="Confirm Password">아이디</label>
											</td>
											<td>
												<input type="text" id="id" name="id" onchange="change(this)" maxlength="11">
												<input type="button" id="search" class="btn orange" value="중복검사" />
												<div id="checkLab"></div><input type="hidden" id="checkOverlap" name="checkOverlap" value='disabled'>
											</td>
										</tr>
									</tbody>
								</table>
							</form>
					</div>
				</div>
				<div class="clear"></div>
				<div class="grid_16">
					<a id="function_add" id="function_add" class="btn large right"><span>기관 등록</span></a>
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
	
	$('#search').click(function() {
		$.ajax({
			url : "/institution/duplication",
			type : "post",
			data : $("#id").serialize(),
			success : function(data) {
				console.log(data);
				if(data.isDuplicate == 'true') {
					$('#checkLab').text("사용가능");
					document.getElementById("checkOverlap").value = 'available';
				} else {
					$('#checkLab').text("사용불가능");
				}
			},
			error : function(){
				alert('오류')
			}
		});
	});
	
	function change(obj) {
		document.getElementById("checkOverlap").value = 'disabled';
	}
	
	function trim(stringToTrim) {
		return stringToTrim.replace(/^\s|\s+|\s+$/g,'');
	}
	
	function availableCheck() {
		var name = document.addForm.name;
		var phoneNumber = document.addForm.phoneNumber;
		var address = document.addForm.address;
		var id = document.addForm.id;
		var idRestrict =  /^[A-za-z]{5,15}/g;
		
		var addForm = window.confirm("등록하시겠습니까");
		if (addForm) {			
			if (name.value == '') {
				window.alert("기관명을 입력해주세요!");
				return false;
			} 
			
			if (trim(name.value) == '') {
				alert("공백제거해주세요 ");
				return false;
			}
			
		    if (phoneNumber.value == '') {
				window.alert("연락처를 다시 입력해주세요");
				return false;
			} 
		    
		    if (phoneNumber.value.indexOf(' ') >= 0) {
				window.alert("공백안됩니다");
				return false;
			}
			
			if (address.value == '') {
				window.alert("주소를 다시 입력해주세요");
				return false;
			}
			
			if (trim(address.value) == '') {
				alert("공백 ");
				return false;
			}
			
			if (!idRestrict.test(id.value)) {
				alert("아이디에 영문 대문자 또는 소문자로 시작하는 아이디, 길이는 5~15자");
				return false;
			}
			
			if (id.value.indexOf(' ') >= 0) {
				window.alert("공백안됩니다");
				return false;
			}

			if (checkOverlap.value == 'disabled') {
				window.alert("중복체크를 확인해주세요");
				document.getElementById('no').focus();
				return false;
			}
			return true;
		} else {
			return false;
		}
}; 
</script>


<jsp:include page="/WEB-INF/jsp/common/footer.jsp"></jsp:include>