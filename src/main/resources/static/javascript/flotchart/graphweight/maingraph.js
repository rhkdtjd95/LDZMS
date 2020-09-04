var KPX = KPX || {};
KPX.App = KPX.App || {};
KPX.App.Page = KPX.App.Page || {};
KPX.App.Module = KPX.App.Module || {};
KPX.App.fn = {
	//그래프정보표시 팝업
	showTooltip : function(x, y, date, contents) {
		var datetime=new Date(date);
		$('<div id="tooltip">' + 
				'<span class="eis_tooltipNote eis_radiusFilter">'+
				'<ul>'+
				'<li>기준시각<span>' + timeformat(datetime.getFullYear()) + '/ '+ timeformat(datetime.getMonth() + 1) + '/ '+ timeformat(datetime.getDate()) + '</span><br/>'+
				'<span>' + timeformat(datetime.getHours()) + ':' + timeformat(datetime.getMinutes()) + ':' + timeformat(datetime.getSeconds()) + '</span><br/></li>'+
				'<li>현재수요<span>' + numberFormat(contents[8].toFixed(0)) + '<span class="eis_tooltipUnit">만kW</span></span></li>' +
				'<li>양수<span class="eis_toltipData">' + numberFormat(contents[7].toFixed(0)) + '<span class="eis_tooltipUnit">만kW</span></span></li>' +
				'<li>수력<span class="eis_toltipData">' + numberFormat(contents[6].toFixed(0)) + '<span class="eis_tooltipUnit">만kW</span></span></li>' +
				'<li>가스<span class="eis_toltipData">' + numberFormat(contents[5].toFixed(0)) + '<span class="eis_tooltipUnit">만kW</span></span></li>' +
				'<li>유류<span class="eis_toltipData">' + numberFormat(contents[4].toFixed(0)) + '<span class="eis_tooltipUnit">만kW</span></span></li>' +
				'<li>신재생<span class="eis_toltipData">' + numberFormat(contents[3].toFixed(0)) + '<span class="eis_tooltipUnit">만kW</span></span></li>' +
				'<li>국내탄<span class="eis_toltipData">' + numberFormat(contents[2].toFixed(0)) + '<span class="eis_tooltipUnit">만kW</span></span></li>' +
				'<li>유연탄<span class="eis_toltipData">' + numberFormat(contents[1].toFixed(0)) + '<span class="eis_tooltipUnit">만kW</span></span></li>' +
				'<li>원자력<span class="eis_toltipData">' + numberFormat(contents[0].toFixed(0)) + '<span class="eis_tooltipUnit">만kW</span></span></li>' +
				'</ul>' +
				'</span>' + 
				'<\/div>').css({
			position : 'absolute',
			display : 'none',
			top : y - 300,
			left : x + 20
		}).appendTo("body").fadeIn(0);
	},
	//최대부하표시용 
	maxLoadTooltip : function(plotObj, type0800) {
		var o = plotObj.pointOffset({x: type0800[0][0], y: type0800[0][1]});
		var maxLoad = numberFormat(type0800[0][1].toFixed(0));
		var date = new Date(type0800[0][0]);
		$("#graph0600").append(
				'<span class="eis_tooltipTodayHigh eis_radiusFilter"' + 
				'style="left:' + (o.left-45) + 'px;top:' + (o.top-60) + 
				'px;position:absolute;">'+ timeformat(date.getHours()) + ':' + timeformat(date.getMinutes()) + ':' + timeformat(date.getSeconds()) + '<br/>' + maxLoad + 
				'만kW</span>');
		
	},
	clearTooltip : function() {
		$("#tooltip").remove();
	},
	timeformat : function (datetime) {
		var time = Number(datetime);
		if (time < 10) {
			time = "0" + time;
			}
		return time;
	},
	numberFormat : function(val) {
		if (val == 0)
			return 0;
		var reg = /(^[+-]?\d+)(\d{3})/;
		var n = (val + '');
		while (reg.test(n))
			n = n.replace(reg, '$1' + ',' + '$2');
		return n;
	}	
};
KPX.App.Module.RealGraph = function(graphId, data) {
	this.graphs = new Array();
	this.graphId = graphId;
	this.graphData = [];
	this.plotObj = null;
	this.eventFlag=false;
	var markings = [];
	/*if($("#maxPowerDemandForecast").val()=="")
		$("#maxPowerDemandForecast").val(7000);
	var maxPowerDemandForecast=Number($("#maxPowerDemandForecast").val());
	*/
	//배경설정
	var xTick = 3600000, yTick = 500, yaxisMin = 0, yaxisMax = 8000;
	this.borderWidth = 0.8;
	for ( var i = data.type0600Min + xTick; i < data.type0600Max; i = i	+ (2 * xTick)) {
		markings.push({
			color : 'rgba(210,210,210,0.4)',
			xaxis : {
				from : i,
				to : i + xTick
				}
		});
		}
	for ( var i = yaxisMin; i < yaxisMax; i = i + yTick) {
		if (i % 1000 == 0) {
			markings.push({
				color : 'rgba(155,155,155,0.85)',
				lineWidth : this.borderWidth,
				yaxis : {
					from : i,
					to : i
				}
			});
		} else {
			markings.push({
				color : 'rgba(155,155,155,0.85)',
				lineWidth : this.borderWidth / 4,
				yaxis : {
					from : i,
					to : i
				}
			});
		}
	}
	//그래프옵션 설정
	this.options = {
		grid : {
			show : "graph0600",
			borderWidth : 0.8,
			borderColor : "rgba(155,155,155,0.85)",
			tickColor : "rgba(255,255,255,0)",
			hoverable : true,
			autoHighlight : false,
			mouseActiveRadius : 20,
			markings : markings

		},

		yaxis : {
			ticks : 10,
			tickFormatter : function(val, axis) {
				if (val == 0)
					return 0;
				var reg = /(^[+-]?\d+)(\d{3})/;
				var n = (val.toFixed(0) + '');
				while (reg.test(n))
					n = n.replace(reg, '$1' + ',' + '$2');
				return n;
			},
			labelWidth: 50,
			min : yaxisMin,
			max : yaxisMax
		},
		xaxis : {
			tickColor : "rgba(255,255,255,0)",
			min : data.type0600Min,
			max : data.type0600Max,
			ticks : 24,
			mode : "time",
			minTickSize : [ 1, "hour" ],
			tickFormatter : function(val, axis) {
				if(axis.max == val)
					return "24";
				var d = new Date(val);
				return d.getHours();
			}

		},
		selection : {
			mode : "xy",
			color : "#999"
		}
	};
};
KPX.App.Module.RealGraph.prototype = {
	addGraphElement : function(el, fillflag, stackflag, lineColor, gradient,
			fillBetween) {
		var lineWidth = 0; // 합계 , 과거부하실적 그래프 
		if (el.fuel == 'totalPowerFuel') {
			lineWidth = 2;
		}
		//비교곡선용
		else if(el.fuel == 'compareGraph1' || el.fuel == 'compareGraph2'){
			lineWidth = 0.3;
		}
		else {
			lineWidth = 0;
		}
		var data = [];
		if (el != "") {
			var len = el.data.length;
			//양수발전 음수 부분을 그리지 않는 처리
			for ( var i = 0; i < len; i++) {
				data.push([ el.data[i][0], el.data[i][1] ]);
				if (el.data[i][1] < 0)
					data[i][1] = 0;
			}
		}
		//그래프데이터 설정
		var graphElement = {
			id : el.fuel,
			data : data,
			stack : stackflag,
			lines : {
				lineWidth : lineWidth,
				fill : fillflag,
				fillColor : {
					colors : gradient
				}
			},
			color : lineColor,
			fillBetween : fillBetween
		};
		this.graphs.push(graphElement);
		graphElement = null;
		lineWidth = null;
		data = null;

	},
	addGraphList : function(graphGroup, fillflag, stackflag, lineColor,
			gradient) {
		var fillBetween = "";
		//데이터가없을경우 처리
		if (graphGroup.type0600 == null) {
			this.addGraphElement([], fillflag[index], stackflag[index],
					lineColor[index], gradient[index], fillBetween);
		}

		else {
			var len = graphGroup.type0600.length;
			for ( var index = 0; index < len; index += 1) {
				if (index == 0) {
					fillBetween = "";
				} else {
					fillBetween = graphGroup.type0600[index - 1].fuel;
				}
				this.addGraphElement(graphGroup.type0600[index],
						fillflag[index], stackflag[index], lineColor[index],
						gradient[index], fillBetween);
			}
			var compareWeight=[];
			compareWeight.push($("#hiddenCompareWeight1").val());
			compareWeight.push($("#hiddenCompareWeight2").val());
			//과거 부하 실적 비교 그래프
			if(graphGroup.type01000!=null){
				var pastLineColor=["#02cc34", "#9d0ecc"],
				    pastGradient=[["#02cc34", "#02cc34"],["#9d0ecc", "#9d0ecc"]];
				len = graphGroup.type01000.length;
				for ( var index = 0; index < len; index += 1) {
					for(var j = 0; j< graphGroup.type01000[index].data.length; j++){
						graphGroup.type01000[index].data[j][1]+=Number(compareWeight[index]);						
						}
					this.addGraphElement(graphGroup.type01000[index],
							false, null, pastLineColor[index],
							pastGradient[index], "");
					}
				}
		}
		fillBetween = null;

	},
	removeGraphElementAll : function() {
		this.graphs.length = 0;
	},
	removeElementData : function(index) {
		this.graphs[index].data.length = 0;
	},
	clearElementDataAll : function() {
		var index = 0;
		var len = this.graphs.length;
		for (index = 0; index < len; index += 1) {
			this.graphs[index].data.length = 0;
		}
	},
	addGraphElData : function(graphGroup, index) {
		this.graphs[index].data.push(graphGroup.graphElements[index].point);
	},
	addGraphElDataAll : function(graphGroup) {
		var index = 0;
		var len = graphGroup.graphElements.length;
		// alert(graphGroup.graphElements.length);
		for (index = 0; index < len; index += 1) {
			this.graphs[index].data.length = 0;
			this.graphs[index].data = graphGroup.graphElements[index].point;
		}
	},
	// 이벤트추가(확대,hover)
	addEvent : function(graphGroup) {
		var plot = this.plotObj;
		var curObj = this;
		var showtooltip=true;
		$(this.graphId).unbind();//등록된이벤트 제거
		// 확대이벤트추가
		$(this.graphId).bind("mousedown",function(){
			showtooltip = false;
			KPX.App.fn.clearTooltip();
			});
		$(this.graphId).bind("mouseup",function(){
			showtooltip=true;
			});
		$(this.graphId).bind("plotselected", function(event, ranges) {
					// clamp the zooming to prevent eternal zoom
					if (ranges.xaxis.to - ranges.xaxis.from < 0.00001)
						ranges.xaxis.to = ranges.xaxis.from + 0.00001;
					if (ranges.yaxis.to - ranges.yaxis.from < 0.00001)
						ranges.yaxis.to = ranges.yaxis.from + 0.00001;

					// do the zooming
					curObj.options = $.extend(true, {}, curObj.options, {

						xaxis : {
							tickColor : "rgba(155,155,155,0.6)",
							min : ranges.xaxis.from,
							max : ranges.xaxis.to,
							ticks: null,
							minTickSize : [1, "minute"],
							tickFormatter : function(val, axis) {							
								var d = new Date(val);
								if(axis.max == val)
									return "24"+':'+KPX.App.fn.timeformat(d.getMinutes());
								return d.getHours()+':'+KPX.App.fn.timeformat(d.getMinutes());
							}
						},
						yaxis : {
							tickColor : "rgba(155,155,155,0.6)",
							ticks: 5,
							min : ranges.yaxis.from,
							max : ranges.yaxis.to
						}
					});
					
					curObj.plotObj = $.plot($(curObj.graphId), curObj.graphs, curObj.options);
					curObj.eventFlag = true;
					curObj.addResetButton(graphGroup);
					});
		// hover이벤트추가
		$(this.graphId).bind("plothover",function(event, pos, item) {
			if(showtooltip && graphGroup.type0600!=null){
				var axes = plot.getAxes();
				var len = graphGroup.type0600[0].data.length,
					len2 = graphGroup.type0600.length,
					strTemp=[];
				var previousPoint=null;
				if (previousPoint != pos.x) {
					previousPoint = pos.x;
					$("#tooltip").remove();   	
					if (pos.x < axes.xaxis.min || pos.x > axes.xaxis.max ||
							pos.y < axes.yaxis.min || pos.y > axes.yaxis.max)
						return;     
					var i, j;
					for (i = 0; i < len; ++i) {
						if(graphGroup.type0600[0].data[i][0] > pos.x)
							break;
						}
					if(i<len && pos.y < graphGroup.type0600[len2-1].data[i][1]){
						for(j=0; j<len2; j++){
							strTemp[j]=graphGroup.type0600[j].data[i][1];
							}
						}
					if(strTemp!=""){					
						KPX.App.fn.showTooltip(pos.pageX, pos.pageY,graphGroup.type0600[j-1].data[i][0], strTemp);
						date=null;
						}
					}
				}
			});

	},
	// 리셋버튼추가
	addResetButton : function(graphGroup) {
		var curObj = this;
		/*if($("#maxPowerDemandForecast").val()=="")
			$("#maxPowerDemandForecast").val(7000);
		var maxPowerDemandForecast=Number($("#maxPowerDemandForecast").val());
		var yaxisMin = 0, yaxisMax = (maxPowerDemandForecast/1000).toFixed(0)*1000+2000;*/
		$('<div id="reset"></div>').css({
			position : 'absolute',
			top : 20,
			right : 20,
			height : 16,
			width : 16,
			'background-color' : 'rgba(0,0,0,0)'
		}).appendTo($(curObj.graphId)).click(
				function(e) {
					curObj.options = $.extend(true, {}, curObj.options, {
						xaxis : {
							tickColor : "rgba(255,255,255,0)",
							min : graphGroup.type0600Min,
							max : graphGroup.type0600Max,
							minTickSize : [ 1, "hour" ],
							ticks: 24,
							tickFormatter : function(val, axis) {
								if(axis.max == val)
									return "24";
								var d = new Date(val);
								return d.getHours();
							}
						},
						yaxis : {
							tickColor : "rgba(255,255,255,0)",
							ticks: 10,
							min : 0,
							max : 8000
						}
					});
					curObj.plotObj = $.plot($(curObj.graphId), curObj.graphs, curObj.options);
					KPX.App.fn.maxLoadTooltip(curObj.plotObj, graphGroup.type0800);
					curObj.addEvent(graphGroup);
					curObj.eventFlag = false;
				});
	},
	// 초기그래프출력
	initialDraw : function(graphGroup, fillflag, stackflag, lineColor, gradient) {
		if (this.plotObj == null) {
			this.removeGraphElementAll();
			this.addGraphList(graphGroup, fillflag, stackflag, lineColor, gradient);
			this.plotObj = $.plot($(this.graphId), this.graphs, this.options);
			this.addEvent(graphGroup);
			KPX.App.fn.maxLoadTooltip(this.plotObj, graphGroup.type0800);
		}
	},
	reDraw : function(graphGroup, fillflag, stackflag, lineColor, gradient) {
		if (this.plotObj != null || this.graphs != null) {
			this.removeGraphElementAll();
			this.addGraphList(graphGroup, fillflag, stackflag, lineColor, gradient);
			this.plotObj = $.plot($(this.graphId), this.graphs, this.options);
			this.addEvent(graphGroup);
			if (this.eventFlag){
				this.addResetButton(graphGroup);
			}
			else{
				KPX.App.fn.maxLoadTooltip(this.plotObj, graphGroup.type0800);
			}
						
		}
	}
};


