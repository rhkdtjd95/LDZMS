//==============================================================================
function type0100(data) {
	//상단 시간정보표시용
	$("#maxPowerDemandForecast").val(data.type0100.maxPowerDemandForecast);
	var date = new Date(data.baseDateTime);
    var day = ['일','월','화','수','목','금','토'][date.getDay()];
    $("#eis_mainDateTime").html(date.getFullYear() + '년 '+ timeformat(date.getMonth() + 1) + '월 '+ timeformat(date.getDate()) + '일  (' + day + ') ' + timeformat(date.getHours()) + ':' + timeformat(date.getMinutes()) + ':' + timeformat(date.getSeconds()));
    function timeformat(datetime) {
        var time = datetime;
        if (time < 10) {
            time = "0" + time;
        }

        return time;
    };
	// [그래프 타입 (1) 바 그래프] 설비 용량, 공급 능력, 현재 수요, 최대 예측 수요 조회
	var yaxisMin = 0,
		yaxisMax = 9000,
		xaxisMin = 0,
		xaxisMax = 14,
		markings = [],
		demandsupplydata = [],
		flag = false,
		ticks = [ [ 2.3, "설비용량" ], [ 5.3, "공급능력" ], [ 8.8, "현재수요" ],[ 11.9, "최대예측수요" ] ];
	
	var graphData = [ [ 1.3, data.type0100.totalUnitCapacity ],
	                  [ 4.3, data.type0100.totalUnitCapacity ],
	                  [ 4.3, data.type0100.totalPowerSupplyAvaility ],
	                  [ 7.8, data.type0100.currentPowerDemand ],
	                  [ 10.8, data.type0100.powerReductionForecast*2 + data.type0100.maxPowerDemandForecast ],
	                  [ 10.8, data.type0100.maxPowerDemandForecast ] ];
		//설비용량, 증감발, 공급능력, 현재수요, 최대예측수요(감축량), 최대예측수요
	var color = [ "#004c7a", "#e10000", "#5e94c6", "#be2f00", "#1866ad", "#8e0000" ],
		gradient = [[ "#0d5b88", "#003779" ],
		            [ "#e10000", "#e10000" ],
		            [ "#7bb3e7", "#1866ad" ],
		            [ "#e30000", "#960303" ],
		            [ "#1866ad", "#1866ad" ],
		            [ "#a40000", "#310000" ]];
	
	//배경 설정
	for ( var i = yaxisMin + 1000; i < yaxisMax; i = i + 2000) {
		markings.push({color : 'rgba(220,220,220,0.85)', yaxis : { from : i, to : i + 1000 }});
	}
	//공급능력 초과시
	if (graphData[1][1] < graphData[2][1]) {
		graphData[1][1] = graphData[2][1];
		graphData[2][1] = graphData[0][1];
		flag = true;

	} else {
		color[1] = "rgba(255,255,255,0)";
		gradient[1] = [ "rgba(255,255,255,0)", "rgba(255,255,255,0)" ];
	}
	
	//그래프설정
	if (data.type0100 != null) {
		var len = graphData.length;
		for ( var i = 0; i < len; i++) {
			var graphElement = {
				data : [ graphData[i] ],
				bars : {
					show : true,
					lineWidth : 2,
					barWidth : 2,
					fillColor : {
						colors : gradient[i]
					}
				},
				color : color[i]
			};
			demandsupplydata.push(graphElement);
		}
	}
	
	//옵션설정
	var option0100 = {
		grid : {
			show : "graph0100",
			borderWidth : 0.8,
			borderColor : "rgba(155,155,155,0.85)",
			tickColor : "rgba(255,255,255,0)",
			markings : markings
		},
		xaxis : {
			show : true,
			min : xaxisMin,
			max : xaxisMax,
			ticks : ticks
		},
		yaxis : {
			ticks : 4,
			min : yaxisMin,
			max : yaxisMax,
			labelWidth : 50,
			tickFormatter : function(val, axis) {
				if (val == 0)
					return 0;
				var reg = /(^[+-]?\d+)(\d{3})/;
				var n = (val.toFixed(0) + '');
				while (reg.test(n))
					n = n.replace(reg, '$1' + ',' + '$2');
				return n;
			}
		}
	};
	
	var graph0100 = null;
	
	//그래프 그리기
	if (data.type0100 == null){
		$.plot($("#graph0100"), [ {	data : [], lines : { show : true}} ], option0100);
	}else{
		graph0100 = $.plot($("#graph0100"), demandsupplydata, option0100);
	}
	
	//화살표, 수치표현
	if (graph0100 != null) {
		drawArrow(graph0100, "#0000ff", data.type0100minLoad);
		drawArrow(graph0100, "#FF0000", data.type0100maxLoad);
		showValue(graph0100, data, graphData, flag);
	}
	
	
};
//==============================================================================
function type0200(data){
	//공급능력,예비력
	$("#supplyReserve").html(numberFormat(data.type0200.supplyReserve));
	$("#supplyReserveRate").html(numberFormat(data.type0200.supplyReserveRate.toFixed(2)));
	$("#operationReserve").html(numberFormat(data.type0200.operationReserve));
	$("#operationReserveRate").html(numberFormat(data.type0200.operationReserveRate.toFixed(2)));

}
//==============================================================================
function type0600(data){
	//부하감축량 ON,OFF
	if(data.type0300 == null){
		$("#forecastOnDay").attr('src', 'sample/image/common/switchOff.png');
		$("#directLoadControl").attr('src', 'sample/image/common/switchOff.png');
		$("#emergencyPowerOff").attr('src', 'sample/image/common/switchOff.png');
		$("#demandMarketReductionPower").html(0);
		return;
	}
	if(data.type0300.forecastOnDay == "OFF"){
		$("#forecastOnDay").attr('src', 'sample/image/common/switchOff.png');
	}else{
		$("#forecastOnDay").attr('src', 'sample/image/common/switchOn.png');
	}
	if(data.type0300.directLoadControl == "OFF"){
		$("#directLoadControl").attr('src', 'sample/image/common/switchOff.png');
	}else{
		$("#directLoadControl").attr('src', 'sample/image/common/switchOn.png');
	}
	if(data.type0300.emergencyPowerOff == "OFF"){
		$("#emergencyPowerOff").attr('src', 'sample/image/common/switchOff.png');
	}else{
		$("#emergencyPowerOff").attr('src', 'sample/image/common/switchOn.png');
	}

	
	$("#demandMarketReductionPower").html(data.type0300.demandMarketReductionPower);
	
	}
