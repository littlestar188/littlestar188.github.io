$(function() {
	/*
 	1、读取cookie   readCookie
 	2、设置cookie   setCookie
 	3、将cookie中的数据渲染到页面上   initData
 	4、数量增加
 	5、数量减少
 	6、直接输入
 	7、删除
 	8、选中
 	9、结算信息填充
*/
	var sasaCart = {		
		data:null,//记录json数据
		cart:{},
		pay:{},
		body:$('tbody'),
		init: function() {
			this.readCookie();
			this.setCookie();
			this.initDate();
			$('.cart-head').load('cart-head.html', function() {
				$.getScript('js/cart-head.js');
			});
			$('.side-nav').load('side-nav.html', function() {
				$.getScript('js/sidenav.js');
			});
			$('.footer').load('footer.html');
		},
		//读取cookie
		readCookie:function(){
			this.cart = $.cookie('sasa-cart') || '{}';
			this.cart = JSON.parse(this.cart);
			//console.log(this.cart);
		},
		//设置cookie
		setCookie:function(){
			$.cookie('sasa-cart',JSON.stringify(this.cart),{expires:365,path:'/'});
		},
		//数据渲染到页面
		initDate:function(){
			var that = this;
			//获取data.json 获取商品信息			
			$.getJSON('js/data.json',function(data){
				that.data = data;//json数据保留
				//遍历cookie 
				for(var key in that.cart){
					(function(k){
						var tr = $('<tr class="cart-list-item"></tr>');						
						//加载商品区
						tr.load('goodsInfo.html',function(){
							//替换内容 放到tbody里面
							var gid = that.cart[k];
							//设置gid并保留
							tr.attr({
								'data-gid':k
							});
							//data[gid.goodsId] data里所有商品信息
							tr.find('.style').html(data[gid.goodsId]['goods-style']);
							tr.find('.price').html(data[gid.goodsId]['goods-sale'].toFixed(2));
							tr.find('.amount-input').val(that.cart[k]['goodsAmount']);
							var money = that.cart[k]['goodsAmount']*data[gid.goodsId]['goods-sale'];
							tr.find('.total').html(money.toFixed(2));
							that.body.append(tr);
							console.log(money);//对应id的对象
						});
					})(key);
				}
				that.increase();
				that.decrease();
				that.input();
				that.remove();
				that.goodSelect();
				that.selectAll();
			});
				
		},
		//商品数增加 父元素 监听
		increase:function(){			
			var that = this;
			//console.log(this.data);
			this.body.on('click','.btn-increase',function(){
				//获取input 与之为前一个兄弟
				var amount = $(this).prev().val();
				//获取gid 库存
				var gid = $(this).parents('.cart-list-item').data('gid');
				var stock = that.data[gid].stock;				
				//console.log(stock);
				//判断是否大于库存
				if(amount>=stock){
					return;
				}
				amount++;
				$(this).prev().val(amount);
				that.handleCookie($(this).prev());
			});
		},
		decrease:function(){
			var that = this;
			//console.log(this.data);
			this.body.on('click','.btn-decrease',function(){
				//获取input 与之为前一个兄弟
				var amount = $(this).next().val();				
				if(amount<=1){
					return;
				}
				amount--;
				$(this).next().val(amount);
				that.handleCookie($(this).next());
			});
		},
		//输入修改数量
		input:function(){
			var that = this;
			//console.log(this.data);
			this.body.on('input','.amount-input',function(){
				//获取input 与之为前一个兄弟
				var amount = $(this).val();
				amount = parseInt(amount);
				//获取gid 库存
				var gid = $(this).parents('.cart-list-item').data('gid');
				var stock = that.data[gid].stock;				
				//console.log(stock);
				//判断是否大于库存
				if(amount >= stock){
					amount = stock;
				}
				if(isNaN( amount )){
					$(this).val(1);
				}else{
					$(this).val(amount);
				}				
				//调用会写cookie功能
				that.handleCookie( $(this) );
			});
		},
		//数量回写cookie boj默认是input
		handleCookie:function(obj){
			var goodsItem = obj.parents('.cart-list-item');		

			//获取某商品的单价 然后计算单件商品的总价 
			var price = parseFloat(goodsItem.find('.price').html()).toFixed(2);
			var totalMoney = parseFloat(goodsItem.find('.total').html()).toFixed(2);
			goodsItem.find('.total').html((obj.val()*price).toFixed(2));
			//console.log(price,totalMoney);
			
			/*cookie amount 赋值*/
			//获取自己的gid
			var gid = obj.parents('.cart-list-item').data('gid');
			//重新给cart中的amount赋值
			this.cart[gid].goodsAmount = parseInt(obj.val());
			//回写cookie
			this.setCookie();
			console.log(this.cart[gid],gid);
			/*判断商品被选中*/
			if(goodsItem.find('input[type="checkbox"]').prop('checked')){
				//改变pay对象里面当前商品的总价
				this.pay[gid] = totalMoney;
				console.log(pay[gid]);
			}
		},
		/*单间商品删除*/
		remove:function(){
			var that = this;
			this.body.on('click','.delete',function(){
				//当前商品从页面消失
				if(confirm('确定删除宝贝吗?')){
					$(this).parents('.cart-list-item').remove();
					//从cookie中删除
					var gid = $(this).parents('.cart-list-item').data('gid');
					delete that.cart[gid];
					that.setCookie();
				}
				
			});
		},
		/*商品选择*/
		goodSelect:function(){
			var that = this;
			this.body.on('change','.pcheckbox input[type="checkbox"]',function(){
				var goodsItem = $(this).parents('.cart-list-item');	
				var total = goodsItem.find('.total').html();
				var gid = $(this).parents('.cart-list-item').data('gid');
				//如果点击存在  再点击取消
				if(that.pay[gid]){
					delete that.pay[gid];
				}else{
					that.pay[gid] = total;
				}
				that.handlePay();
			});
		},
		//单选某件商品 修改总件数和总价
		handlePay:function(){
			var goodsAmount = $('.number');
			var goodsMoney = $('.total-price');
			var goPay = $('.gopay');
			//遍历所有pay对象 计算应付 数量和总价
			var totalNum = 0;
			var totalMoney=0;
			for(var key in this.pay){
				totalNum++;
				totalMoney += parseFloat(this.pay[key]);
			}
			//判断按钮状态
			if(totalNum > 0){
				goPay.removeClass('canpay');
			}else{
				goPay.addClass('canpay');
			}
			//重新赋值
			goodsAmount.html(totalNum);
			goodsMoney.html(totalMoney.toFixed(2));
			
		},
		//全选
		selectAll:function(){
			var checkAll = $('.pcheckbox input[type="checkbox"]');
			var checkBoxs = $('.cart-list-item input[type="checkbox"]');
			
			checkAll.click(function(){
				var status = $(this).prop('checked');
				//如果自己选中
				if(status){
					//让所有商品的选择按钮选中
					checkBoxs.prop('checked',true);
				}else{
					//让所有商品的选择按钮不选中
					checkBoxs.prop('checked',false);
				}
			});
		}
		
	}	
	sasaCart.init();

});