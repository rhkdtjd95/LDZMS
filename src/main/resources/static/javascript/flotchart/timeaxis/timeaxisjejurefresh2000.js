// -------------------------------------------------------------------------
function refreshType0100(data){
	//공급수요,예비력게이지
    type0100(data);
    var refreshId0100 = setInterval(function() {
        $.ajax({
            url: 'realTimeAxisJejuType0100.action',
            type: 'POST',
            dataType: 'json',
            timeout: 4000,
            success: function(data2){
            	type0100(data2);
            	}
        }); 
    }, 4000);
};
//==============================================================================
function refreshType0200(data){
	//주파수
    type0200(data);
    var refreshId0200 = setInterval(function() {
        $.ajax({
            url: 'realTimeAxisJejuType0200.action',
            type: 'POST',
            dataType: 'json',
            timeout: 4000,
            success: type0200
        }); 
    }, 4000);
};
//==============================================================================
function refreshType0700(data){
	//기온정보
    type0700(data);
    var refreshId0700 = setInterval(function() {
        $.ajax({
            url: 'realTimeAxisJejuType0100.action',
            type: 'POST',
            dataType: 'json',
            timeout: 4000,
            success: type0700
        }); 
    }, 4000);
};
//==============================================================================    
function refreshType0300(data){
	//범례정보
	type0300(data);
	 var refreshId0500 = setInterval(function() {
         $.ajax({
             url: 'realTimeAxisJejuType0300.action',
             type: 'POST',
             dataType: 'json',
             timeout: 4000,
             success: type0300
         }); 
     }, 4000);

};
    
    
//==============================================================================
function type0100(data) {
	//상단 시간정보표시용
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
		yaxisMax = 800,
		xaxisMin = 0,
		xaxisMax = 14,
		markings = [],
		demandsupplydata = [],
		flag = false,
		ticks = [ [ 2.3, "공급능력" ], [ 5.3, "제주발전" ], [ 8.8, "연계조류" ],[ 11.9, "제주수요" ] ];
	
		//설비용량, 증감발, 공급능력, 현재수요, 최대예측수요(감축량), 최대예측수요
	var color = [ "#5d97cc", "#8c5dcc", "#7fb700", "#cc3300" ],
		gradient = [[ "#7db5e8", "#1664ac" ],
		            [ "#b77de8", "#6016ac" ],
		            [ "#add700", "#669900" ],
		            [ "#e40000", "#950303" ]];
	
	//배경 설정
	for ( var i = yaxisMin + 100; i < yaxisMax; i = i + 200) {
		markings.push({color : 'rgba(220,220,220,0.85)', yaxis : { from : i, to : i + 100 }});
	}

	//그래프 위치, 값 설정
	var graphData = [ [ 1.3, data.type0100.jejuCapacity ], [ 4.3, data.type0100.totalJejuPower ], [ 7.8, data.type0100.hvdcPower ],[ 10.8, data.type0100.jejuLoad ] ];

	//그래프설정
	if (data != null) {
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
	if (data.type0100 == null) {
		$.plot($("#jejugraph0100"), [ {	data : [], lines : { show : true}} ], option0100);
		$("#supplyReserveRate").html(0);
		$("#supplyResevePower").html(0);
		} 
	else {
		$("#supplyReserveRate").html(data.type0100.supplyReserveRate);
		$("#supplyResevePower").html(data.type0100.supplyResevePower);		
		graph0100 = $.plot($("#jejugraph0100"), demandsupplydata, option0100);
	}
	
	//수치표현
	if (graph0100 != null) {
		showValue(graph0100, data, flag);
	}

};
//==============================================================================

//==============================================================================
function type0300(data){
	//부하감축량 ON,OFF
	if(data.type0300.forecastOnDay == "OFF"){
		$("#forecastOnDay").attr('src', 'sample/image/common/switchOff.png');
	}
	else{
		$("#forecastOnDay").attr('src', 'sample/image/common/switchOn.png');
	}
	if(data.type0300.directLoadControl == "OFF"){
		$("#directLoadControl").attr('src', 'sample/image/common/switchOff.png');
	}
	else{
		$("#directLoadControl").attr('src', 'sample/image/common/switchOn.png');
	}
	if(data.type0300.emergencyPowerOff == "OFF"){
		$("#emergencyPowerOff").attr('src', 'sample/image/common/switchOff.png');
	}
	else{
		$("#emergencyPowerOff").attr('src', 'sample/image/common/switchOn.png');
	}

	
	$("#demandMarketReductionPower").html(data.type0300.demandMarketReductionPower);
	
	}
//==============================================================================

//==============================================================================
function type0200(data){
	// [그래프 타입 (5) 주파수 그래프] 60분 전 주파수 정보 조회
	var xaxisMin = data.type0200StartTime,
		xaxisMax = data.type0200EndTime,
		yaxisMin = data.type0200MinFrequency,
		yaxisMax = data.type0200MaxFrequency,
		markings = [];
	//최대 최소 주파수  구하기
	if (yaxisMax > 60.2 || yaxisMin < 59.8) {
		if (Math.abs((60.00 - data.type0200MaxFrequency)) - Math.abs((60.00 - data.type0200MinFrequency)) > 0){
			yaxisMin = 60.00 - Math.abs((60.00 - data.type0200MaxFrequency)) - 0.05;
			yaxisMax = 60.00 + Math.abs((60.00 - data.type0200MaxFrequency)) + 0.05;
		}
		else{
			yaxisMax = 60.00 + Math.abs((60.00 - data.type0200MinFrequency)) + 0.05;
			yaxisMin = 60.00 - Math.abs((60.00 - data.type0200MinFrequency)) - 0.05;
		}
	}

	//배경설정
	var xTick = (xaxisMax - xaxisMin) / 4,
		xLabelTick = (xaxisMax - xaxisMin) / 2,
		yLabelTick = (yaxisMax - yaxisMin) / 2,
		xticks = [[ xaxisMin, "10분 전" ], [ xaxisMin + xLabelTick, "5분 전" ], [ xaxisMax, "현재" ] ],
		yticks = [[ yaxisMin, yaxisMin.toFixed(2) ],[ yaxisMin + yLabelTick, ((yaxisMin + yaxisMax) / 2).toFixed(2) ], [ yaxisMax, yaxisMax.toFixed(2) ] ];
	
	for ( var i = xaxisMin + xTick; i < xaxisMax; i = i + xTick) { 
		markings.push({ color : 'rgba(165,165,165,0.85)', lineWidth : 0.8, xaxis : { from : i, to : i } });
	}

	//현재 주파수 계산
	var lastData = 0;
	if (xaxisMax - 10000 <= data.type0200[data.type0200.length - 1][0]) {
		lastData = data.type0200[data.type0200.length - 1][1];
	} else {
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
	
	if (data.type0200 == null) {
		$.plot($("#jejugraph0200"), [ {	data : [], lines : { show : true, lineWidth : 0.5 }} ],	option0500);
	}
	else {
		$.plot($("#jejugraph0200"), [ { data : data.type0200, lines : {	show : true, lineWidth : 1 }, color : "#14589f"} ], option0500);
	}
	$("#eis_frequency").html(lastData);
};
//==============================================================================

//==============================================================================
function type0300(data){
	var note=data.type0300;
	//범례텍스트
	/*hanrim1
	southJejuFire1
	jejuFire1
	hvdc1*/
	$( "#hanrim1" ).html(numberFormat(note[0].power));
	$( "#hanrim2" ).html(numberFormat(note[1].power));
	$( "#hanrim3" ).html(numberFormat(note[2].power));
	$( "#southJejuFire1" ).html(numberFormat(note[3].power));
	$( "#southJejuFire2" ).html(numberFormat(note[4].power));
	$( "#southJejuFire3" ).html(numberFormat(note[5].power));
	$( "#southJejuFire4" ).html(numberFormat(note[6].power));
	$( "#southJejuFire5" ).html(numberFormat(note[7].power));
	$( "#southJejuFire6" ).html(numberFormat(note[8].power));
	$( "#jejuFire1" ).html(numberFormat(note[9].power));
	$( "#jejuFire2" ).html(numberFormat(note[10].power));
	$( "#jejuFire3" ).html(numberFormat(note[11].power));
	$( "#jejuFire4" ).html(numberFormat(note[12].power));
	$( "#jejuFire5" ).html(numberFormat(note[13].power));
	$( "#jejuFire6" ).html(numberFormat(note[14].power));
	$( "#jejuFire7" ).html(numberFormat(note[15].power));
	$( "#hvdc1" ).html(numberFormat(note[16].power));
	$( "#hvdc2" ).html(numberFormat(note[17].power));
};
//==============================================================================

//==============================================================================
function showValue(graphId, data, flag) {
	
	//공급능력
	//[ 1.3, data.type0100.jejuCapacity ], [ 4.3, data.type0100.totalJejuPower ], [ 7.8, data.type0100.hvdcPower ],[ 10.8, data.type0100.jejuLoad ]
	var weight = 0;
	if($(window).width()>1910)
		weight = 0.85;
	else
		weight = 0;		
	var o = graphId.pointOffset({
		x : 0.6 + weight,
		y : 240
	});
	$("#jejugraph0100").append(
			'<div class="eis_graphData" style="left:' + o.left + 'px;top:' + o.top+ 'px;text-align:center;position:absolute;width:100px">'
					+ numberFormat(data.type0100.jejuCapacity ) + '</div>');
	//제주발전
	o = graphId.pointOffset({
		x : 3.6 + weight,
		y : 240
	});
	$("#jejugraph0100").append(
			'<div class="eis_graphData" style="left:' + o.left + 'px;top:' + o.top + 'px;text-align:center;position:absolute;width:100px">'
					+ numberFormat(data.type0100.totalJejuPower) + '</div>');
	//연계조류
	o = graphId.pointOffset({
		x : 7.1 + weight,
		y : 240
	});
	$("#jejugraph0100").append(
			'<div class="eis_graphData" style="left:' + o.left + 'px;top:' + o.top + 'px;text-align:center;position:absolute;width:100px">'
					+ numberFormat(data.type0100.hvdcPower) + '</div>');
	
	//제주수요
	o = graphId.pointOffset({
		x : 10.1 + weight,
		y : 240
	});
	$("#jejugraph0100").append(
			'<div class="eis_graphData" style="left:' + o.left + 'px;top:' + o.top + 'px;text-align:center;position:absolute;width:100px">'
					+ numberFormat(data.type0100.jejuLoad) + '</div>');
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
       url: 'realTimeAxisJejuType0100.action',
       type: 'POST',
       dataType: 'json',
       timeout: 5000,
       success: refreshType0100,
       error: refreshType0100
       }); 
	//주파수
   $.ajax({
       url: 'realTimeAxisJejuType0200.action',
       type: 'POST',
       dataType: 'json',
       timeout: 5000,
       success: refreshType0200,
       error: refreshType0200
   }); 
	//범례
   $.ajax({
       url: 'realTimeAxisJejuType0300.action',
       type: 'POST',
       dataType: 'json',
       timeout: 5000,
       success: refreshType0300,
       error: refreshType0300
   });
}
