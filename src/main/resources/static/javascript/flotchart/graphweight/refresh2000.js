//==============================================================================
function type0800(data){
	//범례텍스트
	$( "#pumpPower" ).html(numberFormat(data.type0800.pumpPower));
	$( "#hydroPower" ).html(numberFormat(data.type0800.hydroPower));
	$( "#gasPower" ).html(numberFormat(data.type0800.gasPower));
	$( "#oilPower" ).html(numberFormat(data.type0800.oilPower));
	$( "#renewPower" ).html(numberFormat(data.type0800.renewPower));
	$( "#domesticPower" ).html(numberFormat(data.type0800.domesticPower));
	$( "#coalPower" ).html(numberFormat(data.type0800.coalPower));
	$( "#nuclearPower" ).html(numberFormat(data.type0800.nuclearPower));
};
//==============================================================================
function type0100(data) {
	//상단 시간정보표시용
	$("#maxPowerDemandForecast").val(data.type0100.maxPowerDemandForecast);
	var date = new Date(data.baseDateTime);
    var day = ['일','월','화','수','목','금','토'][date.getDay()];
    $("#eis_mainDateTime").html(date.getFullYear() + '년 '+ timeformat(date.getMonth() + 1) + '월 '+ timeformat(date.getDate()) + '일  (' + day + ') ' + timeformat(date.getHours()) + ':' + timeformat(date.getMinutes()) + ':' + timeformat(date.getSeconds()));
}
//==============================================================================
function refreshType0100(data){
	//공급수요,예비력게이지
    type0100(data);
    var refreshId0100 = setInterval(function() {
        $.ajax({
            url: 'realTimeType0100.action',
            type: 'POST',
            dataType: 'json',
            timeout: 4000,
            success: type0100
        }); 
    }, 4000);
}
function refreshType0800(data){
	//범례정보
	type0800(data);
	 var refreshId0500 = setInterval(function() {
         $.ajax({
             url: 'realTimeType0800.action',
             type: 'POST',
             dataType: 'json',
             timeout: 4000,
             success: type0800
         }); 
     }, 4000);

};
//==============================================================================
function timeformat(datetime) {
	var time = Number(datetime);
	if (time < 10) {
		time = "0" + time;
	}

	return time;
};
//==============================================================================
//숫자 포멧변경용 함수(천단위 쉼표)
function numberFormat(val) {
	if (val == 0)
		return 0;
	var reg = /(^[+-]?\d+)(\d{3})/;
	var n = (val + '');
	while (reg.test(n))
		n = n.replace(reg, '$1' + ',' + '$2');
	return n;
};
//==============================================================================

function initRefresh2000(){
	//처음 화면로드시 초기화
    $.ajax({
        url: 'realTimeType0100.action',
        type: 'POST',
        dataType: 'json',
        timeout: 5000,
        success: refreshType0100,
        error: refreshType0100
        }); 
	//범례
   $.ajax({
       url: 'realTimeType0800.action',
       type: 'POST',
       dataType: 'json',
       timeout: 5000,
       success: refreshType0800,
       error: refreshType0800
   }); 
}