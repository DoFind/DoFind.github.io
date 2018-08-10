/*==================================
	2017.11.03d
====================================*/
var cc = {};
cc.swiper = null;
cc.mainAni = null;


cc.init = function() {

    cc.swiper = new Swiper('#swiper', {

        direction: 'vertical',
        scrollbar: '.swiper-scrollbar',
        mousewheelControl: true,
        slidesPerView: 'auto',

        onSlideChangeStart: function(swiper) {
        	cc.slideChangeStart(swiper.previousIndex + 1, swiper.realIndex + 1);
        },
        onSlideChangeEnd: function(swiper) {
            cc.onSlideChangeEnd(swiper.previousIndex + 1, swiper.realIndex + 1);
        }
    });
    cc.swiper.lockSwipes();
    nav.initAni();
    cc.events();
};
$(cc.init);

cc.slideChangeStart = function(prev, cur) {

    switch (cur) {
    	case 2:
        	if(prev == 1) {
        		secondAni.init();
        	} 
            break;
        case 3:
    		cc.thirdAniInit();
            break;
    	case 4:
        	if(prev == 5) {
        		var ani = new TimelineMax();
        		ani.to('.menu', .5, {top:22, ease:Cubic.easeOut});
    		} 
            break;
        case 5:
        	if(prev == 4) {
        		var ani = new TimelineMax();
        		ani.to('.menu', .5, {top:-100, ease:Cubic.easeOut});
        		cc.fifthAniInit();
    		} 
            break;
    }
}

cc.onSlideChangeEnd = function(prev, cur) {

    switch (cur) {
        case 1:
        	if(prev == 2){
        		nav.changeAni('menu-state1');
        	} 
        	cc.firstAni();
            break;
        case 2:
        	if(prev == 1) {
        		nav.changeAni('menu-state2');
        		secondAni.timeline.tweenTo('state1');
        	} else if (prev == 3){
        		nav.changeAni('menu-state2');
        	}
            break;
        case 3:
    		if(prev == 2) {
        		nav.changeAni('menu-state3');
    		}
    		cc.thirdAni();
            break;
        case 5:
        	cc.fifthAni();
            break;
    }
}

// 事件
cc.events = function() {

    nav.events();
    cc.button3D('.button-start', '.state1', '.state2', .3);
    cc.button3D('.button1', '.state1', '.state2', .3);
    cc.button3D('.button2', '.state1', '.state2', .3);

    $('.scene2 .next').click(function(){
    	cc.changeStep('next');
    });
    $('.scene2 .prev').click(function(){
    	cc.changeStep('prev');
    });

    // 手机横屏展示...
    setChange();
    window.addEventListener('orientationchange', function(e) {
        setChange();
    });
    function setChange() {
        var ani = new TimelineMax();
        if (window.orientation == 90 || window.orientation == -90) {
            ani.to('body', .3, {rotate: 0});
        } else {
            ani.to('body', .3, {rotate: 90});
        }
    }
};

cc.currentStep = 'state1';
cc.changeStep = function(step) {

		var curTime = secondAni.timeline.getLabelTime(cc.currentStep);
		var next = (step == 'next') ? secondAni.timeline.getLabelAfter(curTime) : secondAni.timeline.getLabelBefore(curTime);

		if( !next ) return;

		var index = parseInt( next.slice(-1) ) - 1;
		$(".scene2 .point").removeClass('selected');
		$(".scene2 .point").eq(index).addClass('selected');

		secondAni.timeline.tweenTo(next);
		cc.currentStep = next;
}

// 首屏动画
cc.firstAni = function() {

    var firstAni = new TimelineMax();
    firstAni.to('.scene1 .logo', .5, { opacity: 1 });
    firstAni.staggerTo('.scene1 .scene1-1 img', 2, { rotationX: 0, ease: Elastic.easeOut }, .2);
    firstAni.to('.scene1 .left', .7, { rotationZ: 0, ease: Cubic.easeOut }, '-=2');
    firstAni.to('.scene1 .right', .7, { rotationZ: 0, ease: Cubic.easeOut }, '-=2');
    firstAni.to('.scene1 .arrow', .5, {
        opacity: 1,
        bottom: 10,
        onComplete: function() {
            cc.swiper.unlockSwipes();
        }
    }, '-=1.5');
};

// 第 2 屏 动画
var secondAni = {};
secondAni.timeline = new TimelineMax();

secondAni.init = function() {

	if(secondAni.timeline) secondAni.timeline.clear();
	
	secondAni.timeline.set('.scene2-1 img, .scene2-2 .right img, .scene2-3 .right img, .scene2-4 .right img', {rotationX: 90, opacity:1});
	secondAni.timeline.set('.scene2-2 .left img, .scene2-3 .left img, .scene2-4 .left img', {opacity:0});

	secondAni.timeline.to('.scene2 .points', .2, {bottom:20, ease: Cubic.easeOut, onComplete:function(){
		$(".scene2 .point").removeClass('selected');
		$(".scene2 .point:eq(0)").addClass('selected');
	}});
	secondAni.timeline.staggerTo('.scene2-1 img', 1.5, {rotationX: 0, opacity:1, ease: Elastic.easeOut}, .1, 0);

		secondAni.timeline.add('state1');

	secondAni.timeline.staggerTo('.scene2-1 img', .2, {rotationX: 90, opacity: 0});

	secondAni.timeline.to('.scene2-2 .left img', .4, {opacity: 1});
	secondAni.timeline.staggerTo('.scene2-2 .right img', .3, {rotationX: 0, opacity:1, ease: Elastic.easeInOut}, 0, '-=.4');

		secondAni.timeline.add('state2');

	secondAni.timeline.staggerTo('.scene2-2 .right img', .2, {rotationX: 90, opacity:0});
	secondAni.timeline.set('.scene2-2 .left img', {opacity:0});

	secondAni.timeline.to('.scene2-3 .left img', .4, {opacity: 1});
	secondAni.timeline.staggerTo('.scene2-3 .right img', .3, {rotationX: 0, opacity:1, ease: Elastic.easeInOut}, 0, '-=.4');

		secondAni.timeline.add('state3');

	secondAni.timeline.staggerTo('.scene2-3 .right img', .2, {rotationX: 90, opacity:0});
	secondAni.timeline.set('.scene2-3 .left img', {opacity:0});


	secondAni.timeline.to('.scene2-4 .left img', .4, {opacity: 1});
	secondAni.timeline.staggerTo('.scene2-4 .right img', .3, {rotationX: 0, opacity:1, ease: Elastic.easeInOut}, 0, '-=.4');

		secondAni.timeline.add('state4');

	secondAni.timeline.stop();
};

