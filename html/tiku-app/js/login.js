(function(a){
	a.initPage=function(w, $){
		return {
			http:"http://s.tiandaoedu.cn/exam/index.php?m=App&",
			hideTime:1000,
			init:function(){
				Login.init();
				Register.init();
				ForgetPwd.init();
			}
		}
	}(a, jQuery);
	
	//ajax
	a.ajaxSend = function(){
		return {
			init:function(){
				
			},
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
	
	//注册
	a.Register = function(W, $){
		return {
			init:function(){
				var t = this;
				t.startRegister();
			},
			//前端验证
			randomCheck:function(){
				var phoneReg =/^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/,
					pwdReg = /^[\w]{6,}$/,
					NameReg = /^[\w || \u4E00-\u9FA5]{1,12}$/;
				$(".xh_zx_list input").blur(function(){
					var _this = $(this);
					var curVal = _this.val();
					if(_this.hasClass("phones")){
						if(curVal != ""){
							if(!phoneReg.test(curVal)){
								$(".xh_tk").removeClass("hide").html("请输入有效手机号");
								_this.next().show().addClass("wrong");
							}else{
								ajaxSend.sender(initPage.http+"c=User&a=sameMobile", {"mobile":curVal} , "GET").done(function(data){
									if(data.status == (-2)){
										$(".xh_tk").removeClass("hide").html("该手机号已注册");
										_this.next().addClass("wrong").show();
									}else if(data.status == 1){
										_this.next().removeClass("wrong").show();
									}	
								});
							}
						}else{
							$(".xh_tk").removeClass("hide").html("手机号不能为空");
							_this.next().hide().removeClass("wrong");
						} 
					}else if(_this.hasClass("names")){
						if(curVal != ""){
							if(!NameReg.test(curVal)){
								$(".xh_tk").removeClass("hide").html("1-12位字母、数字或汉字");
								_this.next().addClass("wrong").show();
							}else{
								ajaxSend.sender(initPage.http+"c=User&a=sameName", {"name":curVal} , "GET").done(function(data){
									if(data.status == (-2)){
										$(".xh_tk").removeClass("hide").html("该用户名已存在");
										_this.next().addClass("wrong").show();
									}else if(data.status == 1){
										_this.next().removeClass("wrong").show();
									}	
								});
							}
						}else{
							$(".xh_tk").removeClass("hide").html("用户名不能为空");
							_this.next().hide().removeClass("wrong");
						}
						
					}else if(_this.hasClass("pwds")){
						if(curVal != ""){
							if(!pwdReg.test(curVal)){
								$(".xh_tk").removeClass("hide").html("密码少于6位");
							}
						}else{
							$(".xh_tk").removeClass("hide").html("密码不能为空");	
						}
					}
					HideDialog.hide();
				});
			},
			startRegister:function(){
				var t = this;
				t.randomCheck();
				$(".xh_btn_res").on("click",function(){
					var phoneNum = $(".xh_item1 input").val(),
						userName = $(".xh_item2 input").val(),
						pwdNum = $(".xh_item3 input").val(),
						yzNum = $(".xh_yzLable input").val(),
						datas = {mobile:phoneNum,name:userName,passwd:pwdNum,code:yzNum};
				ajaxSend.sender(initPage.http+"c=User&a=register", datas , "GET").done(function(datas){
					if(datas.status == 0){
						Change.changes(datas);
					}else{  //注册成功直接登录
						  ajaxSend.sender(initPage.http+"c=User&a=login", {name:phoneNum}, "GET").done(function(data){
							if(data.status == 1){
								var str = JSON.stringify(data); 
								//存入 
								sessionStorage.obj = str; 
								$(".xh_tk").removeClass("hide").html(datas.message);
								HideDialog.hide();									
							}
						}).done(function(){
							setTimeout(function(){
								window.location.href="lianxi1.html";
							},initPage.hideTime);
						}); 
					}
				}); 
				});
				t.getYzm();
				t.checks();
			},
			checks:function(){
				var t = this;
				$(".checkboxs").on("click",function(){
					var isOrno = $(".checkboxs").attr("checked");
						if(!isOrno){
							$(".xh_btn_res").off("click").addClass("disNone");
							$(".xh_btn_res").attr("disabled",true);
						}else{
							$(".xh_btn_res").on("click").removeClass("disNone");
							$(".xh_btn_res").attr("disabled",false);
							t.startRegister();
						}
				});
			},
			getYzm:function(){
				var t = this;
				$(".xh_getyzm").on("click",function(){
					var phoneNum = $(".xh_item1 input").val(),
						_this = $(this);
					 ajaxSend.sender(initPage.http+"c=User&a=mobileCode", {mobile:phoneNum}, "GET").done(function(data){
						if(data.status == 0){
							Change.changes(data);
						}else{
							Change.changes(data);
							t.timers(_this);
						}
					}); 
				});
			},
			timers:function(_this){
				var sec = 60;
				_this.html(sec +"s后重新发送");
				var  timer=setInterval(function(){
					sec--;
					if(sec > 0){
						_this.html(sec +"s后重新发送");
					}else{
						_this.html("获取验证码");
						clearInterval(timer);
					}
				},1000);
			}
		}
	}(a, jQuery);
	
	//登录
	a.Login = function(w, $){
		return {
			init:function(){
				var t = this;
				t.checkLogin();
				$(".xh_login").on("click",function(){
					var userName = $(".xh_item1 input").val(),
						pwd = $(".xh_item2 input").val();
						t.loginIn(userName, pwd);  
				});
			},
			callBack:function(userName, passWord){
				var t = this;
				if(userName != "" && passWord != ""){
					t.loginIn(userName, passWord);
					$(".logins").val(userName);
					$(".loginPwd").val(passWord);
				}
			},
			loginIn:function(userName, passWord){
				var t = this;
				ajaxSend.sender(initPage.http+"c=User&a=login", {name:userName,pass:passWord}, "GET").done(function(data){
					if(data.status == 0){
							Change.changes(data);							
					}else{
							native.callMain('saveUser',userName,passWord,0,0);
							t.loginSucce(data);
					}
				});
			},
			//前端正则验证
			checkLogin:function(){
				$(".listLogins input").blur(function(){
					var curVal = $(this).val();
					if(curVal == ""){
						if($(this).hasClass("logins")){
							$(".xh_tk").removeClass("hide").html("请输入手机号或用户名");
						}else{
							$(".xh_tk").removeClass("hide").html("请输入密码");
						}
					}
					HideDialog.hide();
				});	
			},
			loginSucce:function(data){
				Change.changes(data);
				setTimeout(function(){
					window.location.href="lianxi1.html";
				},initPage.hideTime);
			}
		}
	}(a, jQuery);
	
	//忘记密码
	a.ForgetPwd = function(W, $){
		return {
			init:function(){
				var t = this;
				t.getNew();
				t.forgetLogin();
			},
			getNew:function(){
				var t = this;
				$(".xh_getNew").on("click",function(){
					var _this = $(this);
					var phoneNum = $(".wjPwd").val();
					ajaxSend.sender(initPage.http+"c=User&a=send", {mobile:phoneNum}, "GET").done(function(data){
						if(data.status == 0){
							 Change.changes(data); 
						}else{
							Change.changes(data);
							t.timers1(_this);
						}
					}); 
				});
			},
			timers1:function(_this){
				var sec = 60;
				_this.html(sec +"s后重新发送");
				var timer2=setInterval(function(){
					sec--;
					if(sec > 0){
						_this.html(sec +"s后重新发送");
					}else{
						_this.html("获取新密码");
						clearInterval(timer2);
					}
				},1000);
			},
			forgetLogin:function(){
				 $(".xh_btn_logins").on("click",function(){
					var phoneNum = $(".wjPwd").val(),
						newPwd = $(".newPwd").val();
					ajaxSend.sender(initPage.http+"c=User&a=logNewPass", {mobile:phoneNum,pass:newPwd}, "GET").done(function(data){
						if(data.status == 0){
							 Change.changes(data); 
						}else{
							Login.loginSucce(data);
						}
					});
				});
			}
		}
	}(a, jQuery);
	
	//3000ms后弹框消失
	a.HideDialog = function(W, $){
		return {
			hide:function(){
				setTimeout(function(){
					$(".xh_tk").addClass("hide");
				},initPage.hideTime);
			}
		}
	}(a, jQuery);
	
	//存储数据
	a.Change = function(W, $){
		return {
			changes:function(data){
			var str = JSON.stringify(data); 
			//存入 
			sessionStorage.obj = str; 
			$(".xh_tk").removeClass("hide").html(data.message);
			HideDialog.hide();
			}
		}
	}(a, jQuery);
})(window);

initPage.init();