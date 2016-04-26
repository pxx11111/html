var stime;
var baseH = 600;
var mainTimeline;
var total_page = 6;//总页数
var page_nav_color = ["black","black","white","black","black","black"];//每个页数下 导航背景色
InitSideNav();

function InitSideNav()
{
	if(IsIe78())
		return;

	$("#progress_nav").css("height",(total_page+1)*24 + "px");
	var nav_color = page_nav_color[0];
	$("#progress_nav").append("<div class='sel_nav_" + nav_color + "'></div>");
	for(var i = 0;i<total_page-3;i++)
	{
		$("#progress_nav").append("<div class='unsel_nav_" + nav_color + "'></div>");
	}
	var step = 1/total_page;
	
	var step_process = ["0","0.2954","0.4150","0.5361","0.6525","0.7650","0.8881"];

	$("#progress_nav div").each(function(i,val){
		$(this).bind("click",function()
		{
			mainTimeline.progress(step_process[i]);
		});
	});
}

function buildMainTimeline(){
		var h = $(document.body).height();
		var last_page_index = (h*3) + 240;	

		mainTimeline = new TimelineMax({onUpdate:showStage, paused:true});
		stageTimeline = new TimelineLite();
		mainTimeline.add(stage())
		.add([
			TweenMax.to($(".main_wrap"), 1, {top:"-100%",ease:Circ.easeInOut,onComplete:motionPause,onReverseComplete:motionPause}),
		]).add([
			TweenMax.to($(".main_wrap"), 1, {top:"-200%",ease:Circ.easeInOut,onComplete:motionPause,onReverseComplete:motionPause}),
		]).add([
			TweenMax.to($(".main_wrap"), 1, {top:"-300%",ease:Circ.easeInOut,onComplete:motionPause,onReverseComplete:motionPause}),
	])
	.add([
			//TweenMax.to($(".main_wrap"), 1, {top:"-400%",ease:Circ.easeInOut,onComplete:motionPause,onReverseComplete:motionPause}),
	//.add([
			//TweenMax.to($(".main_wrap"), 1, {top:"-500%",ease:Circ.easeInOut,onComplete:motionPause,onReverseComplete:motionPause}),
		//]).add([
			//TweenMax.to($(".main_wrap"), 1, {top:"-600%",ease:Circ.easeInOut,onComplete:motionPause,onReverseComplete:motionPause}),
		//]).add([
			TweenMax.to($(".main_wrap"), 1, {top:"-" + last_page_index,ease:Circ.easeInOut,onComplete:motionPause,onReverseComplete:motionPause}),
		]);
	}
