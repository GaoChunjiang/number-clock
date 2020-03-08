$(document).ready(function(){
	//
	var workRestAry = [];
    workRestAry.push({text: '起床洗漱', start:'8:00', end:''});
    workRestAry.push({text: '早餐时间', start:'8:30', end:'9:00'});
    workRestAry.push({text: '练琴', start:'9:30', end:'10:30'});
    workRestAry.push({text: '背诗', start:'10:30', end:'11:00'});
    workRestAry.push({text: '自由玩耍', start:'11:00', end:'12:00'});
    workRestAry.push({text: '午餐 + 电视', start:'12:00', end:'13:00'});
    workRestAry.push({text: '午休时间', start:'13:30', end:'15:00'});
    workRestAry.push({text: '幼儿园作业', start:'15:00', end:'16:00'});
    workRestAry.push({text: '描红', start:'16:00', end:'17:00'});
    workRestAry.push({text: '晚餐 + 电视', start:'17:30', end:'19:00'});
    workRestAry.push({text: '学英语', start:'19:30', end:'20:30'});
    workRestAry.push({text: '亲子运动', start:'20:30', end:'21:00'});
    workRestAry.push({text: '洗漱 + 故事', start:'21:00', end:''});
    workRestAry.push({text: '前关灯睡觉', start:'22:00', end:''});
    //
	var workAndRest = $("#work-and-rest");
	function getCurClass(curDate, workRestIdx){
	    var rst = '';
	    var workRest = workRestAry[workRestIdx];
        //
        var start = workRest.start;
        var end = workRest.end;
        var startDate = new Date();
        var startAry = start.split(':');
        startDate.setHours(startAry[0]);
        startDate.setMinutes(startAry[1]);
        startDate.setSeconds('0');
        var endDate = null;
        if(end && end != ''){
        } else {
	        var nextWorkRest = null;
	        var nextIdx = workRestIdx + 1;
	        if(nextIdx < workRestAry.length){
                nextWorkRest = workRestAry[nextIdx];
                if(nextWorkRest){
                    end = nextWorkRest.start;
                }
	        }
        }
        if(end && end != ''){
            endDate = new Date();
            var endAry = end.split(':');
            endDate.setHours(endAry[0]);
            endDate.setMinutes(endAry[1]);
            endDate.setSeconds('0');
        }
        // finish  active
        if(endDate == null && curDate > startDate){
            rst = 'active';
        } else if(curDate > startDate && curDate > endDate){
            rst = 'finish';
        } else if(endDate > curDate && curDate > startDate){
            rst = 'active';
        }
	    return rst;
	}
	function setWorkAndRest(){
	    workAndRest.html('');//情况
	    var curDate = new Date();
	    for(var i=0; i<workRestAry.length; i++){
            var workRest = workRestAry[i];
            if(workRest.text && workRest.start && workRest.text != '' && workRest.start != ''){
                var curClass = getCurClass(curDate, i);
                var tmpHtml = '<div';
                if(curClass && curClass != ''){
                    tmpHtml += ' class="'+ curClass +'"';
                }
                tmpHtml += '>'+workRest.start;
                if(workRest.end && workRest.end != ''){
                    tmpHtml += ' - '+ workRest.end;
                }
                tmpHtml += ' '+ workRest.text +'</div>';
                workAndRest.append($(tmpHtml));
            }
        }
		//
		window.setTimeout(function(){
			setWorkAndRest();
		}, 60000);
	}
	setWorkAndRest();
	//
	var colockContainer = $("#colock-container");
	var monthDay = [31,28,31,30,31,30,31,31,30,31,30,31];
	var colorIdx = 0;
	var colorAry = ['#FF0000','#FF8C00','#FFD700','#32CD32','#1E90FF','#8A2BE2'];
	// init
	var curDeg = 0;
	var oneDeg = 360.0 / 12;
	for(var i=0; i<12; i++){
		var activeClass = '';
		if(i == 0){ activeClass = 'colock-active'; }
		var nbsp = '';
		if(i < 9) {
			nbsp = '0'; //nbsp = '&nbsp;&nbsp;';
		}
		var itemHtml = '<div class="colock-month-item '+activeClass+'" style="transform:rotate('+curDeg+'deg);">'+ nbsp + (i+1) +'月</div>';
		colockContainer.append($(itemHtml));
		if(i == 0){
			curDeg = 360 - oneDeg;
		} else {
			curDeg -= oneDeg;
		}
	}
	//
	var dayNum = 31;
	var curDeg = 0;
	var oneDeg = 360.0 / dayNum;
	for(var i=0; i<dayNum; i++){
		var activeClass = '';
		if(i == 0){ activeClass = 'colock-active'; }
		var nbsp = '';
		if(i < 9) {
			nbsp = '0'; //nbsp = '&nbsp;&nbsp;';
		}
		var itemHtml = '<div class="colock-day-item '+activeClass+'" style="transform:rotate('+curDeg+'deg);">'+ nbsp + (i+1) +'日</div>';
		colockContainer.append($(itemHtml));
		if(i == 0){
			curDeg = 360 - oneDeg;
		} else {
			curDeg -= oneDeg;
		}
	}
	//
	var curDeg = 0;
	var oneDeg = 360.0 / 24;
	for(var i=0; i<24; i++){
		var activeClass = '';
		if(i == 0){ activeClass = 'colock-active'; }
		var nbsp = '';
		if(i < 10) {
			nbsp = '0'; //nbsp = '&nbsp;&nbsp;';
		}
		var itemHtml = '<div class="colock-hour-item '+activeClass+'" style="transform:rotate('+curDeg+'deg);">'+ nbsp + i +'时</div>';
		colockContainer.append($(itemHtml));
		if(i == 0){
			curDeg = 360 - oneDeg;
		} else {
			curDeg -= oneDeg;
		}
	}
	//
	var curDeg = 0;
	var oneDeg = 360.0 / 60;
	for(var i=0; i<60; i++){
		var activeClass = '';
		if(i == 0){ activeClass = 'colock-active'; }
		var nbsp = '';
		if(i < 10) {
			nbsp = '0'; //nbsp = '&nbsp;&nbsp;';
		}
		var itemHtml = '<div class="colock-minute-item '+activeClass+'" style="transform:rotate('+curDeg+'deg);">'+ nbsp + i +'分</div>';
		colockContainer.append($(itemHtml));
		if(i == 0){
			curDeg = 360 - oneDeg;
		} else {
			curDeg -= oneDeg;
		}
	}
	//
	var curDeg = 0;
	var oneDeg = 360.0 / 60;
	for(var i=0; i<60; i++){
		var activeClass = '';
		if(i == 0){ activeClass = 'colock-active'; }
		var nbsp = '';
		if(i < 10) {
			nbsp = '0'; //nbsp = '&nbsp;&nbsp;';
		}
		var itemHtml = '<div class="colock-second-item '+activeClass+'" style="transform:rotate('+curDeg+'deg);">'+ nbsp + i +'秒</div>';
		colockContainer.append($(itemHtml));
		if(i == 0){
			curDeg = 360 - oneDeg;
		} else {
			curDeg -= oneDeg;
		}
	}
	
	function setTime(){
		var nowDate = new Date();
		//
		setYear(nowDate);
		setMonth(nowDate);
		setDay(nowDate);
		setHour(nowDate);
		setMinute(nowDate);
		setSecond(nowDate);
		//
		setColors();
		//
		window.setTimeout(function(){
			setTime();
		}, 1000);
	}
	function setYear(nowDate){
		var year = nowDate.getFullYear();
		$("#colock-container .colock-main").text(year);
	}
	function setMonth(nowDate){
		var month = (nowDate.getMonth() + 1) +'月';
		var curAry = $("#colock-container .colock-month-item");
		var curIdx = 0;
		for(var i in curAry){
			var text = $(curAry[i]).text();
			if(text.indexOf( month ) != -1){
				curIdx = i;
				break;
			}
		}
		if($(curAry[curIdx]).hasClass('colock-active') == false){
			var newAry = [];
			for(var i=curIdx; i<curAry.length; i++){
				newAry.push(curAry[i]);
			}
			if(curIdx > 0){
				for(var i=0; i<curIdx; i++){
					newAry.push(curAry[i]);
				}
			}
			//
			var curDeg = 0;
			var oneDeg = 360.0 / 12;
			for(var i=0; i<newAry.length; i++){
				var itemObj = $(newAry[i]);
				if(i == 0){
					itemObj.addClass('colock-active');
				} else {
					itemObj.removeClass('colock-active');
				}
				itemObj.css('transform', 'rotate('+curDeg+'deg)');
				if(i == 0){
					curDeg = 360 - oneDeg;
				} else {
					curDeg -= oneDeg;
				}
			}
		}
	}
	function setDay(nowDate){
		var month = nowDate.getMonth();
		var day = nowDate.getDate() +'日';
		var curAry = $("#colock-container .colock-day-item");
		var curIdx = 0;
		for(var i in curAry){
			var text = $(curAry[i]).text();
			if(text.indexOf( day ) != -1){
				curIdx = i;
				break;
			}
		}
		if($(curAry[curIdx]).hasClass('colock-active') == false){
			var newAry = [];
			var curMonthDay = monthDay[month];
			for(var i=curIdx; i<curAry.length; i++){
				if(i < curMonthDay){
					newAry.push(curAry[i]);
					$(curAry[i]).css('display', 'block');
				} else {
					$(curAry[i]).css('display', 'none');
				}
			}
			if(curIdx > 0){
				for(var i=0; i<curIdx; i++){
					newAry.push(curAry[i]);
				}
			}
			//
			var curDeg = 0;
			var oneDeg = 360.0 / curMonthDay;
			for(var i=0; i<newAry.length; i++){
				var itemObj = $(newAry[i]);
				if(i == 0){
					itemObj.addClass('colock-active');
				} else {
					itemObj.removeClass('colock-active');
				}
				itemObj.css('transform', 'rotate('+curDeg+'deg)');
				if(i == 0){
					curDeg = 360 - oneDeg;
				} else {
					curDeg -= oneDeg;
				}
			}
		}
	}
	function setHour(nowDate){
		var hour = nowDate.getHours() +'时';
		var curAry = $("#colock-container .colock-hour-item");
		var curIdx = 0;
		for(var i in curAry){
			var text = $(curAry[i]).text();
			if(text.indexOf( hour ) != -1){
				curIdx = i;
				break;
			}
		}
		if($(curAry[curIdx]).hasClass('colock-active') == false){
			var newAry = [];
			for(var i=curIdx; i<curAry.length; i++){
				newAry.push(curAry[i]);
			}
			if(curIdx > 0){
				for(var i=0; i<curIdx; i++){
					newAry.push(curAry[i]);
				}
			}
			//
			var curDeg = 0;
			var oneDeg = 360.0 / 24;
			for(var i=0; i<newAry.length; i++){
				var itemObj = $(newAry[i]);
				if(i == 0){
					itemObj.addClass('colock-active');
				} else {
					itemObj.removeClass('colock-active');
				}
				itemObj.css('transform', 'rotate('+curDeg+'deg)');
				if(i == 0){
					curDeg = 360 - oneDeg;
				} else {
					curDeg -= oneDeg;
				}
			}
		}
	}
	function setMinute(nowDate){
		var minute = nowDate.getMinutes() +'分';
		var curAry = $("#colock-container .colock-minute-item");
		var curIdx = 0;
		for(var i in curAry){
			var text = $(curAry[i]).text();
			if(text.indexOf( minute ) != -1){
				curIdx = i;
				break;
			}
		}
		if($(curAry[curIdx]).hasClass('colock-active') == false){
			var newAry = [];
			for(var i=curIdx; i<curAry.length; i++){
				newAry.push(curAry[i]);
			}
			if(curIdx > 0){
				for(var i=0; i<curIdx; i++){
					newAry.push(curAry[i]);
				}
			}
			//
			var curDeg = 0;
			var oneDeg = 360.0 / 60;
			for(var i=0; i<newAry.length; i++){
				var itemObj = $(newAry[i]);
				if(i == 0){
					itemObj.addClass('colock-active');
				} else {
					itemObj.removeClass('colock-active');
				}
				itemObj.css('transform', 'rotate('+curDeg+'deg)');
				if(i == 0){
					curDeg = 360 - oneDeg;
				} else {
					curDeg -= oneDeg;
				}
			}
		}
	}
	function setSecond(nowDate){
		var second = nowDate.getSeconds() +'秒';
		var curAry = $("#colock-container .colock-second-item");
		var curIdx = 0;
		for(var i in curAry){
			var text = $(curAry[i]).text();
			if(text.indexOf( second ) != -1){
				curIdx = i;
				break;
			}
		}
		if($(curAry[curIdx]).hasClass('colock-active') == false){
			var newAry = [];
			for(var i=curIdx; i<curAry.length; i++){
				newAry.push(curAry[i]);
			}
			if(curIdx > 0){
				for(var i=0; i<curIdx; i++){
					newAry.push(curAry[i]);
				}
			}
			//
			var curDeg = 0;
			var oneDeg = 360.0 / 60;
			for(var i=0; i<newAry.length; i++){
				var itemObj = $(newAry[i]);
				if(i == 0){
					itemObj.addClass('colock-active');
				} else {
					itemObj.removeClass('colock-active');
				}
				itemObj.css('transform', 'rotate('+curDeg+'deg)');
				if(i == 0){
					curDeg = 360 - oneDeg;
				} else {
					curDeg -= oneDeg;
				}
			}
		}
	}
	//
	function setColors(){
		var tmpColorAry = [];
		for(var i=colorIdx; i<colorAry.length; i++){
			tmpColorAry.push(colorAry[i]);
		}
		for(var i=0; i<colorIdx; i++){
			tmpColorAry.push(colorAry[i]);
		}
		//
		$("#colock-container .colock-main").css('color', tmpColorAry[0]);
		$("#colock-container .colock-month-item").css('color', tmpColorAry[1]);
		$("#colock-container .colock-day-item").css('color', tmpColorAry[2]);
		$("#colock-container .colock-hour-item").css('color', tmpColorAry[3]);
		$("#colock-container .colock-minute-item").css('color', tmpColorAry[4]);
		$("#colock-container .colock-second-item").css('color', tmpColorAry[5]);
		//
		colorIdx++;
		if(colorIdx >= colorAry.length){
			colorIdx = 0;
		}
	}
	//
	setTime();
});