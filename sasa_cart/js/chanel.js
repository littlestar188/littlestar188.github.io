$(function(){
	var product= {		
		show : $('.product-album-preview').find('.show'),
		picWrap:$('.product-album-pic').find('.wrapper'),
		handle:$('.alnum-zooms-handle'),
		slideWrap:$('.product-album-thumb'),
		arrowLeft:$('.left-arrow'),
		arrowRight:$('.right-arrow'),
		scrollT:0,
		init:function(){
			this.glass();	
			//this.slide();
			this.mouseIn();
		},
		/*放大镜*/
		glass:function(){
			//鼠标移入移出
			var that = this;
			this.picWrap.hover(function(){
				that.handle.show();
				that.show.show();
				that.mouseMove();
			},function(){
				that.handle.hide();
				that.show.hide();
			});
		},
		mouseMove:function(){
			this.scroll();
			var that = this;
			//鼠标移动
			this.picWrap.mousemove(function(e){
				e = e || window.event;
				//获取handle到当前可视区的Y值
				var t = that.handle.offset.top;
				var left = e.clientX - 205;
				var top = e.clientY -60 -60;
				//console.log(that.scrollT,t);
				//console.log(left,top,t);
				that.handle.css({ 
					left:left-75,
					top:top-100 
				});
				//判断边界
				left = left<75?75:(left>225)?225:left;
				top = top<75?75:(top>225)?225:top;
				that.handle.css({
					left:left-75,
					top:top-100
				});
				that.show.find('img').css({
					left:-2*(left-75),
					top:-2*(top-100)
				});
				
			});
			
		},
		//获取页面滚动条的高度
		scroll:function(){
			var that = this;
			$(window).scroll(function(){
				that.scrollT = $(this).scrollTop();
				return that.scrollT;
			});
		},
		/*轮播图*/
		/*slide:function(){
			var that = this;
			for(var i=1;i<=this.slideWrap.find('img').length;i++){
				(function(index){
					that.slideWrap.find('.thumbnail-list li').eq(index).click(function(){
						that.picWrap.find('img').eq(index).show();
					});
				})(i);
			}
			
			
		}*/
		mouseIn:function(){
			var that = this;
			$('.detail').find('.addcart.scan').hover(function(){
				
				$(this).find('.code').show();
			},function(){
				$(this).find('.code').hide();
			});
		}
		
		
	}
	product.init();
	
	$('.topbar').load('topbar.html',function(){
		$.getScript('js/topbar.js');
	});
	
});
