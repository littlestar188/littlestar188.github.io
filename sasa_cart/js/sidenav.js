$(function(){
	//console.log(boxs,navItems);
	/*侧边导航 经过图标*/
	
	$('.nav-item').hover(function(){
		$(this).find('.box').stop(true).show();
		$('.cart .box').hide();
		$(this).find('.box').animate({
			right:58
		},50);
		$(this).find('.box').animate({
			right:38
		},50);
	},function(){
		$(this).find('.box').stop(true).hide();
	});
	/*侧边导航 点击图标或者.box*/
	$('.cart').click(function(){
		$('.cart .box').show();
	});
	/*回到顶部*/
	var back = $('.side-nav .backup');
	$(window).scroll(function(){
		var t = $(this).scrollTop();
		if(t>=500){
			back.show();
		}else{
			back.hide();
		}
	});
	back.click(function(){
		//回到顶部
		$('html,body').animate({scrollTop:0},300);
	});
});