// 第 3 屏 动画
cc.thirdAniInit = function() {
	var ani = new TimelineMax();
	ani.set('.scene3-1 img', {rotationX: 90});
}
cc.thirdAni = function() {

	var thirdAni = new TimelineMax();
	thirdAni.staggerTo('.scene3-1 img', 2, {rotationX: 0, ease: Elastic.easeOut}, .2);
};

// 第 5 屏 动画
cc.fifthAniInit = function(){

	var ani = new TimelineMax();
	ani.set('.scene5 .content img, .scene5 .button1, .scene5 .button2', {rotationX:-90,transformPerspective:600,transformOrigin:"center center"});
	ani.set('.scene5 .music', {top: -200});
	ani.set(".scene5 .line", {opacity:0});
}
cc.fifthAni = function() {

	var fifthAni = new TimelineMax();
	fifthAni.to('.scene5 .music', .5, {top:0,ease:Cubic.easeInOut});
	fifthAni.staggerTo('.scene5 .button1, .scene5 .button2, .scene5 .content img', 1.2, {opacity:1,rotationX:0,ease:Elastic.easeOut}, .2)
	fifthAni.to(".scene5 .line",0.5,{opacity:1});
};

// 3D 按钮的翻转动画  形参是selector
cc.button3D = function(obj, state1, state2, t) {

    // init
    var ele1 = $(obj).find(state1),
        ele2 = $(obj).find(state2),
        h = ele1.height();

    button3DAni = new TimelineMax();
    button3DAni.set(ele1, { rotationX: 0, top: 0, transformPerspective: 600, transformOrigin: 'center bottom' });
    button3DAni.set(ele2, { rotationX: -90, top: h, transformPerspective: 600, transformOrigin: 'center top' });

    // hover
    $(obj).hover(function() {
    	var enterAni = new TimelineMax();

        enterAni.to($(this).find(state1), t, { rotationX: 90, top: -h, ease: Cubic.easeInOut }, 0);
        enterAni.to($(this).find(state2), t, { rotationX: 0, top: 0, ease: Cubic.easeInOut }, 0);

    }, function() {
    	var leaveAni = new TimelineMax();
        leaveAni.to($(this).find(state1), t, { rotationX: 0, top: 0, ease: Cubic.easeInOut }, 0);
        leaveAni.to($(this).find(state2), t, { rotationX: -90, top: h, ease: Cubic.easeInOut }, 0);
    });
};


/*===============================
  导航  header - nav
=================================*/
var nav = {};

// 导航初始动画
nav.initAni = function() {

    var navAni1 = new TimelineMax();

    navAni1.to('.menu', .5, { opacity: 1 });
    navAni1.to('.menu', .5, { left: 22 }, '-=.3');
    navAni1.to('.menu .nav', .5, { opacity: 1, onComplete: cc.firstAni });
};

// 导航切换动画（切屏时）
nav.changeAni = function(stateClass) {

	// copy 一份，用于翻转
	var oldMenu = $('.menu'),
		newMenu = oldMenu.clone(true, true),
		h = oldMenu.height();

	// 没有remove 成功  类名不对   menu-state1 vs menu_state1
	newMenu.removeClass("menu-state1 menu-state2 menu-state3");
	newMenu.addClass( stateClass );
	// 做个标记，为了remove
	oldMenu.addClass("removeSelf");

	$('.menu-wrapper').append(newMenu);
    cc.button3D('.button-start', '.state1', '.state2', .3);

    // 3D 翻转动画   -55?????????????????????????????
	var changeAni = new TimelineMax();
	changeAni.set(oldMenu, {rotationX:0,top:22,transformPerspective:600,transformOrigin:"center bottom"});
	changeAni.set(newMenu, {rotationX:-90, top: 100,transformPerspective:600,transformOrigin:"center top"});

	changeAni.to(oldMenu, .3, {rotationX:90, top:-55, ease:Cubic.easeInOut, onComplete:function(){
		$('.removeSelf').remove();
	}}, 0);
	changeAni.to(newMenu, .3, {rotationX:0, top:22, ease:Cubic.easeInOut}, 0);
};

// 导航中的交互动画
nav.events = function() {

    var navEvtAni = new TimelineMax();
    $('.menu .nav a').hover(function() {

        var w = $(this).width();
        var l = $(this).offset().left - 2;
        navEvtAni.clear();
        navEvtAni.to('.menu .line', .3, { left: l, width: w, opacity: 1 });
    }, function() {
        navEvtAni.clear();
        navEvtAni.to('.menu .line', .5, { opacity: 0 });
    });

    var languageAni = new TimelineMax();
    $('.language').hover(function() {

        languageAni.clear();
        languageAni.to('.dropdown', .5, { opacity: 1 });
    }, function() {
        languageAni.clear();
        languageAni.to('.dropdown', .5, { opacity: 0 });
    });
};