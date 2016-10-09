
$(function () {
	var value,
		userId=JSON.parse(sessionStorage.obj).value.user_id,
		lastLi=$("ul li:last-child"),
		http = "http://s.tiandaoedu.cn/exam/index.php?m=App&";
	$.ajaxSetup({
		async:false
	})
	$.get(http + "c=Collect&a=index",{userId:userId},function (data) {
		if (data.status) {
			value=data.value;
			localStorage.collectIndex=JSON.stringify(data.value)
		}
	});
	for (var i = 0; i < value.length; i++) {
		lastLi.data("id",value[i].id);
		lastLi.children("span").text(value[i].name);
		lastLi.children("div").text(value[i].total);
		lastLi.before(lastLi.clone(true))
	}
	$(".arrow-own").on("click",function () {
		window.location="userCenter.html";
	})
	$("ul li").on('click',function () {
		var id=$(this).data("id");
		$.get(http + "c=Collect&a=detail",{userId:userId,catId:id},function (data) {
			if (data.message=="成功") {
				sessionStorage.obj1=JSON.stringify(data);
				sessionStorage.stateObj = "null";
				sessionStorage.backDatas = null;
				window.location="startLianxi.html?c";
			}
		})
	})
})