//==============================================================================

//==============================================================================
function type0400(data){
	// [그래프 타입 (4) 바 그래프] 양수 발전 가능 용량 조회
	var yaxisMin = 0,
		yaxisMax = 600,
		xaxisMin = 0,
		xaxisMax = 27,
		yTick = (yaxisMax - yaxisMin) / 3,
		markings = [],
		ticks = [];
	
	//배경 설정
	for ( var i = yaxisMin + yTick; i < yaxisMax; i = i + yTick){
		markings.push({	color : 'rgba(210,210,210,0.4)', lineWidth : 0.2, yaxis : { from : i, to : i }});
	}
	
	if (data.type0400 != null){
		len = data.type0400.length;
		var x;
		for ( var i = 0; i < len; i++) {
			x = Number(data.type0400[i][0]) + Number(1);
			ticks.push([ x, (i + 1) + '시간' ], 100);
		}
	}
	
	//옵션설정
	var option0400 = {
		grid : {
			show : "graph0400",
			borderWidth : 0.8,
			borderColor : "rgba(155,155,155,0.85)",
			tickColor : "rgba(255,255,255,0)",
			markings : markings
		},
		xaxis : {
			show : true,
			min : xaxisMin,
			max : xaxisMax,
			ticks : ticks,
			labelWidth : 40
		},
		yaxis : {
			show : true,
			min : yaxisMin,
			max : yaxisMax,
			ticks : 3,
			labelWidth : 40
		}
	};
	
	var graph0400 = null;
	
	if (data.type0400 == null){
		$.plot($("#graph0400"), [ { data : [], lines : { show : true }} ], option0400);
	}else{
		graph0400 = $.plot($("#graph0400"),
				[ { data : data.type0400,
					bars : { show : true, lineWidth : 0, barWidth : 2, fillColor : { colors : [ "#3fbcf7", "#045585" ]}},
					color : "#777"} ],
					option0400);
		}
	
	if (graph0400 != null){
		var position;
		var x;
		for ( var i = 0; i < len; i++) {
			x = Number(data.type0400[i][0]) + Number(1), y = data.type0400[i][1];
			position = graph0400.pointOffset({ x : x, y : y	});
			$("#graph0400").append('<div class="eis_graphPumpedData" style="left:' + (position.left - 14) + 'px;top:' + (position.top - 20) + 'px;text-align:center;position:absolute;width:30px">' + y	+ '</div>');
			}
		}
	$(".eis_col0301").find("span").find(".eis_captionBlue").html(data.type0400initRate);
	}
