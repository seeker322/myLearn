(function(a){
	a.initPage = function(a, $){
		return {
			http:"http://s.tiandaoedu.cn/exam/index.php?m=App&",
			init:function(){
				var t = this;
				getDatas.gets();
				getType.init();
				t.tabPoint(".listTit li", "on", ".tab5");
				t.checkTaoti();
			},
			tabPoint:function(target, classN, cont){
				$(target).on("click",function(){
					var index=$(this).index();
					$(this).addClass(classN).siblings().removeClass(classN);
					$(cont).eq(index).removeClass("hide").siblings().addClass("hide");	
				});
			},
			checkTaoti:function(){
				var taoti = sessionStorage.taoti;
				if(taoti){ //套题诊断的查看，练习
					$(".listTit li").eq(1).trigger("click");
					sessionStorage.removeItem("taoti");
				}
			}
		}
	}(a, jQuery);
	  /**
        * 
        *diagnose.html
        * 
        */
	a.getDatas = function(a, $){
		return {
			init:function(){
				
			},
			gets:function(){
				var t = this;
				var userId = JSON.parse(sessionStorage.obj).value.user_id;
				$.get(initPage.http+"c=UserSmall&a=abilityAnalysis",{"user_id":userId},function(data){
					if(data.status == "1"){
						var tr1 = '<tr><td>' + data.value.correctRate + '</td>\
									<td>' + data.value.scoreAvg + '</td>\
									<td>' + data.value.timeAvg + '</td>\
									</tr>';
						var tr2 = '<tr><td>' + data.value.errorAvg + '</td>\
									<td>' + data.value.logicAvg + '</td>\
									<td>' + data.value.readAvg + '</td>\
									<td>' + data.value.mathAvg + '</td>\
									</tr>';			
						$(".tab33").append(tr1);
						$(".tab4").append(tr2);
						t.createTab1(data.value.result);
					}
				}).done(function(){
					t.abilityPointView();
					t.specialExercise();
				});
				$.get(initPage.http+"c=UserSmall&a=paperAnalysis",{"user_id":userId},function(data){
					if(data.status == "1"){
						t.createTab2(data.value);
					}
				}).done(function(){
					t.diagnosticTestView();
				});
			},
			createTab1:function(tdData){
				$.each(tdData, function(i, obj){
					var tr3='<tr>\
							<td class="firstTr" data-abilityid="' + obj.ability_id + '">' + obj.abilityName + '</td>\
							<td>' + obj.errorRate + '%</td>\
							<td>' + obj.errorNumTotal + '</td>\
							<td><a href="javascript:;" class="chakan">查看</a></td>\
							<td><a href="javascript:;" class="lianxi">练习</a></td>\
						</tr>';
					$(".tab6").append(tr3);
				});
			},
			createTab2:function(tdData){
				$.each(tdData, function(i, obj){
					var tr4='<tr>\
							<td class="firstTr" data-paperid="' + obj.paper_id + '">' + obj.paper_name + '</td>\
							<td>' + obj.errorRate + '%</td>\
							<td><a href="javascript:;" class="chakans">查看</a></td>\
						</tr>';
					$(".tab7").append(tr4);
				});
			},
			abilityPointView:function(){
				$(document).on("click", ".chakan", function(){
					var pointId = $(this).parents("tr").find("td:first").data("abilityid");
					$.get(initPage.http + "c=Problem&a=abilityLook",{"id":pointId},function(data){
						if(data.status == "1"){
							var str = JSON.stringify(data); 
								sessionStorage.lookReport = str; 
						}
					}).done(function(){
						window.location.href="AbilityPoint.html";
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
								sessionStorage.paperId = pointId;
								sessionStorage.backDatas = null;
						}
					}).done(function(){
						window.location.href="startLianxi.html?"+ pointId;
					}); 
				});	
			},
			diagnosticTestView:function(){
				$(document).on("click", ".chakans", function(){
					var userId = JSON.parse(sessionStorage.obj).value.user_id,
						paperId = $(this).parents("tr").find("td:first").data("paperid"),
						state = 3;
					$.get(initPage.http + "c=Problem&a=detail",{"userId":userId,"paperId":paperId,"state":state},function(data){
						if(data.status == "1"){
							var str = JSON.stringify(data); 
								sessionStorage.obj1 = str;
								sessionStorage.stateObj = state; 
								sessionStorage.paperId = paperId;
								sessionStorage.taoti = 1;
								sessionStorage.backDatas = "null";
								sessionStorage.removeItem("queNum");
							window.location.href="startLianxi.html";
						}
					});
				});	
			}
		}
	}(a, jQuery);
	 /**
	* 
	*wrongSelect.html
	* 
	*/
	a.getType = function(a, $){
		return{
			init:function(){
				var t = this;
				t.getTypeData();
				$(".dl_2 span:first").addClass("on");
			},
			getTypeData:function(){
				var t = this;
				$.get(initPage.http+"c=Problem&a=category",function(data){
					if(data.status == "1"){
						var checkboxs="";
						$.each(data.value, function(i, obj){
							checkboxs += '<span class="on" onclick="tabs(this)" data-id="' + obj.id + '"><em></em>' + obj.name + '</span>';
						});
						$(".dl_1 dd").html(checkboxs);
					}
				}).done(function(){
					var typeArr=[],Condition;
					$(".startLx").on("click",function(){
						$(".dl_1 span").each(function(){
							if($(this).hasClass("on")){
								typeArr.push($(this).data("id"));
							}
						});
						$(".dl_2 span").each(function(){
							if($(this).hasClass("on")){
								var txt = $(this).text();
								if(txt == "所有错题"){
									Condition = 1;
								}else if(txt == "错过一次"){
									Condition = 2;
								}else if(txt == "一直做错"){
									Condition = 3;
								}else{
									Condition = 4;
								}
							}
						});
						var userId = JSON.parse(sessionStorage.obj).value.user_id;
						$.get(initPage.http+"c=Error&a=detail",{"user_id":userId,"cat_id":typeArr,"Condition":Condition},function(data){
							if(data.status == "1"){
								if(data.value.total == "0"){
									$(".fk").removeClass("hide");
								}else{
									sessionStorage.obj1 = "";
									var str = JSON.stringify(data); 
									sessionStorage.obj1 = str; 
									sessionStorage.stateObj = 1;
									window.location.href="startLianxi.html?b";
								}
							}
						});
						sessionStorage.backDatas = "null";						
					});
				});
			}
		}
	}(a, jQuery);
})(window);

initPage.init();
function tabs(_this){
	$(_this).toggleClass("on");
}
function tab2(_this){
	$(_this).addClass("on").siblings().removeClass("on");
}
