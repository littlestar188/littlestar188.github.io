$(function(){
	var index = {
		init:function(){
			this.notice();
			this.mustCheck();
			this.limitedSale();
			$('.topbar').load('topbar.html',function(){
				$.getScript('js/topbar.js');
			});
			$.getScript('js/banner.js');
			$('.side-nav').load('side-nav.html',function(){
				$.getScript('js/sidenav.js');
			});
			$('.footer').load('footer.html');
		},
		notice:function(){
			$('.ads .ads-info').delay(500).animate({
				top:-8
			},300,function(){
				$(this).hide();
				$('.ads .ads-info').delay(1000).show().css({
					top:0
				});
			});			
		},
		mustCheck:function(){
			var content = "";
			for(var i = 1;i<=12;i++){
					content += '<li class="must-list">'
							+ 	'<a href="#" class="list-item">'
							+		'<img src="images/img1-'+i+'.jpg"/>'
							+		'<h3>全场低至3.8折</h3>'
							+		'<h4>COWSHED</h4>'
							+		'<span>纯天然成分</span>'
							+		'<p class="button">立即疯抢</p>'						
							+	'</a>'
							+'</li>';
			}
			//console.log(content);
			$('.mustCheck-wrap').append(content);	
		},
		limitedSale:function(){
			var content = "";
			for(var i = 1;i<=10;i++){
					content += '<li class="offer-list">'
							+	'<a href="#" class="offer-item">'
							+		'<div class="discount">'
							+			'<i>5.5</i>'
							+ 		' 折</div>'
							+		'<img src="images/sale-1.jpg"/>'
							+		'<div class="content">'
							+			'<div class="time">剩余时间17:10:15</div>'
							+			'<p class="txt">蕴含透明质酸和甘油，能强效保湿肌肤，并收敛和恢复肌肤弹性。另含多种天然植物精华，可促进血液循环</p>'
							+			'<div class="item-bottom">'
							+				'<div class="tag">'
							+					'<span>纯天然成分</span>'
							+					'<span>植物精华</span>'
							+					'<span>恢复肌肤弹性</span>'
							+				'</div>'
							+				'<p class="price">'
							+					'<b class="rmb">￥</b>'
							+					'<b class="sale-num">599</b>'
							+					'<del class="origin-num">￥1099</del>'
							+				'</p>'
							+				'<p class="amount">已售出11件</p>'
							+				'<p class="button">马上抢</p>'
							+			'</div>'								
							+		'</div>'												
							+	'</a>'
							+'</li>';
			}
			$('.limitedOffer-wrap').append(content);	
		}
		
		
	}
	index.init();
	
	
});

