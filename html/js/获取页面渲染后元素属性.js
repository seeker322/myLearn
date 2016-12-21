  function getStyle(obj,attr){
    if(obj.currentStyle){//兼容IEcurrentStyle和getComputedStyle两个返回的都是一个对象
        return obj.currentStyle[attr];
    }
    else {
        return getComputedStyle(obj,false)[attr];
    }
}