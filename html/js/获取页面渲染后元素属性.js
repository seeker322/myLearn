function getStyle(obj,attr,boolean){
	// boolean 没搞清楚是什么作用，懒得查了
	var bollean=bollean||false,
		attr=attr||undefined;
	if(attr){
		return  obj.currentStyle?obj.currentStyle[attr]:getComputedStyle(obj,bollean)[attr];
	}else{
		return  obj.currentStyle?obj.currentStyle:getComputedStyle(obj,bollean);
	}
}