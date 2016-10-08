/* 根据屏幕尺寸改变根元素大小 */
(function ($, window) {
    window.addEventListener('DOMContentLoaded', function () {
        var shuping = 'onorientationchange' in window ? 'orientationchange' : 'resize';
        var timer = null;

        //设置字体
        function setFontSize() {
            var w = document.documentElement.clientWidth || document.body.clientWidth;
            document.documentElement.style.fontSize = parseInt(100 * w / 720) + 'px';
        }

        setFontSize();
        window.addEventListener(shuping, function () {
            clearTimeout(timer);
            timer = setTimeout(setFontSize, 300);
        }, false);
    }, false);
})($, window);

$(function(){
	$(".arrow").on("click",function(e){
		e.stopPropagation();
		history.go(-1);
	});
});
window.onload=function(){
	var path = window.location.href;
	if((path.indexOf("login") != -1) || (path.indexOf("forget") != -1) || (path.indexOf("register") != -1)){
		return false;
	}else{
		 $.get("http://s.tiandaoedu.cn/exam/index.php?m=App&c=User&a=base","GET",function(data){
			if(data.status == (-4848)){
				alert(data.message);
				window.location.href="login.html";
			}
		});
	}
}