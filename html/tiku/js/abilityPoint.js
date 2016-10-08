(function(a){
	a.initPage = function(a, $){
		return {
			init:function(){
				var t = this;
				AbilityPoint.getPointData();
			}
		}
	}(a, jQuery);
	
	/**
	 *AbilityPoint.html
	 * 
	 */
	 a.AbilityPoint = function(){
		 return {
			 init:function(){
				 
			 },
			 getPointData:function(){
				 var t = this;
				 var lookReport = JSON.parse(sessionStorage.lookReport);
				 $(".tab2").html(t.getTab(lookReport.value));
			 },
			 getTab:function(reports){
				 $(".titlesPoint").html(reports.shortName);
				 var trs = '<tr>\
								<td>能力点名称</td>\
								<td>' + reports.name + '</td>\
							</tr>\
							<tr>\
								<td>能力点编号</td>\
								<td>' + reports.hand_id + '</td>\
							</tr>\
							<tr>\
								<td>考察内容</td>\
								<td>' + reports.introduce + '</td>\
							</tr>\
							<tr class="h132">\
								<td>相关症状</td>\
								<td>' + reports.symptom + '</td>\
							</tr>\
							<tr>\
								<td>对应课程位置</td>\
								<td>' + reports.location + '</td>\
							</tr>\
							<tr class="h132">\
								<td>详细内容</td>\
								<td>' + reports.text + '</td>\
							</tr>\
							<tr>\
								<td>重要程度</td>\
								<td>' + reports.important + '</td>\
							</tr>\
							<tr>\
								<td>视频讲解</td>\
								<td>' + reports.url + '</td>\
							</tr>';
				return trs;
			 }
		 }
	 }(a, jQuery);
	
	
})(window);

initPage.init();
