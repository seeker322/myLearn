var gender,user_id=JSON.parse(sessionStorage.getItem('obj')).value.user_id;
if (JSON.parse(localStorage.userInfo).value.gender=="male") {
	$("i").eq(0).parent().addClass('on');		
}else{
	$("i").eq(1).parent().addClass('on');
}
$("i").click(function() {
	$("i").parent().removeClass('on');
	$(this).parent().addClass('on');
	if ($(this).parent().text()=='男') {gender='male';} else {gender='female';}
});
$(".public-btn").click(function () {
	if (gender) {
			$.ajax({
			url:'http://s.tiandaoedu.cn/exam/index.php?m=App&c=Me&a=meGender',
			data:{
				user_id:user_id,
				gender:gender
			},
			type:'get',
			success:function (data) {
				var userInfo=JSON.parse(localStorage.userInfo);
				userInfo.value.gender=gender;
				localStorage.userInfo=JSON.stringify(userInfo);
				$(".xh_tk").text(data.message).show();
				(function () {
					var timer,timer1;
					clearTimeout(timer);
					clearTimeout(timer1);
					timer=setTimeout(function () {
						$(".xh_tk").hide()
					},1000)
					timer1=setTimeout(function () {
						history.go(-1)
					},2000)
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
	}
	
})