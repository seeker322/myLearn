$(function(){
			//头像
			$(".touxiang").on("click",function(){
				$(".down").fadeIn("slow");
			});
			$(".close").on("click",function(){
				$(".down").fadeOut("slow");
			});
			resizeScreen();
			$(window).resize(function(){
				resizeScreen();
			});
			
			//我的生日
			 $("#dateSr").date();
			$("#dateSr").trigger("click"); 
			$(".list_hd li").on("click",function(){
				var num=$(this).data("num"),
					_this=$(this);
					if(num == undefined){
						return false;
					}else{
					if(num == 2 || num == 6 || num == 7 || num == 5 || num == 8 || num == 9 || num == 10 || num == 11 || num == 12 || num == 13){
							var screenWidth=screen.width,
							screenHeight=screen.height;
							$("body,.section6,html,.section7,.section5,.section8,.section11,.section12,.section13").css({"width":screenWidth+"px","height":screenHeight+"px"});
							$(".section6,.section5").addClass("pf");
							$("body,html").addClass("oh");
						}else{
							$("body,html").removeClass("oh");
						}
						$(".down").slideUp(function(){
							_this.parents(".section1").stop().animate({"left":-100+"%"},200);
							$(".section"+num).stop().animate({"left":0},300);
						});
					}	
			});
			$(".dh_cg").on("click",function(){
				$("body,html").removeClass("oh");
			});
			change();
			$(window).resize(function(){
				change();
			});
			
			
			//我的手机
			var mheight=$(".myPhoness").height()+120;
			$(".phonesBoxs").height(mheight);
			var phoneReg1 =/^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/;
			$(".sure").on("click",function(){
				var phoneNum=$(".phoneNum").val();
				if(phoneNum == ""){
					$(".phoneNum").addClass("rong");
					$(".care1_phone").show();
				}else{
					if(phoneReg1.test(phoneNum)){
						var mheight=$(".myPhoness").height();
						mheight=60+mheight;
						$(this).parents(".myPhoness").fadeOut();
						$(".succBox").fadeIn();
						$(".phonesBoxs").height(mheight);
					}else{
						$(".phoneNum").addClass("rong");
					}
				}
			});
			//发送验证码
			$(".checkss").on("click",function(){
				timers();
			});
			//我的邮箱
			var	emailReg2 = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
			$(".myEmail").focus(function(){
				//
			}).keydown(function(){
				var _that=$(this);
				_that.next().show();
				_that.next().on("click",function(){
					_that.val("");
					$(this).hide();
					_that.parent().next().hide();
				});
			}).blur(function(){
				var loginName = $(this).val();
					if(loginName == ""){  //用户名为空
						$(this).addClass("rong");
						$(this).parent().next().show().html("！请输入您的邮箱");
					}else{
						if(emailReg2.test(loginName)){
							$(this).removeClass("rong");
							$(this).parent().next().hide();
							$(this).parent().find("i").hide();
							//点击登录
							$(".sure_email").on("click",function(){
								if(loginName == ""){  //用户名为空
									$(this).addClass("rong");
									$(this).parent().next().show().html("！请输入您的邮箱");
								}
								$(".email_1").fadeOut();
								$(".email_2").fadeIn();
							});
						}else{
							$(this).addClass("rong");
							$(this).parent().next().show().html("！账号名称格式错误");
						}
					}
			});
			$(".sure_email").on("click",function(){
				var loginName = $(".myEmail").val();
				if(loginName == ""){  //用户名为空
					$(".myEmail").addClass("rong");
					$(".myEmail").parent().next().show().html("！请输入您的邮箱");
				}
			});
			//婚姻状况,性别
			var hyRel,sexRel;
				$(".hunyin span").on("click",function(){
					$(this).addClass("on").siblings().removeClass("on");
					hyRel=$(this).find("a p").text();
				});
				$(".sex span").on("click",function(){
					$(this).addClass("on").siblings().removeClass("on");
					sexRel=$(this).find("a p").text();
				});
				
		
			//点击添加地址
			$(".addBtnss,.success").on("click",function(){
				var index=$(this).data("index");
				$(this).parents("section").stop().animate({"left":-100+"%"},300);
				$(".section"+(index+1)).stop().animate({"left":0},300);
				
			});
			
			//删除
			$(".delete").on("click",function(){
				$(this).parents(".list_gr").remove();
			});
			
			//编辑
			$(".update").on("click",function(){
				$(this).parents("section").stop().animate({"left":100+"%"},300);
				$(this).parents("section").prev().stop().animate({"left":0+"%"},300);
			});
			
			//
			$(".dh_cg").on("click",function(){
				$(this).parents("section").stop().animate({"left":100+"%"},300);
				$(".section1").stop().animate({"left":0+"%"},300);
			});
			//右上角对号
			$(".sectionGR .dh").on("click",function(){
				$(".section1").stop().animate({"left":0},200,function(){
					$("body,html").removeClass("oh");
				});
				$(this).parents("section").stop().animate({"left":100+"%"},300);
				//性别，未婚
				$(".sexRel").html(sexRel);
				$(".hyRel").html(hyRel);
				//昵称
				$(".myName").html($(".nc").val());
				
			});
				//点击生日里的对号
				$(".dh_sr").on("click",function(){
					var srVal=$("#dateSr").val();
					$(".birthDate").html(srVal);
					$("body,html").css({"width":100+"%","height":100+"%"});
					$("body,html").removeClass("oh");
				});
				//已读专业
				$(".dh_ydzy").on("click",function(){
					$(".myZhuanyeTxt").html($(".myZhuanye").val());
				});
			
		});
			
		function resizeScreen(){
			var	screenW=document.documentElement.clientWidth ||　document.body.clientWidth,
				screenH=document.documentElement.clientHeight ||　document.body.clientHeight;
				$(".black").css("width",screenW);
				$(".black").css("height",screenH);
		}
		function change(){
			var H=screen.height,
				TopH=((H-60-240)-$(".titTxt").height())/2;
			$(".titTxt").css("marginTop",TopH);
		}
		function timers(){
			var t=60;
			$(".tip").html(t+"秒后重新发送");
				$(".checkss").hide();
				$(".tip").show();
			 timer=setInterval(function(){
				t--;
				if(t > 0){
					$(".tip").html(t+"秒后重新发送");
				}else{
					$(".tip").hide();
					$(".checkss").show();
					clearInterval(timer);
				}
			},1000);
		}
