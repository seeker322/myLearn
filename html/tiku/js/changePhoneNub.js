$(function () {
	var user_id=JSON.parse(sessionStorage.getItem('obj')).value.user_id;
	$("#newPhoneNub").attr("placeholder",JSON.parse(localStorage.userInfo).value.verifiedmobile);
	$(".public-btn").on('click', function() {
		var reg=/^0?(13[0-9]|15[012356789]|17[0678]|18[0-9]|14[57])[0-9]{8}$/,msg=$("#newPhoneNub").val();
		if(reg.test(msg)){
			$.ajax({
				url:'http://s.tiandaoedu.cn/exam/index.php?m=App&c=Me&a=meMobile',
				data:{
					user_id: user_id,
					mobile: msg
				},
				type:'get',
				success:function (data) {
					$(".xh_tk").text(data.message).show();
					(function () {
						var timer,timer1;
						clearTimeout(timer);
						clearTimeout(timer1);
						timer=setTimeout(function () {
							$(".xh_tk").hide()
						},1000)
						if (data.message=="修改成功") {
							var userInfo=JSON.parse(localStorage.userInfo);
							userInfo.value.verifiedmobile=msg;
							localStorage.userInfo=JSON.stringify(userInfo);
							timer1=setTimeout(function () {
								history.go(-1)
							},2000)
						}
					})()
				},
				error:function (data) {
					$(".xh_tk").text(data.message).show();
					(function () {
						var timer;
						clearTimeout(timer);
						timer=setTimeout(function () {
							$(".xh_tk").hide()
						},500)
					})()
				}
			})
		}else{
			$("#newPhoneNub").val('');
			$("#newPhoneNub").attr("placeholder",'手机号输入错误');
		}
	});
})