// -------------------------------------------------------------------------
function initType0600(){
	$.ajax({
        url: 'realTime5000.action',
        type: 'POST',
        data: $("#MyForm").serialize(),
        dataType: 'json',
        success: function(data){
        	refresh60000(data);
        	realTimePastLoadResultCompare(data);
        	$("#baseDate").val(data.type0600BaseDate);
        	$("#type0600CompareGraphBaseDate").val(data.type0600CompareGraphBaseDate);
        }
    }); 

};
// -------------------------------------------------------------------------

function realTimePastLoadResultCompare(data){
    var type0600CompareDate1= new Date(data.type0600CompareDate1);
    var opt1={
    		dateFormat: "yy.mm.dd (D)", 
    		defaultDate: type0600CompareDate1, 
    		altField: "#type0600SelectDate1", 
    		altFormat: "yymmdd",
    		onChangeMonthYear: function(year, month, inst){
    			$("#type0600DateWeather1").val(year+""+timeformat(month)+"00");
    			type0600DateWeather1();
    			$("#type0600DateWeather1").val($("#type0600SelectDate1").val());
    		},
    		beforeShow: function(){
    			$("#type0600DateWeather1").val($("#type0600SelectDate1" ).val());
    	    	$("#type0600DateWeather2").val($("#type0600SelectDate2" ).val());
    	    	type0600DateWeather1();
    		}
    };
    $( "#datepicker1" ).val(dateformat(data.type0600CompareDate1));
    $( "#datepicker1" ).datepicker(opt1, $.datepicker.regional[ "ko" ]);

    var type0600CompareDate2= new Date(data.type0600CompareDate2);
    var opt2={
    		dateFormat: "yy.mm.dd (D)",
    		defaultDate: type0600CompareDate2,
    		altField: "#type0600SelectDate2", 
    		altFormat: "yymmdd",
    		onChangeMonthYear: function(year, month, inst){
    			$("#type0600DateWeather2").val(year+""+timeformat(month)+"00");
    			type0600DateWeather2();
    			$("#type0600DateWeather2").val($("#type0600SelectDate2").val());
    		},
    		beforeShow: function(){
    			$("#type0600DateWeather1").val($("#type0600SelectDate1" ).val());
    	    	$("#type0600DateWeather2").val($("#type0600SelectDate2" ).val());
    	    	type0600DateWeather2(); 
    		}
   		};
     
    $( "#datepicker2" ).val(dateformat(data.type0600CompareDate2));
    $( "#datepicker2" ).datepicker(opt2, $.datepicker.regional[ "ko" ]);

    $( "#type0600SelectDate1" ).val(type0600CompareDate1.getFullYear()+timeformat(type0600CompareDate1.getMonth()+1)+timeformat(type0600CompareDate1.getDate()));
    $( "#type0600SelectDate2" ).val(type0600CompareDate2.getFullYear()+timeformat(type0600CompareDate2.getMonth()+1)+timeformat(type0600CompareDate2.getDate()));
    
};
//-------------------------------------------------------------------------    
function type0600DateWeather1(){
	$.ajax({
        url: 'realTimeType01100.action',
        type: 'POST',
        data: $("#hiddenForm").serialize(),
        dataType: 'json',
        success: function(data){
        	$(".ui-state-default").each(function(){
        		for(var i=0; i<data.type01100[0].length; i++){
        			if($(this).text()== (Number(data.type01100[0][i].baseDate.substring(6,8))+"")){
        				$(this).attr('dataValue',$(this).text());
        				if(data.type01100[0][i].holidayFalg == 'Y'){
        					$(this).parent().attr('class','ui-datepicker-week-sun');
        				}
        				if(data.type01100[0][i].maxTemperature != null)
        					$(this).append("<div><p id=" + "datepickerWeather"+ ">"+"("+data.type01100[0][i].maxTemperature+","+data.type01100[0][i].minTemperature+")</p></div>");
        				break;
        				}
        			else{
        				$(this).attr('dataValue',$(this).text());
        			}
        		}
        		});	
        }
    }); 
	
}
//-------------------------------------------------------------------------    
function type0600DateWeather2(){
	$.ajax({
        url: 'realTimeType01100.action',
        type: 'POST',
        data: $("#hiddenForm").serialize(),
        dataType: 'json',
        success: function(data){
        	$(".ui-state-default").each(function(){
        		for(var i=0; i<data.type01100[1].length; i++){
        			if($(this).text()== (Number(data.type01100[1][i].baseDate.substring(6,8))+"")){
        				$(this).attr('dataValue',$(this).text());
        				if(data.type01100[1][i].holidayFalg == 'Y'){
        					$(this).parent().attr('class','ui-datepicker-week-sun');
        				}
        				if(data.type01100[1][i].maxTemperature != null)
        					$(this).append("<div><p id=" + "datepickerWeather"+ ">"+"("+data.type01100[1][i].maxTemperature+","+data.type01100[1][i].minTemperature+")</p></div>");
        				break;
        				}
        			else{
        				$(this).attr('dataValue',$(this).text());
        			}
        		}
        		});	
        }
    });
	
}
//-------------------------------------------------------------------------
function refresh60000(data){
	

    // [그래프 타입 (6) 발전원별 수요 그래프] 실시간 일일 변동 사항 조회
    //원자력, 유연탄, 국내탄, 신재생, 유류, 가스, 수력, 양수, 합계 순서
    var fillflag = [true, true, true, true, true, true, true, true, false], 
        stackflag = [true, true, true, true, true, true, true, true, null],
        lineColor = ["rgb(255,139,0)","rgb(158,110,71)","rgb(57,57,57)", "rgb(120,194,82)","rgb(196,0,20)", "rgb(255,246,0)","rgb(172,231,252)" ,"rgb(0,155,209)" ,"rgb(240,0,0)"],
        gradient = [["rgba(255,139,0,0.85)","rgba(255,139,0,0.85)"],        //원자력
                    ["rgba(163,115,81,0.85)","rgba(163,115,81,0.85)"],      //유연탄
                    ["rgba(57,57,57,0.85)","rgba(57,57,57,0.85)"],          //국내탄
                    ["rgba(120,194,82,0.85)","rgba(120,194,82,0.85)"],      //신재생
                    ["rgba(196,0,20,0.85)" ,"rgba(196,0,20,0.85)" ],        //유류
                    ["rgba(255,246,0,0.85)","rgba(255,246,0,0.85)"],        //가스
                    ["rgba(172,231,252,0.85)" ,"rgba(172,231,252,0.85)"],   //수력
                    ["rgba(0,155,209,0.85)" ,"rgba(0,155,209,0.85)" ],      //양수
                    ["rgba(255,246,0,0.85)","rgba(255,246,0,0.85)"]],       //합계
        graphObject = new KPX.App.Module.RealGraph("#graph0600", data);
        graphObject.initialDraw(data, fillflag, stackflag, lineColor, gradient);
        var refreshId0600 = setInterval(function() {
        	$.ajax({
        		url: 'realTime5000.action',
                type: 'POST',
                dataType: 'json',
                data: $("#MyForm").serialize(),
                timeout: 5000,
                success: function(data){
                	graphObject.reDraw(data, fillflag, stackflag, lineColor, gradient);
                	if($("#type0600CompareGraphBaseDate").val()!=data.type0600CompareGraphBaseDate)
                		window.location.reload(true);
                	if($("#baseDate").val()!=data.type0600BaseDate)
                		window.location.reload(true);
                }
        	
        	});
        	}, 30000);
        
        $("#btnCompare1").bind("click",function(){ 
        	$("#type0600CompareDate1").val($("#type0600SelectDate1" ).val());
        	$("#hiddenCompareWeight1").val($("#compareWeight1").val());

        	$.ajax({
        		url: 'realTime5000.action',
        		type: 'POST',
        		data: $("#MyForm").serialize(),
        		dataType: 'json',
        		timeout: 5000,
        		success: function(data){
        			   graphObject.reDraw(data, fillflag, stackflag, lineColor, gradient);
        			   }
        	   });
        	});    
        
        $("#btnCompare2").bind("click",function(){ 
        	$("#type0600CompareDate2").val($("#type0600SelectDate2" ).val());
        	$("#hiddenCompareWeight2").val($("#compareWeight2").val());
            $.ajax({
                url: 'realTime5000.action',
                type: 'POST',
                data: $("#MyForm").serialize(),
                dataType: 'json',
                timeout: 5000,
                success: function(data){                    		
                       graphObject.reDraw(data, fillflag, stackflag, lineColor, gradient);
                       }
               });
            });
        
        function resizeStuff() { 
        	$.ajax({
                url: 'realTime5000.action',
                type: 'POST',
                data: $("#MyForm").serialize(),
                dataType: 'json',
                timeout: 5000,
                success: function(data){
                    graphObject.reDraw(data, fillflag, stackflag, lineColor, gradient);
                    }
        	});
        	} 
       	var TO = false; 
       	$(window).resize(function(){ 
       	 if(TO !== false) 
       	    clearTimeout(TO); 
       	 TO = setTimeout(resizeStuff, 200); //200 is time in miliseconds 
       	}); 


};
//==============================================================================
function dateformat(data){
    var date = new Date(data);
    var day = ['일','월','화','수','목','금','토'][date.getDay()];
    return date.getFullYear() + '.'+ timeformat(date.getMonth() + 1) + '.'+ timeformat(date.getDate()) + ' (' + day + ')';
    function timeformat(datetime) {
        var time = datetime;
        if (time < 10) {
            time = "0" + time;
        }

        return time;
    };
};
//=============================================================================
