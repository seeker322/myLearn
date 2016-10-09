(function(a){
	a.initPage = function(a, $){
		return {
			http:"http://s.tiandaoedu.cn/exam/index.php?m=App&",
			init:function(){
				var t = this;
				GetData.getDatas();
				$(".arrowss").on("click",function(){
					var reportData = JSON.parse(sessionStorage.reportDatas);
					window.location.href="lianxi2.html?" + reportData.indss + "," + reportData.sourceId;
				});
			}
		}
	}(a, jQuery);
	
	/**
	 *report.html
	 * 
	 */
	a.GetData = function(a, $){
		return {
			init:function(){

			},
			getDatas:function(){
				var t = this;
				var reports = JSON.parse(sessionStorage.report),
					getGufenHtml  = t.gufen(reports.value);
					$(".titlesRep").html(reports.value.paper_name);
					t.getMessageList(reports.value.smallStory);
					t.getAbilityPoint(reports.value.ability);
					$(".ctList").prepend(getGufenHtml);
					t.abilityPointView();
					t.specialExercise();
					$(document).on("click", ".ckjx", function(){
						t.viewProblemAnalysis();
					});
					$(document).on("click", ".list5 li", function(){
						var thisNum = $(this).data("sort");
						t.viewProblemAnalysis(thisNum);
					});
				var background='-webkit-linear-gradient(bottom,#55d3b3 0%,#55d3b3 '+reports.value.corrateRate+'%,#ee5858 '+reports.value.corrateRate+'%,#ee5858 100%)';
					$("span.dt_1").css({'background':background});
			},
			gufen:function(reports){
				var dtHtml = '<dt class="fl">\
							<span class="dt_1">\
								<p>正确率</p>\
								<p>' + reports.corrateRate + ' <i>%</i></p>\
							</span>\
							<p class="p_1 clearfix"><i class="icons"></i><em>用时</em><em class="time">' + reports.time + '</em></p>\
							<p class="p_1 clearfix"><i class="icons icons2"></i><em>估分</em><em class="time">' + reports.totalScore + '</em></p>\
							<p class="tc ck mt30"><a href="javascript:;" class="ckjx">查看套题解析</a></p>\
						</dt>';
						return dtHtml;
			},
			getMessageList:function(messageList){
				var li;
				$.each(messageList, function(i, obj){
					$.each(obj, function(ii, objs){
						if(objs.is_correct == "1"){
						 	li = '<li class="green" data-sort="' + objs.detail_sort+ '"><a href="javascript:;">' + objs.smallSort + '</a></li>';
						}else if(objs.is_correct == "0"){
							li = '<li class="reds" data-sort="' + objs.detail_sort+ '"><a href="javascript:;">' + objs.smallSort + '</a></li>';
						}else{
							li = '<li data-sort="' + objs.detail_sort+ '"><a href="javascript:;">' + objs.smallSort + '</a></li>';
						}
						$(".ctList .list5").append(li); 
					});
				});
			},
			getAbilityPoint:function(abilityPoints){
				$.each(abilityPoints, function(i, obj){
					var tr = '<tr><td data-abilityid=' + obj.ability_id + '>' + obj.ability_name + '</td><td>' + obj.error_rate + '%</td><td>' + obj.error_num + '</td><td><a href="javascript:;" class="chakan">查看</a></td><td><a href="javascript:;" class="lianxi">练习</a></td></tr>';
					$(".tab6").append(tr);
				});
			},
			viewProblemAnalysis:function(thisNum){
				var userId = JSON.parse(sessionStorage.obj).value.user_id,
					paperId = JSON.parse(sessionStorage.paperId),
					state = 3;
					$.get(initPage.http + "c=Problem&a=detail",{"userId":userId,"paperId":paperId,"state":state},function(data){
						if(data.status == "1"){
							var str = JSON.stringify(data); 
								sessionStorage.obj1 = str; 
								sessionStorage.stateObj = state;
								
								if(typeof(thisNum) == "string" || typeof(thisNum) == "number"){ //从report右侧题号点击进来
									sessionStorage.queNum = thisNum;
								}else{
									sessionStorage.removeItem("queNum");
								}
							sessionStorage.backDatas = "null";
						}
					}).done(function(){
						window.location.href="startLianxi.html";
					});
			},
			abilityPointView:function(){
				$(".chakan").on("click",function(){
					var pointId = $(this).parents("tr").find("td:first").data("abilityid");
					$.get(initPage.http + "c=Problem&a=abilityLook",{"id":pointId},function(data){
						if(data.status == "1"){
							var str = JSON.stringify(data); 
								sessionStorage.lookReport = str; 
							window.location.href="AbilityPoint.html";
						}
					});
				});	
			},
			specialExercise:function(){
				$(document).on("click", ".lianxi", function(){
					var userId = JSON.parse(sessionStorage.obj).value.user_id,
						pointId = $(this).parents("tr").find("td:first").data("abilityid");
					 $.get(initPage.http + "c=Problem&a=abilityTest",{"abilityId":pointId,"userId":userId},function(data){
						if(data.status == "1"){
							var str = JSON.stringify(data); 
								sessionStorage.obj1 = str;
								sessionStorage.stateObj = 1; 
								sessionStorage.backDatas = null;	
						}
					}).done(function(){
						window.location.href="startLianxi.html?"+ pointId;
					}); 
				});	
			}
		}
	}(a, jQuery);
	
})(window);

initPage.init();
