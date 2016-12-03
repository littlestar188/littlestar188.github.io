$(function(){
	/*我的账号*/
	$('.member-link ul li.noline:nth-child(1)').hover(function(){
		$(this).find('.box.nav').show(300);
	},function(){
		$(this).find('.box.nav').hide();
	});
	/*我的购物车*/
	$('.member-link ul li.noline:nth-child(2)').hover(function(){
		$(this).find('.box.cart').show();
	},function(){
		$(this).find('.box.cart').hide();
	});
	/*微信 微博 二维码*/
	$('.member-link ul li.noline:nth-child(7) a').find('i').first().hover(function(){
		$('.box.care').show();
		$('.box.care').find('.weibo').show();
		$('.box.care').find('.weixin').hide();
	},function(){
		$('.box.care').hide();
	});
	$('.member-link ul li.noline:nth-child(7) a').find('i').first().next().hover(function(){
		$('.box.care').show();
		$('.box.care').find('.weixin').show();
		$('.box.care').find('.weibo').hide();
	},function(){
		$('.box.care').hide();
	});
	/*搜索*/	
	var searchInput = $('.head-top .search').find('input[type="text"]');
	var searchCon = $('.search-content');
	// 失焦
	searchInput.on('blur',function(){
		searchCon.hide();
	});
	//获焦
	searchInput.on("input",function(){		
		searchCon.show();
		var searchKey = '';
		var content = '';
		searchKey = $(this).val();
		console.log(content);
		$.ajax({
			type:'get',
			url:'http://suggest.taobao.com/sug?code=utf-8&',
			data:{
				q:searchKey
			},
			dataType:'jsonp',
			success:function(data){
				//console.log(data);				
				for(var i in data.result){
	 				content += '<li class="list">'+data.result[i][0]+'</li>';
	 			}
				//console.log(content);
	 			searchCon.html(content);
			}
		});
	});
	/*二级导航*/
	var nav = $('.head-top').find('nav');
	var navItem =$('.nav .nav-item');
	var navList = $('.nav').find('.nav-list');
	navItem.each().hover(function(){
		console.log($this.index());
	});
	
	
	
});
