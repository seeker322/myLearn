(function(a) {
    var cumn = 0;
	var timers,curTime,
		auto, //是否自动跳到下一题
		unfloadjx , //是否展开解析
		answer, //选择答案
		style,
		path1,
		indes,
		newStr,
		dataArr,
		paperId,
		userId,
		smallId,
		curSort;
	window.flag = false;
    a.InitPage = function(w, $) {
        return {
			http:"http://s.tiandaoedu.cn/exam/index.php?m=App&",
            init: function() {
				CreateQuestions.init(function () {
					Start.init();
					Collect.init();
					MakeNotes.init();
					Setting.init();
					//ZuoSelect.init();
					Analyze.checkFn();
					_global.initSetting();
				});
				$(".arrowQue").on("click",function(){
					/* $(".mc1, .confirm1").removeClass("hide");
					$(".cancelsNo, .cancelsNo").on("click",function(){
						$(".mc1, .confirm1").addClass("hide");
					}); */
					var backDataObj = sessionStorage.backDatas,
						spanId,sourceId;
					 if(backDataObj != "null"){
						spanId = JSON.parse(backDataObj).indss;
						sourceId = JSON.parse(backDataObj).sourceId;
						window.location.href="lianxi2.html?" + spanId + "," + sourceId;
						sessionStorage.backDatas = "null";
					}else{
						document.referrer=="userCollectionHome.html"?location.href="userCollectionHome.html":history.go(-1);
						sessionStorage.removeItem("backDatas");
					} 
					
				});
            }
        }
    }(a, jQuery);

    var LS = {
       /**
        * localStorage保存数据
        * @param String key  保存数据的key值
        * @param String value  保存的数据
        */
       set: function(key, json) {
           window.localStorage.setItem(key, JSON.stringify(json));
       },
       /**
        * 根据key取localStorage的值
        * @param Stirng key 保存的key值
        */
       get: function(key) {
           var str = window.localStorage.getItem(key);
           if (str != null && str != ""){
               return JSON.parse(str);
           } else {
               return false;
           }
       },
       /**
        * 清除缓存
        * @param Striong key  保存数据的key，如果不传清空所有缓存数据
        */
       clear: function(key) {
           if (key){
               window.localStorage.remove(key);
           } else {
               window.localStorage.clear();
           }
       }
    }, Utils = {
        _debug: false, // 调试模式
        _constant: {
            setting: 'setting',
        },
        _setting: {
            isAutoGo: 1,               // 是否自动跳到下一页
            isShowAnalyze: 1,         // 是否自动展开解析
           /*  isOpenSound: 0,       */   // 是否开启声音
            isSwitchNight: 0,      // 是否切换到夜间模式
            fontSize: 2               // 1:small, 2:normal, 3:big
        },
        /**
         * [hideAlert 隐藏弹出层]
         * @param  {[type]} domJQ [description]
         * @return {[type]}       [description]
         */
        hideAlert: function (domJQ) {
            $(".setNotes,.mc").addClass("hide");
			$("body").css("overflow-y","auto");
            domJQ.parents(".jx").addClass("hide");
        },
    }, _global = {
        init: function (_win) {
            var t = this;
            t.bindWin(_win);
            t.initSetting();
        },
        bindWin: function (_win) {
            var key;
            for(key in Utils){
                _win[key] = Utils[key];
            }
        },
        /**
         * [initSetting 缓存默认设置到localStorage]
         * @return {[type]} [description]
         */
        initSetting: function () {
            var cacheSetting = LS.get('setting'),
                key;
            if(!cacheSetting){ // default setting
                LS.set(_constant.setting, _setting);    
            }else{
                // 同步缓存设置到全局变量中
                if (cacheSetting.isAutoGo) {
                    $("span.yOrn1").addClass('on');
                    $("span.yOrn1").children().removeClass('fl').addClass('fr on')
                } else {
                    $("span.yOrn1").removeClass('on');
                    $("span.yOrn1").children().removeClass('fr on').addClass('fl')
                }
                if (cacheSetting.isShowAnalyze) {
                    $("span.yOrn2").addClass('on');
                    $("span.yOrn2").children().removeClass('fl').addClass('fr on')
                } else {
                    $("span.yOrn2").removeClass('on');
                    $("span.yOrn2").children().removeClass('fr on').addClass('fl')
                }
                 /* if (cacheSetting.isOpenSound) {
                    $("span.yOrn3").addClass('on');
                    $("span.yOrn3").children().removeClass('fl').addClass('fr on')
                } else {
                    $("span.yOrn3").removeClass('on');
                    $("span.yOrn3").children().removeClass('fr on').addClass('fl')
                } */
                if (cacheSetting.isSwitchNight) {
                    $("span.yOrn4").addClass('on');
                    $("span.yOrn4").children().removeClass('fl').addClass('fr on');
					$("section, body").addClass("yj");
                } else {
                    $("span.yOrn4").removeClass('on');
                    $("span.yOrn4").children().removeClass('fr on').addClass('fl');
                }
                switch(cacheSetting.fontSize){
                    case 0:$(".span_3 em:eq(0)").addClass('on').siblings().removeClass("on");
							$("section").addClass("zihao1").removeClass("zihao2 zihao3");
							
                        break;
                    case 1:$(".span_3 em:eq(1)").addClass('on').siblings().removeClass("on");
							$("section").addClass("zihao2").removeClass("zihao1 zihao3");
                        break;
                    case 2:$(".span_3 em:eq(2)").addClass('on').siblings().removeClass("on");
							$("section").addClass("zihao3").removeClass("zihao1 zihao2");
                        break;
                }
            }
        }
    };

    // bind the public method(Utils) to the window
    (function(a) {
        _global.init(a);
    })(a);

	a.CreateQuestions = function(w, $){
        return {
            init: function (callback) {
                var t = this,
                    section = ''
                t.getData(function (data) {
                    $.each(data, function (index, item) {
                        switch (parseInt(item.problem_type_id)) {
                            case 1: // 选择题
                                section += t.getChooseQuestionView(item);
                                break;
                            default:
                                section += t.getReadQuestionView(item);
                        }
                    });
                    $(".swiper-wrapper").prepend(section);
                    callback && callback.call(null);
                }, function () {
                    console.error('something get wrong');
                });
            },
			initEvent: function (_that) {
                var t = this;
                t.bindUpDownEvent(_that);  
            },
            /**
             * [bindUpDownEvent 上下变动的事件]
             * @return {[type]} [description]
             */
             bindUpDownEvent: function (_that) {
                // TODO:中间的条,动态改变.read_ques .pd30的max-height
                var listenJQ = $('.xh_hui'),
                    changeJQ = $('.read_ques>.pd30'),
                    startX = 0,
                    startY = 0,
                    offsetX = 0,
                    offsetY = 0,
                    baseHeight = 0,
                    top = 0;// = changeJQ.css('max-height').replace('px', '');
                var screenH = window.screen.height,
					changeJQH = parseInt(changeJQ.css('height'));
                changeJQ.css('height', parseInt(changeJQ.css('height'))+110);
                listenJQ.on('touchstart', function (event) {
                    baseHeight = changeJQ.css('height').replace('px', '');
                    startX = event.originalEvent.targetTouches[0].pageX;
                    startY = event.originalEvent.targetTouches[0].pageY;
                }).on('touchmove', function (event) {
                    event.preventDefault();
                    offsetX = event.originalEvent.targetTouches[0].pageX - startX;
                    offsetY = event.originalEvent.targetTouches[0].pageY - startY;
                  setTimeout(function () {
                        changeJQ.css('height', (parseInt(baseHeight) + parseInt(offsetY)) + 'px');
						_that.find(".questions").css({"height":(screenH - (parseInt(baseHeight) + parseInt(offsetY))) + "px","overflow":"hidden","overflow-y":"scroll"});
						if(parseInt(changeJQ.css("height")) >= (screenH - 200)){
							changeJQ.css("height",(screenH - 200) + "px");
							_that.find(".questions").css({"height":200 + "px","overflow":"hidden","overflow-y":"scroll"});
						}
						if(parseInt(changeJQ.css("height")) <= 60){
							changeJQ.css("height",60 + "px");
							_that.find(".questions").css({"height":(screenH - (parseInt(baseHeight) + parseInt(offsetY))) + "px","overflow":"hidden","overflow-y":"scroll"});
						}
                    }, 10)
                }).on('touchend', function (event) {
                    startX = event.originalEvent.changedTouches[0].pageX;
                    startY = event.originalEvent.changedTouches[0].pageY;
                });
            },
			setQuestionsHeight:function(){
				var arr2 = [];
				$(".questions").each(function(){
					var curH = $(this).height();
					arr2.push(curH);
				});
				var maxH = Math.max.apply(null, arr2);
				$(".xh_choise1, .questions").height(maxH);
			},
            getData: function (callback, errorCallback) {
                var datas;
                if(w._debug){
                    $.get(InitPage.http+'c=Problem&a=detail', function (data) {
                        if(data.status == '1'){
							$(".count").text(data.value.total);
                            callback && callback.call(null, data.value.result);
                        }else{
                            errorCallback && errorCallback.call(null);
                        }
                    });
                }else{
					var storage = JSON.parse(sessionStorage.obj1);
                    if(storage.status == '1'){
						$(".count").text(storage.value.total);
                        callback && callback.call(null, storage.value.result);
                    }else{
                        errorCallback && errorCallback.call(null);
                    }
                }
            },
            getAnswersHtml: function (answers) {
                var dl="";
				for(var key in answers){
					dl += '<dl><dt>' + key + '</dt><dd>' + this.handleUEditorContent(answers[key]) + '</dd></dl>';
				}
                return dl;
            },
			
            getChooseQuestionView: function (chooseData) {
                var answersHtml = this.getAnswersHtml(chooseData.smalls[0].answer);
				var  dd = this.handleUEditorContent(chooseData.smalls[0].stem);
                var html =  '<section class="xhQues section2 swiper-slide" iscollection="' + chooseData.smalls[0].is_collection + '" data-id="' + chooseData.big_id + '" sort="' + chooseData.smalls[0].sort_correct + '">\
            				<div class="choice_ques">\
							<div class="queBoxs" data-smallId="' + chooseData.smalls[0].small_id + '">\
                            ' + dd + '\
            				</div><div class="xh_choise">\
            				' + answersHtml + '\
            				</div>\
            				</div>\
            				</section>';
                return html;
            },
			//转译数据里面的图片
			handleUEditorContent: function (content) {
				content = this.decode(content);
				return content.replace(/\Public\/kindeditor\/attached\/image/g, 'http://s.tiandaoedu.cn/exam/Public/kindeditor/attached/image');
			},
			decode: function(str){
				var s = '';
                if (str.length == 0) return '';
                s = str.replace(/&amp;/g, '&');
                s = s.replace(/&lt;/g, '<');
                s = s.replace(/&gt;/g, '>');
                s = s.replace(/&nbsp;/g, ' ');
                s = s.replace(/'/g, '\'');
                s = s.replace(/&quot;/g, '\"');
                s = s.replace(/<br>/g, '\n');
                s = s.replace(/&#39;/g, "\'");
                return s;
			},
			getReadAtricle:function(readData){
				var p = "";
                var t=this;
				$.each(readData, function(i, obj){
					p += '<p data-sort="' + obj.sort + '">' + t.handleUEditorContent(obj.content) + '</p>';
				});
				return p;
			},
			getQuestionHtml:function(questionsArr){
				var question = "",
					t = this;
					arr1 =["一","二","三","四","五","六","七","八","九","十",];
				$.each(questionsArr, function(i, obj){
					var questionChoice = t.getAnswersHtml(obj.answer);
					question += '<div class="questions swiper-slides" sort="' + obj.sort_correct + '" iscollection="' + obj.is_collection + '"><h4>问题' +arr1[i]+ '</h4><div class="mb30 quesTit" data-smallId="' + obj.small_id + '">' + obj.stem + '</div><div class="xh_choise">' + questionChoice + '</div></div>';
				});
				return question;
			},
			queSpanDot:function(questionsArr){
				var span='';
				$.each(questionsArr, function(i, obj){
					span += '<span></span>';
				});
				return span;
			},
            getReadQuestionView: function (readData) {
				var articles = this.getReadAtricle(readData.articles),
					questionHtml = this.getQuestionHtml(readData.smalls),
					queSpanDots = this.queSpanDot(readData.smalls);
                var html = '<section class="xhQues section1 swiper-slide" data-id="' + readData.big_id + '"types="2">\
        				<div class="read_ques ">\
        				<div class="pd30">\
        				<h4>阅读原文</h4>\
        				' + articles + '\
        				</div>\
        				<div class="xh_choise1 swiper-container-hh">\
        				<em class="xh_hui"></em>\
        				<div class="swiper-wrapper quesBoxss">\
        				' + questionHtml + '\
        				</div>\
						 <div class="swiper-pagination swiper-pagination-hh">' + queSpanDots + '</div>\
        				</div>\
        				</div>\
        				</section>';	
				return html;
            }
        }
	}(a, jQuery);
	
	 //开始答题
    a.Start = function(w, $) {
        return {
            init: function() {
                var t = this;
                t.choose();
				t.hitReadDots();
                Timing.seconds();
				t.setTimer();
            },
			setTimer:function(){
				curTime = 0;
				timers =setInterval(function(){
					curTime++;
				},1000);
			},
            choose: function() {
                var t = this,
                    answers = "";
				var http = window.location.search,
					isAnum = http.indexOf("?"),
					isB = http.substr(isAnum+1);
				if(isB == "b"){   //从错题练习进来
					paperId = '';
				}else{
					var https = window.location.hash,  //含有#从套题诊断的练习进来的
						isAnums = https.indexOf("#"),
						isA = https.substr(isAnums+1);
					if(https){
						paperId = isA;
					}else if(isB == "c"){ //我的收藏里
						//
					}else{
						paperId = JSON.parse(sessionStorage.paperId);
					}
				}
                $(".xhQues dl").off().on("click",function() {
                    auto = JSON.parse(localStorage.setting).isAutoGo; //是否自动跳到下一题
					unfloadjx =JSON.parse(localStorage.setting).isShowAnalyze; //是否展开解析
					answer = $(this).find("dt").text(); //选择答案
					style = $(this).parents("section").attr("types"); //题型
					$(".confirm em").text(answer);
                    $(".mc, .confirm").removeClass("hide");
                    t.Conform($(this), answer, style, auto, unfloadjx, style);
                });
                $(".cancels").off().on("click", function() {
                    $(".mc, .confirm").addClass("hide");
                });
            },
            Conform: function(_this, answer, style, auto, unfloadjx) {
                var t = this;
                $(".confirms").off().on("click", function() {
					clearInterval(timers);
                    var answer = _this.find("dt").text(); //选择答案
						userId = JSON.parse(sessionStorage.obj).value.user_id;
						smallId;
					//判断是第一练习还是从其他处跳进来的练习
					var http = window.location.search,
						isAnum = http.indexOf("?"),
						isA = http.substr(isAnum+1);
						 if (auto == 0) { //不自动跳到下一题
								_this.parents("section").removeClass("swiper-no-swiping");
								$(".list1 span").off("click");
							} else {
								// _this.parents("section").addClass("swiper-no-swiping");
								 $(".list1 span",$(".swiper-container1")).on("click");
							}
							if(style == 2){  //阅读题的小题id
								smallId = _this.parent().prev().data("smallid");
								//t.readRightAnswer(_this);
								t.getChoiceAnswers(style, _this, userId, paperId, answer, smallId, curTime,isA);
							}else{
								smallId = _this.parent().prev().data("smallid");
								t.getChoiceAnswers(style, _this, userId, paperId, answer, smallId, curTime,isA);
							}
							$(".mc, .confirm ").addClass("hide");
                });
            },
			readRightAnswer:function(_this){
				var index = _this.parents(".questions").index(),
					hhh = _this.parents(".questions").height(),
					hh = _this.parents(".xh_choise1").find(".questions").eq(index + 1).height(),
					arr3 = [],maxH;
					arr3.push(hhh);
					arr3.push(hh);
					maxH = Math.max.apply(null, arr3);
					minH = Math.min.apply(null, arr3);
					if(minH >= hhh || minH <= hhh){
						minH = hhh;
					}
					_this.parents(".xh_choise1").height(minH);
					_this.parents(".swiper-wrapperss").height(minH);
					 _this.parents(".xh_choise1").find(".questions").eq(index + 1).height(maxH); 
			},
			getChoiceAnswers:function(style, _this, userId, paperId, answer, smallId, time, isA){
				var t = this;
				var https = window.location.hash,  //含有#从套题诊断的练习进来的
					isAnums = https.indexOf("#");
				if(isA == "a" || (isAnums != (-1))){  //正常进入练习进来
					$.get(InitPage.http+'c=UserSmall&a=answer',{"userId":userId,"paperId":paperId,"answer":answer,"smallId":smallId,"time":time}, function (data) {
						if(data.status == "1"){
							if(data.value.is_correct == "1"){ //答对
								if(style == 2){ //read
									t.slideQuestion(_this);
									if(_this.parents(".questions").index() == _this.parents("section").find(".questions").length - 1 && $(".curItem i").text() == $(".count").text()){
									}else if(_this.parents(".questions").index() == _this.parents("section").find(".questions").length - 1 && $(".curItem i").text() != $(".count").text()){
										$(".list1 span").eq(_this.parents("section").index()+1).trigger("click");
									}
								}else{
									_this.addClass("right");
									_this.find("dt").text("");
									t.Slide(_this, 1);
									_this.parents("section").removeClass("swiper-no-swiping");
								}
							}else{
								if(style == 2){ //read
									var jxHtml = t.getAnalysisHtml(data.value);
									_this.parents(".questions").append(jxHtml);
									t.ChooseFalse(_this, 2, unfloadjx, data.value.dataAnswer);
									if(_this.parents(".questions").index() != _this.parents("section").find(".questions").length - 1){
										_this.parents("section").addClass("swiper-no-swiping");
									}else if(_this.parents(".questions").index() == _this.parents("section").find(".questions").length - 1){
										_this.parents("section").removeClass("swiper-no-swiping");
									}
								}else{
									var jxHtml = t.getAnalysisHtml(data.value);
									_this.parents("section").append(jxHtml);
									t.ChooseFalse(_this, 1, unfloadjx, data.value.dataAnswer); 
									t.Slide(_this, 2);
									_this.parents("section").removeClass("swiper-no-swiping");
								}
								
							}

							if($(".curItem i").text() == $(".count").text()){
								var http = window.location.search,
									isAnum = http.indexOf("?"),
									isB = http.substr(isAnum+1);
								if(isB == "c"){
									$("body").find(".h80").remove();
									$("body").find(".next").remove();
								}else{
									t.addTaoTi();
									t.CheckReport();
								}
								
							}
							//选过之后禁止选其他选项
							_this.off("click");
							_this.parent().find("dl").off("click");
						}else if(data.status == "0"){ //未按顺序做题
							alert(data.message);
							//_this.parents("section").removeClass("swiper-no-swiping");
							if(style == 2){
								_this.parents(".questions").find("dl").on("click");
							}else{
								_this.parents("section").find("dl").on("click");
							}
							
						}     
					});
				}else{
					$.get(InitPage.http+'c=UserSmall&a=answer',{"userId":userId,"answer":answer,"smallId":smallId,"time":time}, function (data) {
						 if(data.status == "1"){
							if(data.value.is_correct == "1"){ //答对
								if(style == 2){ //read
									t.slideQuestion(_this);
									if((_this.parents(".questions").index() == _this.parents("section").find(".questions").length - 1) && ($(".curItem i").text() != $(".count").text())){
										$(".list1 span").eq(_this.parents("section").index()+1).trigger("click");	
									}
								}else{
									_this.addClass("right");
									_this.find("dt").text("");
									t.Slide(_this, 1);
								}
							}else{
								if(style == 2){ //read
									var jxHtml = t.getAnalysisHtml(data.value);
									_this.parents(".questions").append(jxHtml);
									t.ChooseFalse(_this, 2, unfloadjx, data.value.dataAnswer);
								}else{
									var jxHtml = t.getAnalysisHtml(data.value);
									_this.parents("section").append(jxHtml);
									t.ChooseFalse(_this, 1, unfloadjx, data.value.dataAnswer); 
									t.Slide(_this, 2);
								}
								
							}
							//选过之后禁止选其他选项
							_this.off("click");
							_this.parent().find("dl").off("click");
							_this.parents("section").removeClass("swiper-no-swiping");
						}else if(data.status == "0"){ //未按顺序做题
							alert(data.message);
							_this.parents("section").removeClass("swiper-no-swiping");
							if(style == 2){
								_this.parents(".questions").find("dl").on("click");
							}else{
								_this.parents("section").find("dl").on("click");
							}
						}     
					});
					$("body").find(".h80").remove();
					$("body").find(".next").remove();
				}
				
			},
			addTaoTi:function(){
				var next;
				if($(".curItem i").text() == $(".count").text()){
					next ='<div style="height:0.8rem;" class="h80"></div><p class="next"><a href="javascript:;" class="checkReport">查看套题报告</a></p>';
					$("body").append(next);
				}else{
					$("body").find(".h80").remove();
					$("body").find(".next").remove();
				}
			},
			slideQuestion:function(_this){
				var t = this;
					_this.addClass("right");
					_this.find("dt").text("");
					var index = _this.parents(".questions").index(),
						lens = _this.parents(".xh_choise1").find(".questions").length;
					if ((index + 1) == lens && cumn == 0) { //阅读最后一题时候，下一题进来 
						 t.Slide(_this, 1, 2);
						 cumn = 1;
					}
			},
			getAnalysisHtml:function(analysis){
				var jiexiHtml = '<div class="jx jxBox hide">\
					<div class="topBox">\
					<h4><i>×</i> <em class="red">' + analysis.answer + '</em> / <em>' + analysis.dataAnswer + '</em>我做过<i>' + analysis.finish_num + '</i>次，答对<i>' + analysis.correct_num + '</i>次，答错<i>' + analysis.error_num + '</i>次</h4>\
					<table class="quesTab">\
					<tr>\
					<td>用时</td>\
					<td>考查点</td>\
					<td>难度</td>\
					</tr>\
					<tr>\
					<td>' + analysis.last_time + '秒</td>\
					<td>' + analysis.abilities + '</td>\
					<td>' + analysis.difficulty + '</td>\
					</tr>\
					</table>\
					<h4 class="tmjx">题目解析：</h4>\
					<ul class="jxList">\
					<li>' + analysis.analysis + '</li>\
					</ul>\
					</div>\
					<p class="next hide"><a href="javascript:;">下一题</a></p>\
					</div>';
				return jiexiHtml;
			},
            ChooseFalse: function(_this, style, unfloadjx, answer) {
				var t = this;
                var dls = _this.parents(".xh_choise").find("dl");
                $.each(dls, function(ii, objs) {
                    if (answer == $(objs).find("dt").text()) {
                        $(this).addClass("right");
						$(this).find("dt").text("");
                        _this.addClass("wrong");
                        _this.find("dt").text("");
                    }
                });
                _this.off("click");
                _this.parent().find("dl").off("click");
                if (unfloadjx == 0) { //未开
                    _this.parents("section").find(".jxBox").addClass("hide");
					_this.parents("section").removeClass("swiper-no-swiping");
                } else {
                    _this.parents("section").find(".jxBox").removeClass("hide");
                }
				
				t.nextQuestions(_this, style);
				t.isFormLianxi(_this);
            },
			nextQuestions:function(_this, style){
				var t = this;
				_this.parents("section").find(".next").off().on("click", function() {
                    var curIndex,isLast,
					curSort = t.showSmallNum(_this);
					if(style == 2){ //read
						curIndex = _this.parents(".questions").index();
						isLast = _this.parents("section").find(".questions").length-1;
                        if (curIndex != isLast) { //不是最后一题
                            if(sessionStorage.stateObj && (JSON.parse(sessionStorage.stateObj) == 3)){  //不是解析
								_this.parents("section").find(".jxBox").removeClass("hide");
							}else{
								_this.parents("section").find(".jxBox").addClass("hide");
							}
                        } else {
							t.Slide(_this, 2, 2);
                        }
						if($(".curItem i").text() != $(".count").text()){  //阅读题最后一题但不是套题最后一题
							$(".list1 span").eq(_this.parents("section").index()+1).trigger("click");
						}
					}else{
						curIndex =  _this.parents("section").index(),
						isLast = _this.parents(".ques").find("section").length-1;
						if(curIndex == isLast){ //最后一题
							$(".list1 span").off("click");
							$(".curItem i").html(curSort);
							t.theLast(_this);
							t.CheckReport();
						}else{
							$(".curItem i").html(curSort+1);
							$(".list1 span").eq(curIndex + 1).trigger("click");
						}
					}
                });
			},
			//阅读题里面的小点
			hitReadDots:function(){
				var t = this;
				$(".swiper-pagination-hh span").on("click", function(){
					var _this = $(this),
						_that = _this.parents("section");
					var index = $(this).index(),
						leftW = $(this).parents(".swiper-container-hh").outerWidth(true);
					_this.addClass("cur").siblings().removeClass("cur");
					$(".curItem i").text(_this.parents(".swiper-container-hh").find(".questions").eq(index).attr("sort"));
					_this.parents(".swiper-container-hh").find(".quesBoxss").animate({"left":-(index*leftW) + "px"},200,function(){
						if(_this.parents(".swiper-container-hh").find(".questions").eq(index).attr("iscollection") == 1){
							$(".xh_xx").addClass("on");
							window.flag = true;
						}else{
							$(".xh_xx").removeClass("on");
							window.flag = false;
						}
					});
					var http = window.location.search,
						isAnum = http.indexOf("?"),
						isB = http.substr(isAnum+1);
					if(isB == "c"){
						$("body").find(".h80").remove();
						$("body").find(".next").remove();
					}else{
						t.addTaoTi();
						t.CheckReport();
					}
					
				});
			},
			theLast:function(_this){
				var t = this;
				t.isFormLianxi(_this);
			},
			isFormLianxi:function(_this){
				var lianxiStateNum = JSON.parse(sessionStorage.stateObj),
					http = window.location.search,
					isAnum = http.indexOf("?"),
					isA = http.substr(isAnum+1);
				if(lianxiStateNum == 1 && http.indexOf("#") != 0){ //非套题练习
					if(_this.parents("section").attr("types") == 2){
							if(_this.parents(".questions").index() != _this.parents("section").find(".questions").length-1){
								_this.parents(".questions").find(".next").remove();
							}
					}
				}
				if(isA != "a" && lianxiStateNum == 1 && $(".curItem i").text() == $(".count").text()){
					var http = window.location.hash;
					if(http.indexOf("#") == 0){  //套题练习
						Start.CheckReport();
					}else{
						if(_this.parents("section").attr("types") == 2){  //read
							if(_this.parents(".questions").index() == _this.parents("section").find(".questions").length - 1){
								_this.parents("section").find(".next").remove();		
							}
						}else{
							_this.parents("section").find(".next").remove();
						}
					}
				}
			},
			fromCollect:function(_this){
				var http = window.location.search,
					isAnum = http.indexOf("?"),
					isC = http.substr(isAnum+1);
				if($(".curItem i").text() == $(".count").text() && unfloadjx == 0 && isC== "c"){   //从我的收藏跳过来不展开解析并且是最后一题
					_this.parents("section").find(".jxBox").addClass("hide");
					_this.parents("section").find(".next").remove();
				}else if($(".curItem i").text() == $(".count").text() && unfloadjx == 1 && isC== "c"){   //从我的收藏跳过来展开解析并且是最后一题
					_this.parents("section").find(".next").remove();
				}
			},
			Slide:function(_this, num, style){
				var t = this;
				var curIndex = _this.parents("section").index(),
					curSort = t.showSmallNum(_this),
					isLast;
					if(style == 2){
						isLast = _this.parents(".ques").find(".questions").length-1;
					}else{
						isLast = _this.parents(".ques").find("section").length-1;
					}
				if(num == 1){ //答对时
					if(curIndex == isLast){ //最后一题
						$(".list1 span").off("click");
						$(".curItem i").html(curSort);
						/* t.addTaoTi(); 
						t.CheckReport();*/
					}else{
						if(JSON.parse(localStorage.setting).isAutoGo == 0){
							$(".list1 span").off("click");
							_this.parents("section").removeClass("swiper-no-swiping");
							$(".curItem i").html(curSort);
						}else{
							$(".list1 span").on("click");
							if(style == 2){
								_this.parents("section").removeClass("swiper-no-swiping");
							}else{
								_this.parents("section").addClass("swiper-no-swiping");
							}
							setTimeout(function(){    //答题正确时延迟150ms进入下一题
								$(".list1 span").eq(curIndex + 1).trigger("click");
								curSort = t.showSmallNum($("section").eq(curIndex + 1).find("dl:first"));
								$(".curItem i").html(curSort);
							},150);
						}
						
					}	
					t.isFormLianxi(_this);
				}else{
					if(curIndex == isLast){ //最后一题
						$(".curItem i").html(curSort);
						var https = window.location.hash,  //含有#从套题诊断的练习进来的
							isIn = https.indexOf("#");
						 if(unfloadjx == 0){

						}else{
							_this.parents("section").find("> .next").remove();
						}
						t.CheckReport();
					}else{
						$(".curItem i").html(curSort);
					}
					$(".list1 span").off("click");
					t.isFormLianxi(_this);
				}
				t.setTimer();
				t.fromCollect(_this);
			},
			//每个题号都按照小题来显示
			showSmallNum:function(_this){
				var style = _this.parents("section").attr("types"),
					curNums;
				if(style == 2){
					_this.parents("section").find(".swiper-pagination-hh span").each(function(){
						var _this = $(this);
						if(_this.hasClass("cur")){
							var index = _this.index();
								curNums = _this.parents("section").find(".questions").eq(index).attr("sort");
						}
					});
				}else{
					curNums = _this.parents("section").attr("sort");	
				}
				return curNums;
			},	
			CheckReport:function(){
				$(document).on("click", ".checkReport", function(){
					var http = window.location.search,
						isAnum = http.indexOf("?"),
						isB = http.substr(isAnum+1);
					if(isB == "b"){   //从错题练习进来
						paperId = '';
					}else{
						var https = window.location.hash,  //含有#从套题诊断的练习进来的
							isAnums = https.indexOf("#"),
							isA = https.substr(isAnums+1);
						if(https){
							paperId = isA;
						}else{
							paperId = JSON.parse(sessionStorage.paperId);
						}
					};
					userId = JSON.parse(sessionStorage.obj).value.user_id;
					 $.get(InitPage.http+"c=UserSmall&a=analysis",{"user_id":userId,"paper_id":paperId},function(data){
						if(data.status == "1"){
							var str = JSON.stringify(data); 
							//存入 
							sessionStorage.report = str; 
							sessionStorage.paperId = paperId; 
							window.location.href="report.html";
						}
					}); 
				});
			}
        }
    }(a, jQuery);
    a.Timing = function(a, $) {
        return {
            seconds: function() {
                var t = this;
                var time = 0;
                setInterval(function() {
                    time++;
                    var timeCount = t.formatSeconds(time);
                    if (timeCount[0] >= JSON.parse(sessionStorage.obj1).value.minute) {
                        $(".linkTime").css("color", "#f00");
                    }
                    $(".linkTime span").text(timeCount[1]);
                }, 1000);
            },
            formatSeconds: function(value) {
                var theTime = parseInt(value), // 秒
                    theTime1 = 0, // 分
                    arr = [];
                if (theTime > 60) {
                    theTime1 = parseInt(theTime / 60);
                    theTime = parseInt(theTime % 60);
                    if (theTime1 > 60) {
                        theTime1 = parseInt(theTime1 % 60);
                    }
                }
                if (theTime < 10) {
                    var result = "0" + parseInt(theTime); //秒
                } else {
                    var result = "" + parseInt(theTime); //秒
                }

                if (theTime1 >= 0 && theTime1 < 10) {
                    result = "0" + parseInt(theTime1) + ":" + result; //分 秒
                } else {
                    result = "" + parseInt(theTime1) + ":" + result; //分 秒
                }
                arr[0] = theTime1;
                arr[1] = result;
                return arr;
            }
        }
    }(a, jQuery);
	
	/* 点击解析，查看套题解析， 套题诊断下的查看 */
	a. Analyze = function(a, $) {
        return {
			checkFn:function(){
				var t = this;
				if(sessionStorage.stateObj){
					var stateNum = JSON.parse(sessionStorage.stateObj);
					 if(stateNum == 3){
						 t.ifAnalyze();
					 }
				}
			},
           ifAnalyze:function(){
			   var jxData = JSON.parse(sessionStorage.obj1).value.result;
				var _that = $("section"),
					jxHtml,rightAnswer,myChoiseAnswer;
				_that.find("dl").off("click");
				$.each(jxData, function(i, obj){
					if(obj.problem_type_id == 2){
						$.each(obj.smalls, function(ii, objs){
							jxHtml = Start.getAnalysisHtml(obj.smalls[ii].analysis);
							rightAnswer = obj.smalls[ii].analysis.dataAnswer;
							myChoiseAnswer = obj.smalls[ii].analysis.answer;
							_that.eq(i-1).find(".questions").eq(ii).append(jxHtml);
							if(_that.eq(i-1).find(".questions").eq(ii).index() != _that.eq(i-1).find(".questions").length-1){
								_that.eq(i-1).find(".questions").eq(ii).find(".next").remove();
							}else if(objs.sort_correct == $(".count").text()){
								Start.addTaoTi();
								Start.CheckReport();
							}
							_that.eq(i-1).find(".questions .jxBox").removeClass("hide");
						});
					}else{
						jxHtml = Start.getAnalysisHtml(obj.smalls[0].analysis);
						rightAnswer = obj.smalls[0].analysis.dataAnswer;
						myChoiseAnswer = obj.smalls[0].analysis.answer;
						_that.eq(i-1).append(jxHtml);
					}
					_that.eq(i-1).find(".jxBox").removeClass("hide");
					if(_that.eq(i-1).attr("sort") == $(".count").text()){
						Start.addTaoTi();
						Start.CheckReport();
					}
					/* 对应答案 */
					if(myChoiseAnswer == rightAnswer){  //答对
						_that.eq(i-1).find("dl").each(function(){
							var _thisText = $(this).find("dt").text();
							if(_thisText == myChoiseAnswer){
								$(this).addClass("right");
								$(this).find("dt").text("");
							}
						});
					}else{
						_that.eq(i-1).find("dl").each(function(){
							var _thisText = $(this).find("dt").text();
							if(_thisText == myChoiseAnswer){
								$(this).addClass("wrong");
								$(this).find("dt").text("");
							}
							if(_thisText == rightAnswer){
								$(this).addClass("right");
								$(this).find("dt").text("");
							}
						});
					}
					var curThis = _that.eq(i-1).find("dl:first"),
						style = _that.eq(i-1).attr("types");
					Start.nextQuestions(curThis, style);
				});					
				_that.removeClass("swiper-no-swiping");
		   }
        }
    }(a, jQuery);
	
    //收藏
    a.Collect = function(w, $) {
        return {
            init: function() {
				var t = this;
				t.isCollect();
				t.collectQuestion();
            },
			collectQuestion:function(){
				var t = this;
				 $(".xh_xx").off().on("click", function() {
					 var userId = JSON.parse(sessionStorage.obj).value.user_id,
						 smallId,
						 _this = $(this);
					if(_this.hasClass("on")){
						window.flag = true;
					}else{
						window.flag = false;
					}
				$("section").each(function(){
					var _that = $(this);
					if(_that.hasClass("swiper-slide-active")){
						if(_that.attr("types") == "2"){
							_that.find(".swiper-pagination-hh span").each(function(){
								var _this = $(this);
								if(_this.hasClass("cur")){
									var index = _this.index();
									smallId = _that.find(".questions").eq(index).find(".quesTit").data("smallid");
								}
							});
						}else{
							smallId =_that.find(".queBoxs").data("smallid");
						}
					}
				});
				if (!window.flag) { //收藏
					$.get(InitPage.http+"c=UserSmall&a=collection",{"userId":userId,"smallId":smallId},function(data){
						if(data.status == "1"){
							t.collectView(_this, data);
						}
					}).done(function(){
						$("section").each(function(){
							var that = $(this);
							if(that.hasClass("swiper-slide-active")){
								if(that.attr("types") == 2){
									that.find(".swiper-pagination-hh span").each(function(){
										var _this = $(this);
										if(_this.hasClass("cur")){
											var index = _this.index();
											that.find(".questions").eq(index).attr("iscollection",1);
										}
									});
								}else{
									iscollection = that.attr("iscollection",1);
								}
							}
						}); 
					});
				}else{
					$.get(InitPage.http+"c=UserSmall&a=cancel",{"userId":userId,"smallId":smallId},function(data){
						if(data.status  == "1"){
							t.cancelCollectView(_this, data);
						} 
                    }).done(function(){
						$("section").each(function(){
							var that = $(this);
							if(that.hasClass("swiper-slide-active")){
								if(that.attr("types") == 2){
									that.find(".swiper-pagination-hh span").each(function(){
										var _this = $(this);
										if(_this.hasClass("cur")){
											var index = _this.index();
											that.find(".questions").eq(index).attr("iscollection",0);
										}
									});
								}else{
									iscollection = that.attr("iscollection",0);
								}
							}
						});
					});
				} 						
			 });
			},
			collectView:function(_this, data){
                var t = this;
				_this.addClass("on");
				$(".xh_tk").removeClass("hide");
				$(".fOrt").removeClass("wrong");
				$(".xh_text2").html(data.message);
				window.flag = true;
				setTimeout(function() {
					$(".xh_tk").addClass("hide");
				}, 1000);
			},
			cancelCollectView:function(_this, data){
                var t = this;
				_this.removeClass("on");
				$(".xh_tk").removeClass("hide");
				$(".fOrt").addClass("wrong");
				$(".xh_text2").html(data.message);
				window.flag = false;
				setTimeout(function() {
					$(".xh_tk").addClass("hide");
				}, 1000);
			},
			isCollect:function(){
                var t=this;
				var swiper = new Swiper('.swiper-container1',{
					pagination: '.swiper-pagination-h',
					paginationClickable: true,
					spaceBetween: 30
				});
				$("section").each(function(){
					var _that = $(this);
					if(_that.attr("types") == 2){
						CreateQuestions.initEvent(_that);  //拖动
						_that.find(".swiper-pagination-hh span:first").addClass("cur").siblings().removeClass("cur");
					}
					$(this).addClass("swiper-no-swiping");
				});
			}
        }
    }(a, jQuery);

    //打笔记
    a.MakeNotes = function(w, $) {
        return {
            init: function() {
                var t = this;
                t.bindEvent();
            },
			 bindEvent: function() {
                var t = this,
					userId = JSON.parse(sessionStorage.obj).value.user_id,
					smallId;
                // 展开笔记view
                $(".xh_note").on("click", function() {
					$("section").each(function(){
						var _that = $(this);
						if(_that.hasClass("swiper-slide-active")){
							if(_that.attr("types") == "2"){
								_that.find(".swiper-pagination-hh span").each(function(){
									var _this = $(this);
									if(_this.hasClass("cur")){
										var index = _this.index();
										smallId = _that.find(".questions").eq(index).find(".quesTit").data("smallid");
									}
								});
							}else{
								smallId = $(this).find(".queBoxs").data("smallid");
							}
						}
					});
					t.noteSelect(userId);
					$("body").css("overflow-y","hidden");
					t.createNote(userId, smallId);
                });
				//保存笔记
				$(".xh_save2").on("click", function() {
					var userText = $("#textarea").val(),
						folderId = $(".xh_sels .link span").attr("suo");
					hideAlert($(this));
					t.saveNote(userId, smallId, userText, folderId);
				});
                // 取消笔记
                $(".xh_cancel2").on("click", function() {
                    hideAlert($(this));
                });
            },
			noteSelect:function(userId){
				$.get(InitPage.http + "c=Book&a=listFolder",{"userId":userId},function(data){
					if(data.status == "1"){
						var noteLi=" ";
						$.each(data.value, function(i, obj){
							noteLi += '<li id="'+ obj.id +'">' + obj.name + '</li>';
						});
						$(".xh_sels .submenu").html("").append(noteLi);
					}
				}).done(function(){
					// 笔记类型下拉框
					var flagss=false;
					$(".xh_sels .link").on("click",function(){
						if(!flagss){
							$(".xh_sels .submenu").show();
							flagss=true;
						}else{
							$(".xh_sels .submenu").hide();
							flagss=false;
						}
					});
					// 下拉框选中事件
					$(".xh_sels").on("click", ".submenu li", function() {
						var curFolder = $(this).text(),
							thisId =  $(this).attr("id");
						$(".xh_sels .link span").attr("suo",thisId).text(curFolder);
						$(".xh_sels  .submenu").hide();
						flagss=false;
					});
					$(".folder li:first").trigger("click");
				});
			},
			createNote:function(userId, smallId){
				$.get(InitPage.http+"c=Book&a=newBook",{"userId":userId,"smallId":smallId},function(data){
					if(data.status == "1"){
						if(data.value == null){ //之前没做过笔记
							$("#textarea").val("");
							$("#textarea").attr("placeholder","请在此输入笔记内容");
						}else{
							$("#textarea").val(data.value.user_text);
							$(".folder li").each(function(){
								if($(this).attr("id") == data.value.folder_id){
									 $(".xh_sels .link span").text($(this).text());
								}
							});
						}
						$(".setNotes,.mc").removeClass("hide"); 
					}
				});
			},
			saveNote:function(userId, smallId, userText, folderId){
				$.get(InitPage.http+"c=Book&a=saveBook",{"userId":userId,"userText":userText,"smallId":smallId,"folderId":folderId},function(data){
					//	console.log(data);
				});
			}
        }

    }(a, jQuery);

    //设置
    a.Setting = function(w, $) {
        return {
            init: function() {
                var t = this;
                t.initView();
                t.bindEvent();
                t.Tab.init()
            },
            /**
             * [initView 初始化view设置视图]
             * @return {[type]} [description]
             */
            initView: function () {
                var setting = LS.get('setting');

            },
            /**
             * [function 设置相关的事件绑定]
             * @return {[type]} [description]
             */
            bindEvent: function() {
                var t = this;
                var setting=JSON.parse(localStorage.setting);
                // 设置按钮绑定事件(顶部工具栏)
                $(".xh_set").off().on("click", function() {
                	_global.initSetting();
                    $(".xhSetting,.mc").removeClass("hide");
					$("body").css("overflow-y","hidden");
                });

                // 按钮开关
                $(".span_2").on("click", function() {
                    var index=$(this).parent().index('.topBoxSet ul li')+1;
                    if ($(this).find("em").hasClass("fl")) {  //未开启
                        switch(index){
                            case 1: setting.isAutoGo=1;
                                    break;
                            case 2: setting.isShowAnalyze=1;
                                    break;
                           /*  case 3: setting.isOpenSound=1;
                                    break; */
                            case 3: setting.isSwitchNight=1;
                                    break;
                        }
                        $(this).addClass("on");
                        $(this).find("em").removeClass("fl").addClass("fr on");
                    } else{
                         switch(index){
                            case 1: setting.isAutoGo=0;
                                    break;
                            case 2: setting.isShowAnalyze=0;
                                    break;
                            /* case 3: setting.isOpenSound=0;
                                    break; */
                            case 3: setting.isSwitchNight=0;
                                    break;
                        }
                        $(this).removeClass("on");
                        $(this).find("em").removeClass("fr on").addClass("fl");
                    }
                });

                // 设置aler的view的保存、取消
                $('.xh_cancel1,.xh_save1,.xh_complete').on('click', function () {
                    var domJQ = $(this),
                        isSave;
					if(domJQ.hasClass('xh_save1')){
						isSave = true;
					}
					 if(domJQ.hasClass('xh_complete')){
						isSave = true;
					} 
                    hideAlert(domJQ);
                    if(isSave){
                        t.saveSetting(setting);
                    }
                });
            },
            Tab:function () {
                return {
                    init:function () {
                        var t=this;
                        t.tabs(".span_3 em","on");
                    },
                    tabs:function (target,classN) {
                        $(target).on('click', function() {
                            $(this).addClass(classN).siblings().removeClass(classN);
                            Setting.Tab.fontSize=$(this).index();
                            
                        });
                    },
                    fontSize:JSON.parse(localStorage.setting).fontSize
                }
            }(),
            /**
             * [saveSetting 保存设置]
             * @return {[type]} [description]
             */
            saveSetting: function (setting) {
				 var t=this;
                setting.fontSize=Setting.Tab.fontSize;
                localStorage.setting=JSON.stringify(setting);
				var userId = JSON.parse(sessionStorage.obj).value.user_id;
                $.get(InitPage.http+"c=Me&a=saveSetting",
					{
						"userId":userId,
						"isShowAnalyze":setting.isShowAnalyze,
						"isSwitchNight":setting.isSwitchNight,
						"isAutoGo":setting.isAutoGo,
						"fontSize":setting.fontSize
					},function (data) {
					if(data.status == "1"){
						t.checkSetting(setting, data);
					}
                })
            },
			 checkSetting:function(setting, data){ 
				if(data.status == "1"){
					if(setting.isAutoGo == 1){           //是否自动跳下一题
						$(".yOrn1, .yOrn1 em").addClass("on");
					}else{
						$(".yOrn1, .yOrn1 em").removeClass("on");
					}
					if(setting.isShowAnalyze == 1){          //解析
						$(".yOrn2, .yOrn2 em").addClass("on");
					}else{
						$(".yOrn2, .yOrn2 em").removeClass("on");
						$("section").find(".jxBox").addClass("hide");
						//$("section").find(".Height").height(0);
					}
					if(setting.isSwitchNight == 1){   //夜间模式
						$("section, body").addClass("yj");
					}else{
						$("section, body").removeClass("yj");
					} 
					if(setting.fontSize == 0){
						$("section").addClass("zihao1").removeClass("zihao2 zihao3");
					}else if(setting.fontSize == 1){  //字号
						$("section").addClass("zihao2").removeClass("zihao1 zihao3");
					}else{
						$("section").addClass("zihao3").removeClass("zihao1 zihao2");
					}
				}
			}
        }
    }(a, jQuery);

    //顶部左上角select
    a.ZuoSelect = function(w, $) {
        return {
            init: function() {
                var t = this;
                t.chooseSelect();
            },
            chooseSelect: function() {
                var flags = false;
                $(".mySelect").off().on("click", function() {
                    if (!flags) {
                        $(".mySelect .submenu").show();
                        flags = true;
                    } else {
                        $(".mySelect .submenu").hide();
                        flags = false;
                    }
                });
                $(".mySelect .submenu li").off().on("click", function() {
                    var text = $(this).text();
                    $(this).parents(".mySelect").find(".link span em").text(text);
                    $(".mySelect .submenu").hide();
                });
            }
        }
    }(a, jQuery);

})(window);

InitPage.init();

window.onload=function(){
	//首次进来的时候初始化当前题号
	var curNums;
	if($("section:first").attr("types") == 2){
		$("section:first").find(".swiper-pagination-hh span").each(function(){
			var _this = $(this);
			if(_this.hasClass("cur")){
				var index = _this.index();
					curNums = $("section:first").find(".questions").eq(index).attr("sort");
			}
		});
	}else{
		curNums = $("section:first").attr("sort");	
	}
	$(".curItem i").text(curNums);
	
	
	//初始化收藏
	var iscollection;
	if($("section:first").attr("types") == 2){
		$("section:first").find(".swiper-pagination-hh span").each(function(){
			var _this = $(this);
			if(_this.hasClass("cur")){
				var index = _this.index();
					iscollection = $("section:first").find(".questions").eq(index).attr("iscollection");
				
			}
		});
	}else{
		iscollection = $("section:first").attr("iscollection");
	}
	if(iscollection == 1){
		$(".xh_xx").addClass("on");
		window.flag= true;
	}else{
		$(".xh_xx").removeClass("on");
		window.flag= false;
	}				
	//从套题报告右侧的题号进来
	 if(sessionStorage.stateObj){
		if(JSON.parse(sessionStorage.stateObj) == 3){
			if(sessionStorage.queNum){  //从套题报告右侧的题号进来
					var isInIt = sessionStorage.queNum;
					if(isInIt.indexOf("-") != -1){    //read
						var newArr = isInIt.split("-"),
							bigTiMuSort = newArr[0],
							smallTiMuSort = newArr[1];
							$(".list1 span").eq(bigTiMuSort-1).trigger("click");
							$("section").eq(bigTiMuSort-1).find(".swiper-pagination-hh span").eq(smallTiMuSort-1).trigger("click");
					}else{
						$(".list1 span").eq(JSON.parse(sessionStorage.queNum)-1).trigger("click");
					}
					if(JSON.parse(sessionStorage.queNum) == $(".count").text()){
						Start.addTaoTi();
						t.CheckReport();
					}
					
				}
		}
	} 									
}