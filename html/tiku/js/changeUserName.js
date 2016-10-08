$(function () {
	var user_id=JSON.parse(sessionStorage.getItem('obj')).value.user_id,
		user_name=JSON.parse(sessionStorage.getItem('obj')).value.name;
	$("#newUserName").attr("placeholder",user_name);
	$(".public-btn").on('click', function() {
		var reg=/^[a-zA-Z0-9\u4e00-\u9fa5]{1,12}$/,msg=$("#newUserName").val();
		if(reg.test(msg)){
			$.ajax({
				url:'http://s.tiandaoedu.cn/exam/index.php?m=App&c=Me&a=meName',
				data:{
					user_id: user_id,
					name: msg
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
							var obj=JSON.parse(sessionStorage.obj);
							userInfo.value.nickname=msg;
							obj.value.name=msg;
							localStorage.userInfo=JSON.stringify(userInfo);
							sessionStorage.obj=JSON.stringify(obj);
							timer1=setTimeout(function () {
								history.go(-1)
							}, 2000);
						}
					})()
				},
				error:function () {
					$(".xh_tk").text("修改失败").show();
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
			$("#newUserName").val('');
			$("#newUserName").attr("placeholder",'用户名输入错误');
		}
	});
})	