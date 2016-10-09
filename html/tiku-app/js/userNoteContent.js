$(function () {
	var hash=window.location.hash,
		folderId=hash.substring(1),
		bookList="bookList"+folderId,
		hash2 = window.location.search,
		jm = decodeURI(hash2),
		textss = jm.substr(1),
		value,
		userId=JSON.parse(sessionStorage.obj).value.user_id,
		http = "http://s.tiandaoedu.cn/exam/index.php?m=App&";
		$(".titles").html(textss+"题笔记");
	$.ajaxSetup({ 
	    async : false 
	});
	$.get(http + "c=Book&a=bookList",{userId:userId,folderId:folderId}).done(function (data) {
		if (data.status) {
			localStorage.setItem(bookList,JSON.stringify(data.value));
		}
	})
	bookList=JSON.parse(localStorage.getItem(bookList));
	var noteNub=bookList.length,
		page=Math.ceil(noteNub/5),
		$pageNub=$(".pageNub"),
		$olLastChild=$(".pageNub ol");
	if (page==1) {
		$(".pageNubBox").hide();
		$pageNub.hide();
		noteBuild(1);
	}else{
		pageNubLoad(page);
		noteBuild(1);
		$("ol li").on("click",function () {
			if ($(this).hasClass("checked")) return; 
			var index=$(this).text();
			$("ul li:last-child").siblings().remove();
			$("ol li").removeClass("checked");
			$(this).addClass("checked");
			noteBuild(index);
		})
	}
	function noteBuild(pageNub) {
		var max=(pageNub*5)>noteNub?noteNub:pageNub*5;
		for (var i = pageNub*5-5; i < max; i++) {
			var element=$("ul li:last-child");
			element.children('p.p1').text(bookList[i].text);
			element.find('span.which').text(bookList[i].paper_name+'>>'+bookList[i].big_sort);
			element.find('span.when').text(bookList[i].create_time);
			element.find('span.delete').data("book_id",bookList[i].book_id);
			element.before(element.clone(true));	
		}
	}
	function pageNubLoad(mub) {
		var olWidth=mub*0.36+1;
		$("ol").css("width",olWidth+"rem");
		for (var i = 1; i < mub+1; i++) {
			$olLastChild.append("<li>"+i+"</li>")
		}
		$("ol li").eq(0).addClass("checked")
	}
	$(".delete").on("click",function () {
		var	that=$(this), 
			book_id=that.data("book_id");
		$.get(http + "c=Book&a=deleteBook",{bookId:book_id}).done(function (data) {
			if (data.status) {
				for (var j = 0; j < bookList.length; j++) {
					if(bookList[j].book_id==book_id)bookList.splice(j,1);
				}
				localStorage.setItem(bookList,JSON.stringify(bookList));
				that.parent().parent().remove();
			}
		})	
	})
	$(".search .btn").on('click', function() {
		var val=$(".search input").val();
		console.log(val);
		$.get(http + "c=Book&a=bookList",{userId:userId,folderId:folderId,keywords:val}).done(function (data) {
			if (data.status==1) {
				bookList=data.value;
				noteNub=bookList.length;
				$("ul li:last-child").siblings().remove();
				$pageNub.hide();
				noteBuild(1);
			} else {}
		}).fail(function (err) {
			console.log(err);
		})
	});
})