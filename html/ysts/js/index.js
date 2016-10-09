$(function () {
	var date=new Date(),month=date.getMonth()+1;
	$(".section-ad01 p").text(month+'-'+(month+1)+'月签约留学方案 可获得惊喜优惠');
	$(".section04 .left ul li").mouseover(function() {
		$(".section04 .left ul li").css({
			background: '#fff',
			color: '#1dcbac'
		});
		$(this).css({
			background: '#1dcbac',
			color: '#fff'
		})
	});
	var flag06=flag12=flag14=true;
	console.log($(window).scrollTop());
	$(window).scroll(function(event) {
		if(flag06&&$(window).scrollTop()>5604&&$(window).scrollTop()<6020) {
			section06Animate();
			flag06=false;
		}
		if(flag12&&$(window).scrollTop()>8400&&$(window).scrollTop()<8800) {
			section12Animate();
			flag12=false;
		}
		if(flag14&&$(window).scrollTop()>9400&&$(window).scrollTop()<9850) {
			section14Animate();
			flag14=false;
		}
	});
	function section06Animate() {
		$(".section06 .left .img04").animate({right:"60px"}, 1000);
		$(".section06 .left .img03").animate({right:"60px"},1200);
		$(".section06 .left .img02").animate({right:"272px"},1400)
		$(".section06 .left .img01").animate({right:"646px"},2600)
	}
	function section12Animate() {
		$(".section12 .right .Bg1").animate({left:"0px"},1000,function () {
			$(this).children('p').css("display","block")
		});
		$(".section12 .right .Bg2").animate({left:"0px"},1200,function () {
			$(this).children('p').css("display","block")
		});
	}
	function section14Animate() {
		$(".section14 .right .Bg1").animate({left:"0px"},1000,function () {
			$(this).children('p').css("display","block")
		});
		$(".section14 .right .Bg2").animate({left:"710px"},1200);
	}
	$(".tab li").mouseenter(function () {
		$(".tab li").removeClass('on');
		$(this).addClass('on').siblings();
		if(!$(this).parent().index()){
			$(".tab2").hide();
			$(".tab1").show();
		}else{
			$(".tab1").hide();
			$(".tab2").show();
		}
	})
	$(".section09 .right ul li img").hover(function() {
		$(this).siblings().hide();
		$(this).animate({width:"130%"},450);
	}, function() {
		$(this).animate({width:"100%"},450);
		$(this).siblings().show(450);
	});
})