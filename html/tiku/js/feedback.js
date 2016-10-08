$(function () {
	var user_id=JSON.parse(sessionStorage.getItem('obj')).value.user_id;
	var ajax=function () {
		return{
			init:function () {
				
			},
			sender:function (url,type,data) {
				return $.ajax({
					url:url,
					type:type,
					data:data,
					datatype:"json"
				})
			}
		}
	}()
	$(".public-btn").click(function () {
		var advice=$("textarea").val();
		ajax.sender('http://s.tiandaoedu.cn/exam/index.php?m=App&c=Me&a=board','get',{userId:user_id,message:advice}).done(function (data) {
			if (data.message=='留言成功') {
				$(".xh_tk").text(data.message).show();
				var timer;
				clearTimeout(timer);
				timer=setTimeout(function () {
					$(".xh_tk").hide()
				},1000)
			}
		})
	})
})