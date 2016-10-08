$(function () {
	var userInfo=JSON.parse(localStorage.userInfo).value;
	if (userInfo.gender=='male') {$("li.sex p.fr>span").text('男');} else if(userInfo.gender=='female'){$("li.sex p.fr>span").text('女');}
	$("li.username p.fr>span").text(userInfo.nickname);
	$("li.phone p.fr>span").text(userInfo.verifiedmobile);
	//选择头像
	 
	$("#result").on('click', function() {
		$("#file_input").trigger("click");
	});
	var url;
	var reader=new FileReader();
	$("#file_input").change(function () {
		var file=this.files[0];
		reader.onload=function () {
			url=this.result;
			$("#result").children('img').attr('src',decodeURI(url));
			$.ajax({
				// processData: false,
				type:'post',
		        url:'http://s.tiandaoedu.cn/exam/index.php?m=App&c=User&a=Img',
		        data:{user_id:59400,img:url},
		        success:function (data) {
		        	// var img=document.createElement('img');
		        	// img.src=data;
		        	// img.style.width="1rem";
		        	// document.body.appendChild(img);
		        }
		    })
		}
		reader.readAsDataURL(file);
	})
});