function stage(){
	var stepTimeLine = new TimelineLite({onComplete:motionPause,onReverseComplete:motionPause});
	var h = $(document.body).height();
	var scale = h/1080;
	baseH = baseH - (h-700)/2;
	$("#price").css("bottom",baseH/2 - 423);
	$(".block").css("transform","matrix("+scale+", 0, 0, "+scale+", 0, 0)");
	stepTimeLine.add([
			TweenMax.to($("#red_bg"), 0.5, {bottom:baseH/2 + 80,ease:Quad.easeIn}),
			TweenMax.to($("#op1"), 0.5, {bottom:baseH/2 + 60,ease:Quad.easeIn}),
			TweenMax.to($("#op2"), 0.5, {bottom:baseH/2 + 57,ease:Quad.easeIn}),
			TweenMax.to($("#op3"), 0.5,{bottom:baseH/2 - 285,ease:Quad.easeIn}),
		TweenMax.to($("#op4"), 0.5,{bottom:baseH/2 + 40,ease:Quad.easeIn}),
			TweenMax.to($("#op5"), 0.5,{bottom:h+381,ease:Quad.easeIn}),
			TweenMax.fromTo($("#op5"),0.5, {alpha:1},{alpha:0}),
		]).add([			
			TweenMax.fromTo($("#price"),1, {alpha:0},{alpha:1})
		])
	return stepTimeLine;
}
function opeartionHandler() {
	$(window).keydown(function(event) {
		var keycode = parseInt(event.which, 10); 
		if (keycode == 38) {
			motionMove(1)
			return false;
		} else if (keycode == 40) {
			motionMove(-1)
		return false;
		} 
		else if (keycode == 36) {
			goStage(0);
			return false;
		} else if (keycode == 35) {
			goStage(7);
			return false;
		} else if (keycode == 33) {
			motionMove(1)
			return false;
		}  else if (keycode == 34) {
			motionMove(-1)
			return false;
		} else if(keycode == 37 || keycode == 39) {
			return false;	}
	});
	$(document).keyup(function(event) {
		
	});
	try
	{
		$(window).mousewheel(function(event, delta) {
			motionMove(delta);
			return false;
		});
	}catch (e) {
		return true;

	}

}// JavaScript Document
function motionMove(delta) {
	mainTimeline.timeScale(1);

	var current_step = mainTimeline.progress();
	if(delta > 0){
	//	if(current_step != 0 && current_step >= step) $("#top_nav").fadeOut();
		mainTimeline.reverse()
	}else{
	//	if(current_step != 1) $("#top_nav").fadeOut();
		mainTimeline.play()
	}
}
function motionPause(){
	mainTimeline.pause();
//	$("#top_nav").fadeIn();

	var current_step = mainTimeline.progress();
	var step = Math.round(current_step*(total_page));
	if(step == total_page) return;

	if(step > 2)
	{
		step -= 1;
		var nav_color = page_nav_color[step];
		if(!nav_color) nav_color = "black";
		$("#progress_nav div").attr("class","unsel_nav_" + nav_color);
		$("#progress_nav div:nth-child(" + step + ")").attr("class","sel_nav_" + nav_color);
	}
	else
	{
		var nav_color = page_nav_color[step];
		nav_color = "black";
		$("#progress_nav div").attr("class","unsel_nav_" + nav_color);
		$("#progress_nav div:nth-child(1)").attr("class","sel_nav_" + nav_color);
	}
}
function IsIe78(){
	try {
		document.createElement("canvas").getContext("2d");
		return false;
	} catch (e) {
		return true;

	}
}
/*
function IsIe78()
{
	var _uat=navigator.userAgent; 
	if(_uat.indexOf("MSIE 6.0")>0 || _uat.indexOf("MSIE 7.0")>0 || _uat.indexOf("MSIE 8.0")>0)
	{
		return true;
	}
	return false;
}*/

function fixHeight(){
	var h = $(document.body).height();
	var w = $(document.body).width();
	baseH = h;

	var scale = h/1080;
	baseH = baseH - (h-700)/2;	
	$(".block").css("transform","matrix("+scale+", 0, 0, "+scale+", 0, 0)");

	//设置我要预约按钮等比缩放
	var top_nav_width = $(document.body).width();
	var resize_img_width = (top_nav_width*199)/1920;
	$("#link_last_page").width(resize_img_width);

	//设置底部foot位置
	var margin_left = (top_nav_width-320)/2;
	$("#bottom_div").css("margin-left",margin_left);

	//设置弹出层位置（根据不同分辨率)
	var width = $(document.body).width();	
	if(h != 916)
	{
		$("#code_panel").css("top",(h-450)/2);
	}
	if(width != 1920)
	{
		$("#code_panel").css("left",(width-800)/2);
	}

	//$("#stage0,#stage1,#stage1_text,#stage2,#stage2_text,#stage3,#stage3_text,#stage4,#stage4_text,#stage5,#stage5_text,#stage6,#stage6_text").width($(document.body).width() - 17);
	if(!IsIe78()){
		$("#stage0,#stage1,#stage1_text,#stage2,#stage2_text,#stage5,#stage5_text,#stage6,#stage6_text").height(h);
	}else{
		var scale = h/1080;
		$("#red_bg").css("bottom","200px");
		$("#op5").css("bottom","450px");
		$("#nextbuy").hide();
		$("#op1,#op2,#op3,#op4").css("bottom","-50px");
		$("#stage0").css("zoom",scale);
		try{
			if($(".block").offset().left<(w-w*scale)/2){//ie8居中
				$(".block").css({top:50/scale+"%",left:50/scale+"%"});
			}
		}catch(e){}
		$("#stage1,#stage1_text,#stage2,#stage2_text,#stage5,#stage5_text,#stage6,#stage6_text").width($(document.body).width() - 17);
	}
	//var scale = h/900;
	//$("#open_wrap").css("transform","matrix("+scale+", 0, 0, "+scale+", 0, 0)");
		//$("#op1,#op2,#op3,#op4,#op5").css("transform","matrix("+scale+", 0, 0, "+scale+", 0, 0)");	
}
function showStage(){}

