$(function () {
	var user_id=JSON.parse(sessionStorage.getItem('obj')).value.user_id;
	$(".public-btn").click(function () {
		var oldPass=$(".oldPass").val(),reg=/^[0-9a-zA-Z]{6,30}$/,newPass=$(".newPass:eq(0)").val();
		if (!oldPass) {
			$(".xh_tk").text("请输入旧密码").show(function () {
				var timer;
				clearTimeout(timer);
				timer=setTimeout(function () {
					$(".xh_tk").hide()
				},500)
			})
			return;
		}
		if (newPass!=$(".newPass:eq(1)").val()) {
			$(".xh_tk").text("密码不一致").show(function () {
				var timer;
				clearTimeout(timer);
				timer=setTimeout(function () {
					$(".xh_tk").hide()
				},500)
			})
			return;
		}
		// if (!reg.test(newPass)) {
		// 	$(".xh_tk").text("请重新输入").show(function () {
		// 		var timer;
		// 		clearTimeout(timer);
		// 		timer=setTimeout(function () {
		// 			$(".xh_tk").hide()
		// 		},500)
		// 	})
		// 	return;
		// }
		if (oldPass&&newPass==$(".newPass:eq(1)").val()) {
			$.ajax({
				url:'http://s.tiandaoedu.cn/exam/index.php?m=App&c=Me&a=mePass',
				type:'get',
				data:{
					user_id:user_id,
					oldPass:oldPass,
					pass:newPass
				},
				success:function (data) {
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
		}
	})
})