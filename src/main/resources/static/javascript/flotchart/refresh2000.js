// -------------------------------------------------------------------------
function refreshType0100(data){
	//공급수요,예비력게이지
    type0100(data);
    var demoGauge = new jGauge();
    
    type0200Init(data, demoGauge);
    type0200(data, demoGauge);
    var refreshId0100 = setInterval(function() {
        $.ajax({
            url: 'realTimeType0100.action',
            type: 'POST',
            dataType: 'json',
            timeout: 4000,
            success: function(data2){
            	type0100(data2);
            	type0200(data2, demoGauge);}
        }); 
    }, 4000);
    //리사이즈시 게이지 변경
	 function resizeStuff() {
		 $.ajax({
	            url: 'realTimeType0100.action',
	            type: 'POST',
	            dataType: 'json',
	            timeout: 4000,
	            success: function(data2){
	            	type0200Init(data2, demoGauge);
	            	type0100(data2);
	            	type0200(data2, demoGauge);}
	        }); 
	     	} 
	    	var TO = false; 
	$(window).resize(function(){ 
	 if(TO !== false) 
	    clearTimeout(TO); 
	 TO = setTimeout(resizeStuff, 1000); //200 is time in miliseconds 
	}); 
};
//==============================================================================

//==============================================================================
/*function refreshType0200(data){
   
    var refreshId0200 = setInterval(function() {
        $.ajax({
            url: 'realTimeType0200.action',
            type: 'POST',
            dataType: 'json',
            timeout: 2000,
            success: 
        }); 
    }, 4000);
};*/
//==============================================================================
//==============================================================================
function refreshType0300(data){
	//부하감축량
	type0300(data);
    var refreshId0300 = setInterval(function() {
        $.ajax({
            url: 'realTimeType0300.action',
            type: 'POST',
            dataType: 'json',
            timeout: 4000,
            success: type0300
            
        }); 
    }, 4000);
};
//==============================================================================

//==============================================================================
function refreshType0400(data){
	//양수발전
    type0400(data);
    var refreshId0400 = setInterval(function() {
        $.ajax({
            url: 'realTimeType0400.action',
            type: 'POST',
            dataType: 'json',
            timeout: 4000,
            success: type0400
        }); 
    }, 4000);
};
//==============================================================================

//==============================================================================
function refreshType0500(data){
	//주파수
    type0500(data);
    var refreshId0500 = setInterval(function() {
        $.ajax({
            url: 'realTimeType0500.action',
            type: 'POST',
            dataType: 'json',
            timeout: 4000,
            success: type0500
        }); 
    }, 4000);
};
//==============================================================================

//==============================================================================
function refreshType0700(data){
	//기온정보
    type0700(data);
    var refreshId0700 = setInterval(function() {
        $.ajax({
            url: 'realTimeType0700.action',
            type: 'POST',
            dataType: 'json',
            timeout: 4000,
            success: type0700
        }); 
    }, 4000);
};
//==============================================================================
function refresh5000(data){
    var reverseData = [[2, data.totalUnitCapacity], [4, data.totalPowerSupplyAvaility], [6, data.currentPowerDemand], [8, data.maxPowerDemandForecast]];
    var options = {
        xaxis: { show: true, min: 0, max: 10 },
        yaxis: { max: 8000 }
    };
    $.plot($("#barGraph"), [{data: reverseData, bars: { show: true, barWidth: 1}}], options);
};

  //==============================================================================    
    
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

