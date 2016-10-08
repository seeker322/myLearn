$(function () {
	var ajax=function () {
		return{
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
	var user_id=JSON.parse(sessionStorage.getItem('obj')).value.user_id,
		user_name=JSON.parse(sessionStorage.getItem('obj')).value.name,
		http = "http://s.tiandaoedu.cn/exam/index.php?m=App&";
	$("#user-name").text(user_name);

	ajax.sender(http + 'c=Me&a=MeIndex','get',{user_id:user_id}).done(function (data) {
		localStorage.userCenter=JSON.stringify(data);
	})
	ajax.sender(http + 'c=Me&a=meInfo','get',{user_id:user_id}).done(function (data) {
		localStorage.userInfo=JSON.stringify(data);
	})
	$("#quit").click(function () {
		ajax.sender(http + 'c=User&a=logout','get').done(function (data) {
			if (data.status == 1) {
				native.callMain('logout',0,0,0,0);
			}
		})
	});
});
var logout={
	logoutsucess:function () {
		$(".xh_tk").text("退出成功").show();
		window.sessionStorage.clear();
		window.localStorage.clear();
		var timer1=setTimeout(function () {
			$(".xh_tk").hide();
			window.location.href='login.html';
		},600)
		
	}
}