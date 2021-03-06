(function(a){
	a.initPage = function(a, $){
		return {
			http:"http://s.tiandaoedu.cn/exam/index.php?m=App&",
			init:function(){
				var t = this;
				GetData.init();
				liTab();
				t.Tab(".sc_list li", ".lianxi2Box .xh_lianxi2", "cur");		
				$(".arrows1").on("click", function(){
					window.location.href="lianxi1.html";
				});
			},
			Tab:function(target, cont, classN){
				$(document).on("click",target, function(){
					var index = $(this).index(),
					userId = JSON.parse(sessionStorage.obj).value.user_id;
					sourceId = $(this).attr("id"),  //来源Id
					catId = $(".link span").attr("inds");   //分类Id
					GetData.intoTheList(userId, catId, sourceId, index);
					$(this).addClass(classN).siblings().removeClass(classN);
					$(cont).eq(index).removeClass("hide").siblings().addClass("hide");
				});
			}
		}
	}(a, jQuery);
	
	//ajax
	a.ajaxSend = function(){
		return {
			sender:function(url, data, type){
				data = data || {};
				data.timestamp = new Date().getTime();
				type = type || "html";
				return $.ajax({
					url:url,
					data:data,
					type:type,
					dataType:"json"
				});
			}
		}
	}(a, jQuery);
	
	/**
	 * [function 从上到下请求数据]
	 * @return {[type]} [description]
	 */
	a.GetData = function(a, $){
		return {
			init:function(){
				var t = this;
				t.forClassification();
				t.accessSource();
			},
			forClassification:function(){
				var t = this;
				ajaxSend.sender(initPage.http+"c=Problem&a=category",{},"GET").done(function(data){
					if(data.status == 1){
						var styleLi = "";
						$.each(data.value, function(i, obj){
							styleLi += "<li onclick='liCur(this)' id='" + obj.id + "'><span>" + obj.name + "</span><em></em></li>"
						});
						$(".submenu").html("");
						$(".submenu").prepend(styleLi);
						var str = window.location.search,
							index = str.indexOf("?"),
							curId = str.substr(index+1);
						if(index != -1){
							$(".submenu li").each(function(){
								if($(this).attr("id") == curId){
									$(this).trigger("click");
									$(".link span").text($(this).text()).attr("inds", curId);
								}
							});
						}
						t.checkFns();
					}
				});
			},
			accessSource:function(){
				var t = this;
				ajaxSend.sender(initPage.http+"c=Problem&a=source",{},"GET").done(function(data){
					if(data.status == 1){
						var sourceLi = "",xh_lianxi2;
						$.each(data.value, function(i, obj){
							sourceLi += "<li id='" + obj.id + "'>" + obj.name + "</li>";
							xh_lianxi2 = "<div class='xh_lianxi2 m30'></div>";
							$(".lianxi2Box").append(xh_lianxi2);
						});
						$(".sc_list ul").html("");
						$(".sc_list ul").prepend(sourceLi);
					}
					$(".sc_list ul li:first").trigger("click");
				});
			},
			intoTheList:function(userId, catId, sourceId, index){
				var dls = "",
					t = this;
				ajaxSend.sender(initPage.http+"c=Problem&a=indexList",{'userId':userId,'catId':catId,'sourceId':sourceId},"GET").done(function(data){
					if(data.status == 1){
						$.each(data.value, function(i, obj){
							if(i>= 0 && i<9){
								i = "0"+(i+1);
							}else{
								i = i+1;
							}
							dls += '<dl data-id="' + obj.p_id + '">'
							+'<dt class="m30">'
							+'<em>' + i + '</em>'
							+'<span>' + obj.name + ' <i>' + obj.number+ '</i></span>'
							+'</dt>'
							+'<dd>'
							+'<a href="javascript:;" data-exe="3" data-analysis="' + obj.is_analysis + '" class="fl analysis">解析</a>'
							+'<a href="javascript:;" data-exe="1" data-iscontinue="' + obj.is_continue + '" class="fr exercise">练习</a>'
							+'</dd>'
							+'</dl>';
						});
						//$(".xh_lianxi2").eq(index).html("");
						$(".xh_lianxi2").eq(index).html(dls);
						$(".xh_lianxi2 dl").each(function(){
							var isFinish = $(this).data("is_finish"), //判断是否完成
							analysis = $(this).find("a.analysis").data("analysis"),      //是否有解析
							isContinue = $(this).find("a.exercise").data("iscontinue"); //是否有继续
							if(analysis == "1"){
								$(this).find(".analysis").show();
							}else{
								$(this).find(".analysis").hide();
							}
							if(isContinue == "1"){
								$(this).find(".exercise").text("继续").data("exe", 2);
							}else{
								$(this).find(".exercise").text("练习").data("exe", 1);
							}
						});
					}
					$(document).on("click", "dl a", function(e){
						var paperId = $(this).parents("dl").data("id"),
							state = $(this).data("exe"),
							userId = JSON.parse(sessionStorage.obj).value.user_id;
							t.titleDetails(paperId, state, userId);
					});
				});
			},
			titleDetails:function(paperId, state, userId){
				ajaxSend.sender(initPage.http+"c=Problem&a=detail",{'paperId':paperId,'state':state,'userId':userId},"GET").done(function(data){
					if(data.status == 1){
						var str = JSON.stringify(data); 
							sessionStorage.obj1 = str;
							sessionStorage.stateObj = state;
							sessionStorage.paperId = paperId;
						var indss = $(".link span").attr("inds"),
							sourceId;
						$(".sc_list li").each(function(){
							if($(this).hasClass("cur")){
								sourceId = $(this).attr("id");
							}
						});
						var backData = {
							"indss":indss,
							"sourceId":sourceId
						};
						var backDatas = JSON.stringify(backData); 
							sessionStorage.backDatas = backDatas;
							sessionStorage.reportDatas = backDatas;
						window.location.href="startLianxi.html?a";
					}
				});
			},
			//返回时候判断哪个题型
			checkFns:function(){
				var http = window.location.search,
					indexNum = http.indexOf("?"),
					newHttp = http.substr(indexNum+1),
					sjArr = newHttp.split(","),
					spanIds,
					sourceIds;
					if(sjArr.length == 2){
						spanIds = sjArr[0];
						sourceIds = sjArr[1];
						$(".sc_list li").each(function(){
						if($(this).attr("id") == sourceIds){
							$(this).trigger("click");
							$(this).addClass("cur").siblings().removeClass("cur");
							$(".xh_lianxi2").eq($(this).index()).show().siblings().hide();
						}
						});
						$(".submenu li").each(function(){
							if($(this).attr("id") == spanIds ){
								$(this).trigger("click");
								$(".link span").attr("inds", spanIds).html($(this).text());
								$(this).addClass("on").siblings().removeClass("on");
							}
						});
					}
			}
		}
	}(a, jQuery);
})(window);

initPage.init();
function liCur(_this){
	var txt=$(_this).text();
		catIds = $(_this).attr("id"); 
		$(_this).addClass("on").siblings().removeClass("on");
		$(".link span").text(txt).attr("inds", catIds);
		$(".submenu,.mc").hide();
		$(".sc_list ul li:first").trigger("click");
		flag=false;
}
function liTab(){
	var flag=false;
	if(!flag){
		$(".submenu,.mc").show();
		flag=true;
	}else{
		$(".submenu,.mc").hide();
		flag=false;
	}
}