//==============================================================================

//==============================================================================
function type0500(data){
	if (data.type0500 == null){
		$.plot($("#graph0500"), [ {	data : [], lines : { show : true, lineWidth : 0.5 }} ],	{grid : {
			show : "graph0500",
			borderColor : "rgba(155,155,155,0.85)",
			borderWidth : 0.8,
			tickColor : "rgba(255,255,255,0)"
		}});
		return;
	}
	// [그래프 타입 (5) 주파수 그래프] 60분 전 주파수 정보 조회
	var xaxisMin = data.type0500StartTime,
		xaxisMax = data.type0500EndTime,
		yaxisMin = data.type0500MinFrequency,
		yaxisMax = data.type0500MaxFrequency,
		markings = [];
	//최대 최소 주파수  구하기
	if (yaxisMax > 60.2 || yaxisMin < 59.8){
		if (Math.abs((60.00 - data.type0500MaxFrequency)) - Math.abs((60.00 - data.type0500MinFrequency)) > 0){
			yaxisMin = 60.00 - Math.abs((60.00 - data.type0500MaxFrequency)) - 0.05;
			yaxisMax = 60.00 + Math.abs((60.00 - data.type0500MaxFrequency)) + 0.05;
		}else{
			yaxisMax = 60.00 + Math.abs((60.00 - data.type0500MinFrequency)) + 0.05;
			yaxisMin = 60.00 - Math.abs((60.00 - data.type0500MinFrequency)) - 0.05;
		}
	}

	//배경설정
	var xTick = (xaxisMax - xaxisMin) / 4,
		xLabelTick = (xaxisMax - xaxisMin) / 2,
		yLabelTick = (yaxisMax - yaxisMin) / 2,
		xticks = [[ xaxisMin, "10분 전" ], [ xaxisMin + xLabelTick, "5분 전" ], [ xaxisMax, "현재" ] ],
		yticks = [[ yaxisMin, yaxisMin.toFixed(2) ],[ yaxisMin + yLabelTick, ((yaxisMin + yaxisMax) / 2).toFixed(2) ], [ yaxisMax, yaxisMax.toFixed(2) ] ];
	
	for ( var i = xaxisMin + xTick; i < xaxisMax; i = i + xTick){ 
		markings.push({ color : 'rgba(165,165,165,0.85)', lineWidth : 0.8, xaxis : { from : i, to : i } });
	}

	//현재 주파수 계산
	var lastData = 0;
	if (xaxisMax - 10000 <= data.type0500[data.type0500.length - 1][0]){
		lastData = data.type0500[data.type0500.length - 1][1];
	}else{
		lastData = 0;
	}
	
	//주파수 그래프 옵션설정
	var option0500 = {
		grid : {
			show : "graph0500",
			borderColor : "rgba(155,155,155,0.85)",
			borderWidth : 0.8,
			tickColor : "rgba(255,255,255,0)",
			markings : markings
		},
		xaxis : {
			show : true,
			min : xaxisMin,
			max : xaxisMax,
			ticks : xticks/*,
			mode : "time",
			minTickSize : [ 1, "minute" ],
			tickFormatter : function(val, axis) {
				var d = new Date(val);
				return d.getHours()+":"+d.getMinutes();
			}*/
		},
		yaxis : {
			show : true,
			ticks : yticks,
			labelWidth : 40,
			min : yaxisMin.toFixed(2),
			max : yaxisMax.toFixed(2)
		}
	};
	
	if (data.type0500 == null){
		$.plot($("#graph0500"), [ {	data : [], lines : { show : true, lineWidth : 0.5 }} ],	option0500);
	}else{
		$.plot($("#graph0500"), [ { data : data.type0500, lines : {	show : true, lineWidth : 1 }, color : "#14589f"} ], option0500);
	}
	$("#eis_frequency").find("span").html('현재: '+ '<span style="color: #004C90; font-size: 16px">'+lastData +'</span>'+ 'Hz');
};
//==============================================================================

