var j = 1;
var direction = -0;
var tab_d = 0;

$(document).ready(function() {
	 
	//只显示第一个
	//设置宽度
	var total = $('.slides-container').children().length;
	
	set_w = (total * 305) + 300;
	$('.slides-container').width(set_w);
	
	//设置宽度的滑块按钮
	buttons_w = (total * 240);
	
	$('.sliderButtons').width(buttons_w);
	
	//绑定事件
	$('.slidesPrev').click(function(e){
		e.preventDefault();
		e.stopPropagation();
		if(total > 5){
			moveSlider(e,'prev');
		}
	});
	
	$('.slidesNext').click(function(e){
		e.preventDefault();
		e.stopPropagation();
		if(total > 5){
			moveSlider(e, 'next');
		}
	});
	
	$('.prev-hider').hide();
	
	$('.sliderButtons ul li:nth-child(1) span').addClass('selected');
	
	$('.sliderButtons span').click(function(e) {
		e.preventDefault();
		e.stopPropagation();
		if(total > 5){
			showTab(e);
		}
	});
	
});

function showTab(event) {

	var ele = event.currentTarget;
	var index = $('.sliderButtons ul li').index($(ele).parent())+1;
	var current = '';
	
	$('.sliderButtons ul li').each(function(j, element){

		if($(element).children().hasClass('selected')){
			current = j+1;
		}
		
	});
	
	action = 'no';
	
	//切换到相应的选项卡
	if(index < current){
		action = 'prev';
	}
	if(index > current){
		action = 'next';
	}
	
	//没有切换如果两者都是相等的
	if(action != 'no'){
		
		if(action == 'next'){
			direction = direction - (305 * (index - current));
			tab_d = tab_d - (56 * (index - current));
		}else{
			direction = direction + (305 * (current - index));
			tab_d = tab_d + (56 * (current - index));
		}
		
		j = index;
		var control = $('.slides-container');
		var tabs = $('.sliderButtons');
		
		if( j > $('.slides-container').children().length){
			
			//回到第一;
			control.animate({left: -0},500, 'swing', function(){});
			
			j = 0;
			
			tabs.animate({left: 0},500, 'swing', function(){
				$('.sliderButtons ul li span').removeClass('selected');
				$('.sliderButtons ul li:nth-child('+j+') span').addClass('selected');
				$('.prev-hider').hide();
				$('.next-hider').show();
			});
			
		}else{
			
			control.animate({left: direction},500, 'swing', function(){});

			tabs.animate({left: tab_d},500, 'swing', function(){
				$('.sliderButtons ul li span').removeClass('selected');
				$('.sliderButtons ul li:nth-child('+j+') span').addClass('selected');
				if(j <= 1){
					$('.prev-hider').hide();
				}else{
					$('.prev-hider').show();
				}if(($('.slides-container').children().length-j) < 4){
					$('.next-hider').hide();
				}else{
					$('.next-hider').show();
				}	
			});
			
		}if(j <= 1){
			j = 1;
			tab_d = 0;
			direction = -0;
			$('.prev-hider').hide();
		}if(($('.slides-container').children().length-j) < 4){
			$('.next-hider').hide();
		}
		
	}
	
}


function moveSlider(event, action){
	
	var control = $('.slides-container');
	var tabs = $('.sliderButtons');

	//显示下一个到最后
	//显示下一个元素,使当前元素隐藏
	
	if(action == 'next'){
		direction = direction - 305;
		tab_d = tab_d - 56;
	}else{
		direction = direction + 305;
		tab_d = tab_d + 56;
	}if( j >= $('.slides-container').children().length && action == 'next'){
		
		//回到第一;
		control.animate({left: -0},500, 'swing', function(){});
		
		j = 0;
		
		tabs.animate({left: 0},500, 'swing', function(){
			$('.sliderButtons ul li span').removeClass('selected');
			$('.sliderButtons ul li:nth-child('+j+') span').addClass('selected');
			$('.prev-hider').hide();
			$('.next-hider').show();
		});
		
	}else if(j <= 1 && action == 'prev'){
		
	}else{
		
		control.animate({left: direction},500, 'swing', function(){});
		
		tabs.animate({left: tab_d},500, 'swing', function(){
			$('.sliderButtons ul li span').removeClass('selected');
			$('.sliderButtons ul li:nth-child('+j+') span').addClass('selected');
			if(j <= 1){
				$('.prev-hider').hide();
			}else{
				$('.prev-hider').show();
			}if(($('.slides-container').children().length-j) < 5){
				$('.next-hider').hide();
			}else{
				$('.next-hider').show();
			}	
		});
		
	}if(action == 'next'){
		j++;
	}else{
		j--;
	}if(j <= 1){
		j = 1;
		tab_d = 0;
		direction = -0;
		$('.prev-hider').hide();
	}if(($('.slides-container').children().length-j) < 5){
		$('.next-hider').hide();
	}
	/*代码整理：www.97zzw.com - 97站长网*/
}
