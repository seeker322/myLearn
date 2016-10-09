$(function () {
	var userId=JSON.parse(sessionStorage.obj).value.user_id;
	var setting=JSON.parse(localStorage.setting);
	var ajax=function () {
			return{
				init:function () {
					
				},
				sender:function (type,data) {
					return $.ajax({
						url:'http://s.tiandaoedu.cn/exam/index.php?m=App&c=Me&a=saveSetting',
						type:type,
						data:{userId:userId,isShowAnalyze:data.isShowAnalyze,isSwitchNight:data.isSwitchNight,fontSize:data.fontSize,isAutoGo:data.isAutoGo},
						datatype:"json"
					})
				}
			}
		}()
	$(".sp1").click(function () {
		$(this).toggleClass('on');
		$(this).children('em').toggleClass('fr on');
		if ($(this).index(".sp1")==0) {
			setting.isShowAnalyze=0;
			if ($(this).hasClass('on')){setting.isShowAnalyze=1;}
		} else {
			setting.isSwitchNight=0;
			if ($(this).hasClass('on')) setting.isSwitchNight=1;
		}
		localStorage.setting=JSON.stringify(setting);
		ajax.sender('get',setting).done(function (data) {
		})
	})
	$("i").click(function () {
		$("em:parent").removeClass('on');
		$(this).parent().addClass('on')
		setting.fontSize=$("i").index(this);
		localStorage.setting=JSON.stringify(setting);
		ajax.sender('get',setting).done(function (data) {
			
		})
	})
	$("ul li:nth-child(5)").click(function () {
		var timer1,timer2;
		clearTimeout(timer1);
		clearTimeout(timer2);
		timer1=setTimeout(function () {
			$("ul li:nth-child(5)").children('div.complete').show();
			$("ul li:nth-child(5)>span span").text('0MB');
		},1000)
		timer2=setTimeout(function () {
			$("ul li:nth-child(5)").children('div.complete').hide();
		},2500)
	})
	if (setting.isShowAnalyze) {
		$(".sp1:eq(0)").addClass('on');
		$(".sp1:eq(0)").children().addClass('fr on')
	} else {
		$(".sp1:eq(0)").removeClass('on');
		$(".sp1:eq(0)").children().removeClass('fr on')
	}
	if (setting.isSwitchNight) {
		$(".sp1:eq(1)").addClass('on');
		$(".sp1:eq(1)").children().addClass('fr on')
	} else {
		$(".sp1:eq(1)").removeClass('on');
		$(".sp1:eq(1)").children().removeClass('fr on')
	}
	switch(setting.fontSize){
		case 0:$("em:eq(2)").addClass('on');
			break;
		case 1:$("em:eq(3)").addClass('on');
			break;
		case 2:$("em:eq(4)").addClass('on');
			break;
	}
})