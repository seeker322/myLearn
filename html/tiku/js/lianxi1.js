$(function(){
	/**
	 *lianxi1.html
	 * 
	 */
	tab(".footer li", "cur");
	/* var userName = JSON.parse(sessionStorage.obj).value.name; */
	var userId = JSON.parse(sessionStorage.obj).value.user_id,
		http = "http://s.tiandaoedu.cn/exam/index.php?m=App&";
	$.get(http + "c=Me&a=index", {'user_id':userId}, "GET").done(function(data){
		if(data.status == 1){
			getDatas(data);
		}
	});
	/*请求setting信息 */
	var userId = JSON.parse(sessionStorage.obj).value.user_id;
	$.get(http + "c=Me&a=listSetting",{"userId":userId},function(data){
		var setData,str;
		if(data.status == "1"){
			setData = {
					"isAutoGo" :data.value.isautogo,           //自动跳到下一题
					"isShowAnalyze" : data.value.isshowanalyze,     //是否展开解析
					"isOpenSound" : data.value.isopensound,     //是否有提示音
					"isSwitchNight" : data.value.isswitchnight,  //是否有提示音
					"fontSize" : data.value.fontsize           //字体大小（1.小  2.标准 3.大）
				};
		}
		str = JSON.stringify(setData); 
		//存入 
		localStorage.setting = "";
		localStorage.setting = str; 
	});
});

function getDatas(data){
	var topDiv = '<div class="xh_top">'
			+'<dl class="clearfix">'
			+'<dt><p>你已完成</p>'
			+'<p><span>' + data.value.finish_num + '</span>题</p></dt>'
			+'<dd class="bg"><a href="wrongSelect.html"></a></dd><dt>'
			+'<p>平均正确率为</p>'
			+'<p><span>' + data.value.correct_rate + '</span>%</p></dt></dl></div>';
	$(".xh_sy").prepend(topDiv);
	$.each(data.value.cats, function(i, obj){
		var yellow = ((obj.finish_cat/obj.total)*100).toFixed(2);
		//	green = ((obj.correct_cat/obj.finish_cat1)*100).toFixed(2);
		//console.log(obj);
		var dl = "<dl onclick='dlClick(" + obj.cat_id + ")' data-id=" + obj.cat_id + "><dt>" + obj.cat_name + "</dt>"
			+ "<dd>"
			+ "<div class='progressbar' data-perc=''>"
			+ "<div class='jd-bar'><span class='bar_1' style='width:" + yellow + "%'><span class='bar_2' style='width:" + obj.correct_rate + "%'></span></span></div>"
			+ "<div class='xh_down'><span class='fr'>已完成 <em>" + obj.finish_cat + "</em> / <em>" + obj.total + "</em></span><span class='fl'>" + obj.correct_rate+ "%</span></div>"
			+ "</div>"
			+ "</dd>"
			+ "</dl>";
			$(".xh_list3").append(dl);
	});
}
function dlClick(curIdNum){
		window.location.href="lianxi2.html?"+curIdNum;
}
function tab(target, classN){
	$(target).on("click",function(){
		$(this).addClass(classN).siblings().removeClass(classN);
	});
}