$(function () {
	var ajax=function () {
		return{
			sender:function (url,type,data) {
				return $.ajax({
					url:url,
					type:type,
					data:data,
					datatype:"json"
				})
			}
		}
	}()
	var user_id=JSON.parse(sessionStorage.getItem('obj')).value.user_id,noteList,defaultNum,
		http = "http://s.tiandaoedu.cn/exam/index.php?m=App&";
	ajax.sender(http + 'c=Book&a=listFolder','get',{userId:user_id,state:1}).done(function (data) {
		noteList=data.value,
		defaultNum=data.defaultNum;
		for (var i = 0; i < noteList.length; i++) {
			if (i<defaultNum) {
				$("ul li").eq(i).children('p.p1').text(noteList[i].name);
				$("ul li").eq(i).children('p[style]').text(noteList[i].book_count);
				$("ul li").eq(i).find('a').attr('href', 'userNoteContent.html?' + $("ul li").eq(i).find(".p1:first").text() + '#'+ noteList[i].id);
			} else {
				$("ul li:last-child p.p1").text(noteList[i].name);	
				$("ul li:last-child p[style]").text(noteList[i].book_count);
				$("ul li:last-child").find('a').attr('href', 'userNoteContent.html?' + $("ul li").eq(i).find(".p1:first").text() + '#'+noteList[i].id);
				$("ul li:last-child").before($("ul li:last-child").clone(true));	
			}
		}
	})
	
	$("span.folder").click(function() {
		$(".newFolder").show();
		$(".newFolder input").focus();
	});
	// 保存
	$(".save-cancle span.sp1").click(function () {
		$(".newFolder").hide();
		if ($(".newFolder input").val()) {
			ajax.sender(http + 'c=Book&a=newFolder','get',{userId:user_id,name:$(".newFolder input").val()}).done(function (data) {
				if (data.status) {
					noteList.push({"name":$(".newFolder input").val(),"id":data.id,"book_count":"0","default":0});
					$("ul li:last-child p.p1").text($(".newFolder input").val());
					$(".newFolder input").val("");
					$("ul li:last-child").before($("ul li:last-child").clone(true));
					
				}
			})
		}
	});
	// 取消保存
	$(".save-cancle span.sp2").click(function () {
		$(".newFolder").hide()
	});
	// 删除
	$("ul").on('click', 'li p:last-child span.sp2', function() {
		var index=$("ul li").index($(this).parent().parent()),
			folderId=noteList[index].id;
		ajax.sender(http + 'c=Book&a=deleteFolder','get',{userId:user_id,folderId:folderId}).done(function (data) {
			if (data.status) {
				noteList.splice(index,1);
				$('ul li').eq(index).remove();
			}
		}).fail(function (data) {
			console.log(data);
		})
	});
})