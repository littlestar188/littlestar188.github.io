/*轮播图*/
	var imgW = $('.imgs-wrapper');
	var imgs = $('.imgs-wrapper img');
	var circles = $('.circle-wrapper ul li');
	var width = 0;
	var timer;
	var now = 0;
	var next= 0;
	var index;
	imgs.first().show();
	autoPlay();
	createCircle();
	stop();
	circleClick();
	
	function autoPlay(){		
		timer = setInterval(function(){
			next ++;
			imgSwitch();			
		},1500);
		
	}
	function imgSwitch(){
		//判断边界
		//右边界		
		if(next >=imgs.length){
			next = 0;
		}
		//console.log(now,next);
		imgs.eq(now).fadeOut();
		imgs.eq(next).fadeIn();	
		//圆圈跟随	
		circles.eq(now).addClass('active');
		circles.eq(now).siblings().removeClass('active');
		now = next;
		
		
	}
	function createCircle(){
		var content = '';
		for(var i = 0;i<imgs.length;i++){			
			content +=  '<li></li>';	
		}
		$('.circle-wrapper ul').append(content);
		circles.first().addClass('active');
	}
	circles = $('.circle-wrapper ul li');	
	function stop(){
		$('.banner').hover(function(){
			clearInterval(timer);
		},function(){
			autoPlay();
		});
	}	
	function circleClick(){
		$('.circle-wrapper ul').on('click','li',function(){
				var index = $(this).index();
				//console.log(index);
				imgs.eq(index).fadeIn();
				imgs.eq(index).siblings().fadeOut();
				circles.eq(index).addClass('active');
				circles.eq(index).siblings().removeClass('active');
		});		return index;
	}