function checkhBrowser(){
	try {
		document.createElement("canvas").getContext("2d");
		return true;
	} catch (e) {
		return false;
	}
}
$(function(){
	$('#img_weixin').click(function(){
		$('img',$(this)).toggle()
	})
	try{
		fixHeight();
		if(checkhBrowser()){
			opeartionHandler();
			buildMainTimeline();
		}else{
			$(".main_wrap").css({"height":"100%","overflow":"auto"});
		}

	}catch (e) {}
	$('#mask_div,.float-win').click(function(){

		$('.float-win').fadeOut()
		$('#mask_div').fadeOut()

		$('#video-content').empty()
	})
	$('#check-gift-btn').click(function(){
		$("#mask_div").css("filter","alpha(opacity=60)");
    	$("#mask_div").fadeIn();
    	$('#gift-display-panel').fadeIn()

	})
	$('#video-content').click(function(e){
		e.stopPropagation()
	})

	$('#play-video-btn').click(function(){
		$("#mask_div").css("filter","alpha(opacity=60)");
    	$("#mask_div").fadeIn();
    	$('#video-panel').fadeIn();
		$('#video-content').html('<video src="movie.mp4" width="640" height="480" controls autoplay></video>');
		/*$('#video-content').html('<OBJECT classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" \
			codebase="http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=6,0,40,0" \
			WIDTH="640" HEIGHT="480" id="myMovieName"> \
			<PARAM NAME=movie VALUE="./swf/video.swf"> \
			<PARAM NAME=quality VALUE=high> \
			<PARAM NAME=bgcolor VALUE=#FFFFFF> \
			<EMBED src="./swf/video.swf" quality=high bgcolor=#FFFFFF WIDTH="640" HEIGHT="480" \
			NAME="myMovieName" ALIGN="" TYPE="application/x-shockwave-flash" \
			PLUGINSPAGE="http://www.macromedia.com/go/getflashplayer"> \
			</EMBED> \
			</OBJECT>')
		/*var video = new tvp.VideoInfo();
		video.setVid("x0136e2eceh");
		video.setTitle("全民WiFi");
		videoPlayer = new tvp.Player();
		videoPlayer.create({
			width:640,
			height:450,
			video:video,
			flashWmode:"transparent",
			isVodFlashShowCfg:0,
			isVodFlashShowSearchBar:0,
			isVodFlashShowEnd:0,
			autoplay:1,
			controls:0,
			modId:"video-content",
			onallended:function(){
				videoPlayer.play();
			}
		});*/
    	
		
	})
	$(window).resize(resize);
	resize()
})

function resize(){
	fixHeight();

	var top_nav_width = $(document.body).width();
	if(top_nav_width < 900)
	{
		$("#top_nav").width(900);
	}
	else
	{
		$("#top_nav").width("100%");
	}
	//隐藏热点
	var rate=$('body').width()/1920.0;
	
	$('#play-video-btn')
		.width(574*rate).height(91*rate)
		.css('top',parseInt( 340*rate )+'px')
		.css('left',parseInt(  (1920-574)/2 *rate)+'px')
	$('#check-gift-btn')
		.width(742*rate).height(121*rate)
		.css('top',parseInt( 464*rate )+'px')
		.css('left',parseInt(  (1920-742)/2 *rate)+'px')
	$('#gift-display-panel')
		.css('left',parseInt(top_nav_width-800)/2+'px')

}


function SetMenu(index)
{
	$(".top_in li").each(function(i,item){
		var item_class = $(this).attr("class");
		if(item_class != '' && item_class != "appoint")
		{
			$(this).attr("class","");
		}

		if(i == index) {
			$(this).attr("class","tab_active");
		}
	});
}
function SetHover()
{
    $("#link_last_page").attr("src","images/hover.png");
}
function SetNormal()
{
    $("#link_last_page").attr("src","images/normal.png");
}
function SetDown()
{
    $("#link_last_page").attr("src","images/down.png");
}

function ShowAppoint(suffix)
{
    pgvSendClick({hottag:"wifi.new.index." + suffix});
	//var url = 'http://detail.tmall.com/item.htm?id=42303111481';
	//var url = 'http://item.jd.com/1163216.html';
	var url = 'http://tencent.jd.com';
    setTimeout(function(){
    	//open(url);
    	window.location.href = url;
    },50)
    return
    $("#mask_div").css("filter","alpha(opacity=60)");
    $("#mask_div").fadeIn();
    $("#code_panel").fadeIn();
}
function CloseCode()
{
    $("#mask_div").fadeOut();
    $("#code_panel").fadeOut();     
}