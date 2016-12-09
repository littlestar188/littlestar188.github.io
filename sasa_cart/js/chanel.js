$(function(){
	var product= {
		//放大镜
		show : $('.product-album-preview').find('.show'),
		picWrap:$('.product-album-pic').find('.wrapper'),
		handle:$('.alnum-zooms-handle'),
		//轮播图
		slideWrap:$('.product-album-thumb'),
		arrowLeft:$('.left-arrow'),
		arrowRight:$('.right-arrow'),
		scrollT:0,
		//加入购物车
		numInput:$('.product-amount .amount-input'),
		storeNum:$('.product-amount .amount-stock'),
		init:function(){
			this.glass();	
			//this.slide();
			this.mouseIn();
			//加入购物车
			this.styleSelect();
			this.numAdd();
			this.numDec();
			this.numPut();
			this.addCart();
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
				var left = e.pageX - $(this).offset().left;
				var top = e.pageY -$(this).offset().top;
				console.log(e.pageY);
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
		},
		/*加入购物车*/
		//选择样式
		styleSelect:function(){
			$('.product-color .detail .spe-attr').click(function(){
				$(this).addClass('sel');
				$(this).css({
					border:'3px solid #cb9966'
				});
				$(this).siblings().removeClass('sel');
				$(this).siblings().css({
					border:'3px solid #dfdfdf'
				});
				//console.log($(this));
			});
			
		},
		numAdd:function(){
			var that = this;			
			$('.product-amount .amount-increase').click(function(){
				var num = parseInt( that.numInput.val() );//是字符串类型 要转换成数字
				//判断库存
				if(num>=1987){
					return;
				}
				num++;
				that.numInput.val(num);
				
				
			});
		},
		numDec:function(){
			var that = this;			
			$('.product-amount .amount-decrease').click(function(){
				var num = parseInt( that.numInput.val() );//是字符串类型 要转换成数字
				//判断是否0
				console.log(typeof(num));
				if(num <= 1){
					return;
				}
				num--;
				that.numInput.val(num);
				
				
			});
		},
		numPut:function(){
			//实时监控文本框的值是否发生变化
			this.numInput.on('input propertychange',function(){
				var num = $(this).val();
				//判断是否超过边界 
				if(num<=0){
					num = 1;
				}else if(num>=1987){
					num = 1987;
				}
				//判断是否NaN
				var reg =/^\d+$/;
				if(!reg.test(num)){
					num = 1;
				}
				$(this).val(num);
			});
		},
		addCart:function(){
			$('.addcart').click(function(){
				//购物车 cart{} 获取产品信息 cookie
				/*cart = {
					
					"10001":{
						goods-id:10001,
						goods-amount:10
					}
				   }
				*/
				
				//判断是否已存在cart{} 无创建{}json对象
				var cart = $.cookie('sasa-cart') ||'{}';
				cart = JSON.parse(cart);
				
				//判断cart中是否已经存在当前商品
				var goodsId = $('.product-color .spe-attr.sel').data('gid');
				var amount =$('.product-amount .amount-option .amount-input').val();
				amount = parseInt(amount);
				console.log(goodsId,amount);
				if(!cart[goodsId]){
					cart[goodsId]= {
						goodsId:goodsId,
						goodsAmount:amount
					};
				}else{
					cart[goodsId].goodsAmount += amount;
				}
				//写到cookie中
				$.cookie('sasa-cart',JSON.stringify(cart),{expires:365,path:"/"});
				console.log(JSON.parse($.cookie('sasa-cart')));
				alert('添加成功');
			});
		}
		
	}
	product.init();
	
	
	$('.topbar').load('topbar.html',function(){
		$.getScript('js/topbar.js');
	});
	$('#pro-detail').load('pro-detail.html');
	$('.side-nav').load('side-nav.html',function(){
		$.getScript('js/sidenav.js');
	});
	$('.footer').load('footer.html');
	
	
});
