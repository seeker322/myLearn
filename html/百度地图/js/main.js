function refer(){
	//姓名
		 if ($.trim($("input[name='name']").val()) == ""){
       			 alert("请填写姓名");
      		  $("input[name='name']").focus();
       		  return false;
		    }

	//手机	
		var mobile_phone = $("input[name='nm_lx_tel']").val();
    	var reg = /^0?1[358]\d{9}$/;
		if ($("input[name='nm_lx_tel']").val() == "" || !reg.test(mobile_phone)){
            alert("请填写正确手机号码");
       		$("input[name='nm_lx_tel']").focus();

        	return false;

		 }
	//验证码
	    var cookiecodestr=$.cookie('sjyzm');
		if(cookiecodestr != null){
			 var cookiecode = cookiecodestr.substr(0,5);	
		}
		var inputcode =$("#checkcode").val();
		if(cookiecode=="" || cookiecode==null|| cookiecode.toLowerCase()!==inputcode.toLowerCase()){
		     alert("请填写正确的手机验证码");
			$("input[name='tel_yzm']").addClass("red")
			$("input[name='tel_yzm']").focus();
			return false;
		}else{
			$("input[name='tel_yzm']").removeClass("red");		
		}
	//邮箱
	
	 	mail = $("input[name='email']").val();
   		var reg = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
		if ($("input[name='email']").val() == "" || !reg.test(mail)){
             alert("请填写正确邮箱");
       		 $("input[name='email']").focus();

     		return false;
        }
	//QQ格式验证
	     var qq = $("input[name='qq']").val();
         var reg = /[1-9][0-9]{4,}/;

		 if (qq !== ""){
		    if(!reg.test(qq)){
            alert("请填写正确QQ号码");
            $("input[name='qq']").focus();
            return false;
	    }

		 }
     //留学国家
	if($("#jycd").val()==''){

	  alert("请选择要去的国家！");
	  return false;
	}
	//留学阶段
	var mockExaminationJieDuan = $("#studyTarget").val();
	if($("#lxmd").val()==''){
	  alert("请选择要去读的学历！");
	  return false;
	}
}