﻿
$(function () {
	var swiper = new Swiper('.swiper-container', {
		pagination: '.swiper-pagination',
		paginationClickable: true
	});
});
		
	
/* 地图 */
//标注点数组
var markerArr = [{title:"天道教育",content:"天道集团总部",point:"116.318541|39.989567",isOpen:0,icon:{w:21,h:21,l:0,t:0,x:6,lb:5}}
	 ,{title:"天道教育",content:"北京天道国贸中心",point:"116.467093|39.911716",isOpen:0,icon:{w:21,h:21,l:0,t:0,x:6,lb:5}}
	 ,{title:"天道教育",content:"上海天道总部",point:"121.477011|31.23525",isOpen:0,icon:{w:21,h:21,l:0,t:0,x:6,lb:5}}
	 ,{title:"天道教育",content:"上海天道培训中心（人民广场校区）",point:"121.47264|31.237326",isOpen:0,icon:{w:21,h:21,l:0,t:0,x:6,lb:5}}
	 ,{title:"天道教育",content:"广州天道总部",point:"113.328856|23.147424",isOpen:0,icon:{w:21,h:21,l:0,t:0,x:6,lb:5}}
	 ,{title:"天道教育",content:"武汉天道总部",point:"114.342108|30.55003",isOpen:0,icon:{w:21,h:21,l:0,t:0,x:6,lb:5}}
	 ,{title:"天道教育",content:"济南天道总部",point:"117.007168|36.66846",isOpen:0,icon:{w:21,h:21,l:0,t:0,x:6,lb:5}} 
	 ,{title:"天道教育",content:"深圳天道总部",point:"114.060336|22.543606",isOpen:0,icon:{w:21,h:21,l:0,t:0,x:6,lb:5}} 
	 ,{title:"天道教育",content:"南京天道总部",point:"118.791033|32.045841",isOpen:0,icon:{w:21,h:21,l:0,t:0,x:6,lb:5}} 
	 ,{title:"天道教育",content:"成都天道总部",point:"104.073201|30.659022",isOpen:0,icon:{w:21,h:21,l:0,t:0,x:6,lb:5}} 
	 ,{title:"天道教育",content:"杭州天道总部",point:"120.138034|30.272079",isOpen:0,icon:{w:21,h:21,l:0,t:0,x:6,lb:5}} 
	 ,{title:"天道教育",content:"沈阳天道总部",point:"123.44145|41.813995",isOpen:0,icon:{w:21,h:21,l:0,t:0,x:6,lb:5}} 	
	 ,{title:"天道教育",content:"西安天道总部",point:"108.910699|34.237422",isOpen:0,icon:{w:21,h:21,l:0,t:0,x:6,lb:5}} 		 
	 ,{title:"天道教育",content:"青岛天道总部",point:"120.404862|36.071159",isOpen:0,icon:{w:21,h:21,l:0,t:0,x:6,lb:5}}
	 ];
//地图初始化 
var map1 = new BMap.Map("container");
map1.centerAndZoom(new BMap.Point(116.31855,39.989463),18);
map1.enableScrollWheelZoom();
addMarker(map1, markerArr[0]);

var map2 = new BMap.Map("container2");
map2.centerAndZoom(new BMap.Point(116.467093,39.911716),18);
map2.enableScrollWheelZoom();
addMarker(map2, markerArr[1]);

var map3 = new BMap.Map("container3");
map3.centerAndZoom(new BMap.Point(121.477011,31.23525),18);
map3.enableScrollWheelZoom();
addMarker(map3, markerArr[2]);

var map4 = new BMap.Map("container4");
map4.centerAndZoom(new BMap.Point(121.47264,31.237326),18);
map4.enableScrollWheelZoom();
addMarker(map4, markerArr[3]);

var map5 = new BMap.Map("container5");
map5.centerAndZoom(new BMap.Point(113.328856,23.147424),18);
map5.enableScrollWheelZoom();
addMarker(map5, markerArr[4]);

var map6 = new BMap.Map("container6");
map6.centerAndZoom(new BMap.Point(114.342108,30.55003),18);
map6.enableScrollWheelZoom();
addMarker(map6, markerArr[5]);

var map7 = new BMap.Map("container7");
map7.centerAndZoom(new BMap.Point(117.007168,36.66846),18);
map7.enableScrollWheelZoom();
addMarker(map7, markerArr[6]);

var map8 = new BMap.Map("container8");
map8.centerAndZoom(new BMap.Point(114.060336,22.543606),18);
map8.enableScrollWheelZoom();
addMarker(map8, markerArr[7]);

var map9 = new BMap.Map("container9");
map9.centerAndZoom(new BMap.Point(118.791033,32.045841),18);
map9.enableScrollWheelZoom();
addMarker(map9, markerArr[8]);

var map10 = new BMap.Map("container10");
map10.centerAndZoom(new BMap.Point(104.073201,30.659022),18);
map10.enableScrollWheelZoom();
addMarker(map10, markerArr[9]);

var map11 = new BMap.Map("container11");
map11.centerAndZoom(new BMap.Point(120.138034,30.272079),18);
map11.enableScrollWheelZoom();
addMarker(map11, markerArr[10]);

var map12 = new BMap.Map("container12");
map12.centerAndZoom(new BMap.Point(123.44145,41.813995),18);
map12.enableScrollWheelZoom();
addMarker(map12, markerArr[11]);

var map13 = new BMap.Map("container13");
map13.centerAndZoom(new BMap.Point(108.910699,34.237422),18);
map13.enableScrollWheelZoom();
addMarker(map13, markerArr[12]);

var map14 = new BMap.Map("container14");
map14.centerAndZoom(new BMap.Point(120.404862,36.071159),18);
map14.enableScrollWheelZoom();
addMarker(map14, markerArr[13]);

    //创建marker
    function addMarker(map, json){
		var p0 = json.point.split("|")[0];
		var p1 = json.point.split("|")[1];
		var point = new BMap.Point(p0,p1);
		var iconImg = createIcon(json.icon);
		var marker = new BMap.Marker(point,{icon:iconImg});
		var label = new BMap.Label(json.title,{"offset":new BMap.Size(json.icon.lb-json.icon.x+10,-20)});
		marker.setLabel(label);
		map.addOverlay(marker);
		label.setStyle({
					borderColor:"#808080",
					color:"#333",
					cursor:"pointer"
		});
		
		(function(){
			var _iw = createInfoWindow(json);
			var _marker = marker;
			_marker.addEventListener("click",function(){
				this.openInfoWindow(_iw);
			});
			_iw.addEventListener("open",function(){
				_marker.getLabel().hide();
			})
			_iw.addEventListener("close",function(){
				_marker.getLabel().show();
			})
			label.addEventListener("click",function(){
				_marker.openInfoWindow(_iw);
			})
			if(!!json.isOpen){
				label.hide();
				_marker.openInfoWindow(_iw);
			}
		})()
    }
    //创建InfoWindow
    function createInfoWindow(marker){
        var json = marker;
        var iw = new BMap.InfoWindow("<b class='iw_poi_title' title='" + json.title + "'>" + json.title + "</b><div class='iw_poi_content'>"+json.content+"</div>");
        return iw;
    }
    //创建一个Icon
    function createIcon(json){
        var icon = new BMap.Icon("http://app.baidu.com/map/images/us_mk_icon.png", new BMap.Size(json.w,json.h),{imageOffset: new BMap.Size(-json.l,-json.t),infoWindowOffset:new BMap.Size(json.lb+5,1),offset:new BMap.Size(json.x,json.h)})
        return icon;
    }
/* 地图 end */