//==============================================================================
function type0700(data){
	//기상정보텍스트
	$(".eis_degreeLow").children().children('.eis_txtNum').html(data.type0700.forecastMinTemperature);
	$(".eis_degreeHigh").children().children('.eis_txtNum').html(data.type0700.forecastMaxTemperature);
	$(".eis_degreeNow").children().children('.eis_txtNum').html(data.type0700.currentTemperature);
};
//==============================================================================

//==============================================================================
function type0800(data){
	//범례텍스트
	if(data.type0800 == null){
		$( "#pumpPower" ).html(0);
		$( "#hydroPower" ).html(0);
		$( "#gasPower" ).html(0);
		$( "#oilPower" ).html(0);
		$( "#renewPower" ).html(0);
		$( "#domesticPower" ).html(0);
		$( "#coalPower" ).html(0);
		$( "#nuclearPower" ).html(0);
		return;
	}
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

//==============================================================================
function drawArrow(graphId, color, pos) {
	//최대,최소 부하표시 화살표
	var ctx = graphId.getCanvas().getContext("2d");
	var o = graphId.pointOffset({
		x : 7.2,
		y : pos
	});
	ctx.beginPath();
	o.left += 4;
	o.top += 2;
	ctx.moveTo(o.left, o.top);
	ctx.lineTo(o.left, o.top - 5);
	ctx.lineTo(o.left + 5, o.top - 2);
	ctx.lineTo(o.left, o.top);
	ctx.fillStyle = color;
	ctx.fill();
};
//==============================================================================

//==============================================================================
function showValue(graphId, data, graphData, flag) {
	var weight = 0;
	if($(window).width()>1910)
		weight = -500;
	else
		weight = 0;	
	
	//설비용량
	var o = graphId.pointOffset({
		x : 0.6,
		y : 1500
	});
	//공급능력이 설비용량 초과시
	if(flag){
		graphData[2][1]=graphData[1][1];
	}
	$("#graph0100").append('<div class="eis_graphData" style="left:' + o.left + 'px;top:' + o.top+ 'px;text-align:center;position:absolute;width:100px">'
					+ numberFormat(graphData[0][1]) + '</div>');
	//증감발
	o = graphId.pointOffset({
		x : 3.6,
		y : graphData[2][1]+1600+weight
	});
	//if($("#display").val() == "true"){
		$("#graph0100").append(
				'<div style="color:#000000; left:' + o.left + 'px;top:' + (o.top-20) + 'px;text-align:center;position:absolute;width:100px;">감발전력량<div class="eis_graphNegativeData" style="margin-top:7px;" >'
						+ numberFormat((graphData[0][1] - graphData[2][1])) + '</div></div>');
	
	/*}else{
		$("#graph0100").append(
				'<div class="eis_graphNegativeData" style="left:' + o.left + 'px;top:' + o.top + 'px;text-align:center;position:absolute;width:100px">'
						+ numberFormat((data.type0100[0][1] - data.type0100[2][1]))	+ '</div>');		
	}*/
	//공급능력
	o = graphId.pointOffset({
		x : 3.6,
		y : 1500
	});
	$("#graph0100").append(
			'<div class="eis_graphData" style="left:' + o.left + 'px;top:' + o.top + 'px;text-align:center;position:absolute;width:100px">'
					+ numberFormat(graphData[2][1]) + '</div>');
	//현재수요
	o = graphId.pointOffset({
		x : 7.1,
		y : 1500
	});
	$("#graph0100").append(
			'<div class="eis_graphData" style="left:' + o.left + 'px;top:' + o.top + 'px;text-align:center;position:absolute;width:100px">'
					+ numberFormat(graphData[3][1]) + '</div>');
	
	//최대예측수요(감축량)
	o = graphId.pointOffset({
		x : 10.1,
		y : graphData[4][1]+1600+weight
	});
	//if($("#display").val() == "true"){
	if(Number(data.powerReductionForecast) != 0)	
	$("#graph0100").append(
				'<div style="color:#000000; left:' + o.left + 'px;top:' + (o.top-20) + 'px;text-align:center;position:absolute;width:100px;">수요관리량<div class="eis_graphData"  style="border:1px dashed;color:#1866ad;width:50px;margin-top:5px;margin-left:25px;">'
						+ numberFormat(data.powerReductionForecast) + '</div></div>');		
	/*}else{
		$("#graph0100").append(
				'<div class="eis_graphData" style="color:#1866ad; left:' + o.left + 'px;top:' + o.top + 'px;text-align:center;position:absolute;width:100px">'
						+ numberFormat(data.powerReductionForecast) + '</div>');
		
	}*/
	//최대예측수요
	o = graphId.pointOffset({
		x : 10.1,
		y : 1500
	});
	$("#graph0100").append(
			'<div class="eis_graphData" style="left:' + o.left + 'px;top:' + o.top + 'px;text-align:center;position:absolute;width:100px">'
					+ numberFormat(graphData[5][1]) + '</div>');
};
//==============================================================================

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

//==============================================================================
function realdatetime(data) {
	var date = new Date(data.type0500EndTime);
	var day = ['일','월','화','수','목','금','토'][date.getDay()];
    $("#eis_mainDateTime").html(date.getFullYear() + '년 '+ timeformat(date.getMonth() + 1) + '월 '+ timeformat(date.getDate()) + '일  (' + day + ') ' + timeformat(date.getHours()) + ':' + timeformat(date.getMinutes()) + ':' + timeformat(date.getSeconds()));
};
function timeformat(datetime) {
	var time = Number(datetime);
	if (time < 10) {
		time = "0" + time;
	}

	return time;
};

function initRefresh2000(){
	//처음 화면로드시 초기화
	//공급수요
    $.ajax({
       url: 'pastType0100.action',
       type: 'POST',
       dataType: 'json',
       data: $("#MyForm").serialize(),
       timeout: 5000,
       success: function(data){
    	   type0100(data);
    	   type0200(data);
       }
       }); 
	//양수발전
   $.ajax({
       url: 'pastType0400.action',
       type: 'POST',
       dataType: 'json',
       data: $("#MyForm").serialize(),
       timeout: 5000,
       success: type0400,
       error: type0400
   }); 
	//주파수
   $.ajax({
       url: 'pastType0500.action',
       type: 'POST',
       dataType: 'json',
       data: $("#MyForm").serialize(),
       timeout: 5000,
       success: type0500,
       error: type0500
   }); 
	//부하감축량
   $.ajax({
       url: 'pastType0600.action',
       type: 'POST',
       dataType: 'json',
       data: $("#MyForm").serialize(),
       timeout: 5000,
       success: type0600,
       error: type0600
   });
   //기상정보
   $.ajax({
       url: 'pastType0700.action',
       type: 'POST',
       dataType: 'json',
       data: $("#MyForm").serialize(),
       timeout: 5000,
       success: type0700,
       error: type0700
   }); 
   //범례
   $.ajax({
       url: 'pastType0800.action',
       type: 'POST',
       dataType: 'json',
       data: $("#MyForm").serialize(),
       timeout: 5000,
       success: type0800,
       error: type0800
   }); 

}