//==============================================================================
function type0200Init(data,demoGauge){
	
	if($(window).width() > 1910){
		//1920*1280 화면시 게이지
		demoGauge.id = 'graph0200'; // Link the new jGauge to the placeholder DIV.
		demoGauge.imagePath = '/image/jgauge/jgauge1920/bgGauge.png';
		demoGauge.segmentStart = 0;
		demoGauge.segmentEnd = 270;
		demoGauge.width = 213;
		demoGauge.height = 213;
		demoGauge.needle.imagePath = '/image/jgauge/jgauge1920/guagePin.png';
		demoGauge.needle.xOffset = 0;
		demoGauge.needle.yOffset = -5;
	    demoGauge.ticks.start = 600;
	    demoGauge.ticks.end = 0;
	    demoGauge.ticks.count = 0;
	    demoGauge.ticks.color = 'rgba(0, 0, 0, 0)';
	    demoGauge.range.color = 'rgba(0, 0, 0, 0)';
		$("#graph0200-canvas-ticks").css('class','eis_status0');
	}else{
		//1280*1024 게이지
		demoGauge.id = 'graph0200'; // Link the new jGauge to the placeholder DIV.
		demoGauge.imagePath = '/image/jgauge/jgauge1280/bgGauge.png';
		demoGauge.segmentStart = 31;
		demoGauge.segmentEnd = 241;
		demoGauge.width = 193;
		demoGauge.height = 158;
		demoGauge.needle.imagePath = '/image/jgauge/jgauge1280/guagePin.png';
		demoGauge.needle.xOffset = 0;
		demoGauge.needle.yOffset = 14;
	    demoGauge.ticks.start = 600;
	    demoGauge.ticks.end = 0;
	    demoGauge.ticks.count = 0;
	    demoGauge.ticks.color = 'rgba(0, 0, 0, 0)';
	    demoGauge.range.color = 'rgba(0, 0, 0, 0)';
		$("#graph0200-canvas-ticks").css('class','eis_status0');
		
	}
	var value=Number(data.type0200.operationReserve);
	if(value>600){
		value=601;
	}
	else if(value <= 0){
		value=0;
	}
    demoGauge.init();
};
function type0200(data, demoGauge){
	var value=Number(data.type0200.operationReserve);
	if(value>600){
		value=601;
	}
	else if(value <= 0){
		value=0;
	}
	var status=data.type0200Status.alarmLevel;
	//값에의해 경보변할시
	/*if(value > 500){
		$("#graph0200-canvas-ticks").attr('class','eis_status0');
	}else if(value <= 500 && 400 < value){
		$("#graph0200-canvas-ticks").attr('class','eis_status1');
	}else if(value <= 400 && 300 < value){
		$("#graph0200-canvas-ticks").attr('class','eis_status2');
	}else if(value <= 300 && 200 < value){
		$("#graph0200-canvas-ticks").attr('class','eis_status3');
	}else if(value <= 200 && 100 < value){
		$("#graph0200-canvas-ticks").attr('class','eis_status4');
	}else if(value <= 100){
		$("#graph0200-canvas-ticks").attr('class','eis_status5');
	}else{
		$("#graph0200-canvas-ticks").attr('class','eis_status0');
	}*/
	//경보 선택시
	if(status == "00"){
		$("#graph0200-canvas-ticks").attr('class','eis_status0');
	}else if(status == "01"){
		$("#graph0200-canvas-ticks").attr('class','eis_status1');
	}else if(status == "02"){
		$("#graph0200-canvas-ticks").attr('class','eis_status2');
	}else if(status == "03"){
		$("#graph0200-canvas-ticks").attr('class','eis_status3');
	}else if(status == "04"){
		$("#graph0200-canvas-ticks").attr('class','eis_status4');
	}else if(status == "05"){
		$("#graph0200-canvas-ticks").attr('class','eis_status5');
	}else{
		$("#graph0200-canvas-ticks").attr('class','eis_status0');
	}
	demoGauge.setValue(value);
	
	$("#supplyReserve").html(numberFormat(data.type0200.supplyReserve));
	$("#supplyReserveRate").html(numberFormat(data.type0200.supplyReserveRate.toFixed(2)));
	$("#operationReserve").html(numberFormat(data.type0200.operationReserve));
	$("#operationReserveRate").html(numberFormat(data.type0200.operationReserveRate.toFixed(2)));
};
//==============================================================================

//==============================================================================
function type0300(data){
	//부하감축량 ON,OFF
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
	//기온정보텍스트
	$(".eis_degreeLow").children().children('.eis_txtNum').html(data.type0700.forecastMinTemperature);
	$(".eis_degreeHigh").children().children('.eis_txtNum').html(data.type0700.forecastMaxTemperature);
	$(".eis_degreeNow").children().children('.eis_txtNum').html(data.type0700.currentTemperature);
};
//==============================================================================

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
       url: 'realTimeType0100.action',
       type: 'POST',
       dataType: 'json',
       timeout: 5000,
       success: refreshType0100,
       error: refreshType0100
       }); 
	//예비력
   /* $.ajax({
       url: 'realTimeType0200.action',
       type: 'POST',
       dataType: 'json',
       timeout: 5000,
       success: refreshType0200
   });  */ 
	//부하감축량
   $.ajax({
       url: 'realTimeType0300.action',
       type: 'POST',
       dataType: 'json',
       timeout: 5000,
       success: refreshType0300,
       error: refreshType0300
   });
	//양수발전
   $.ajax({
       url: 'realTimeType0400.action',
       type: 'POST',
       dataType: 'json',
       timeout: 5000,
       success: refreshType0400,
       error: refreshType0400
   }); 
	//주파수
   $.ajax({
       url: 'realTimeType0500.action',
       type: 'POST',
       dataType: 'json',
       timeout: 5000,
       success: refreshType0500,
       error: refreshType0500
   }); 
	//기상정보
   $.ajax({
       url: 'realTimeType0700.action',
       type: 'POST',
       dataType: 'json',
       timeout: 5000,
       success: refreshType0700,
       error: refreshType0700
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
//게이지 바늘 확인용 랜덤값
/*function randVal()
{
	var n1=0,n2=600;
	return (Math.random() * (n2 - n1 + 1)) + n1;
};*/