<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta name="description" content="" />
<meta name="keywords" content=""  />
<title></title>
<style type="text/css">
/*reset.star*/
*{margin:0;padding:0;list-style:none outside none;font-size:12px;}
body{font-family:Arial,"宋体";background:#FFF;}
a{outline:none;cursor:pointer;*outline:expression(this.hideFocus=true);text-decoration:none;color:#666}
fieldset,img{border:0;}
img,object{vertical-align:top;}
/*reset.end,mine.star*/
.main{width:750px;margin:0 auto;background:#CCC;position:relative;}
.main li{position:absolute;}
/*reset.end,mine.end*/
</style>
<?php
function getImgHeight($img){
	return imagesy(imagecreatefromjpeg($img));
}
?>
</head>
<body>
<div class="main" id="main">
	<ul>
		<li><img src="images/01.jpg" width="250" height="<?php echo getImgHeight("images/01.jpg");?>" alt="" /></li>
		<li><img src="images/02.jpg" width="250" height="<?php echo getImgHeight("images/02.jpg");?>" alt="" /></li>
		<li><img src="images/03.jpg" width="250" height="<?php echo getImgHeight("images/03.jpg");?>" alt="" /></li>
		<li><img src="images/04.jpg" width="250" height="<?php echo getImgHeight("images/04.jpg");?>" alt="" /></li>
		<li><img src="images/05.jpg" width="250" height="<?php echo getImgHeight("images/05.jpg");?>" alt="" /></li>
		<li><img src="images/06.jpg" width="250" height="<?php echo getImgHeight("images/06.jpg");?>" alt="" /></li>
		<li><img src="images/07.jpg" width="250" height="<?php echo getImgHeight("images/07.jpg");?>" alt="" /></li>
		<li><img src="images/01.jpg" width="250" height="<?php echo getImgHeight("images/01.jpg");?>" alt="" /></li>
		<li><img src="images/02.jpg" width="250" height="<?php echo getImgHeight("images/02.jpg");?>" alt="" /></li>
		<li><img src="images/03.jpg" width="250" height="<?php echo getImgHeight("images/03.jpg");?>" alt="" /></li>
		<li><img src="images/04.jpg" width="250" height="<?php echo getImgHeight("images/04.jpg");?>" alt="" /></li>
		<li><img src="images/05.jpg" width="250" height="<?php echo getImgHeight("images/05.jpg");?>" alt="" /></li>
		<li><img src="images/06.jpg" width="250" height="<?php echo getImgHeight("images/06.jpg");?>" alt="" /></li>
		<li><img src="images/07.jpg" width="250" height="<?php echo getImgHeight("images/07.jpg");?>" alt="" /></li>
	</ul>
</div>
<script type="text/javascript" src="js/somesayss.js"></script>
<script type="text/javascript">
$.ui.waterfall = $.Class.creat();
$.ui.waterfall.prototype = {
	init:function(){
		this.opat = {
			id:document,
			node:null,
			row:1
			};
		$.Object.extend(this.opat,arguments[0]||{});
		this.fire();
	},
	fire:function(){
		var _this = this,_opat = _this.opat;
		var _id = $(_opat.id);
		var _lis = _this._lis = _id.find(_opat.node);
		var _width = _lis.outerWidth();
		var _row = _opat.row;
		var _arr = [];
		_lis.each(function(i,o){
			if(_arr.length < _row){
				$(this).css({left:(i%_row)*_width+"px"});
				$.Use(_arr).push($(this).outerHeight()+"."+i).sort(function(_a_,_b_){return parseInt(_a_) - parseInt(_b_);});
			}else{
				var _first = _arr.shift();
				var _minheight = parseInt(_first);
				var _which = +_first.split(".")[1];
				$(this).css({
					top:_minheight+"px",
					left:_lis.eq(_which).css("left")+"px"
				})
				$.Use(_arr).push($(this).outerHeight()+_minheight+"."+i).sort(function(_a_,_b_){return parseInt(_a_) - parseInt(_b_);});
			}
		});
		_id.css({
			height:parseInt(_arr[_row-1])+"px"
		})
		$.log(_arr)
	}
}
$(function(){
	new $.ui.waterfall({
		id:"#main",
		node:"li",
		row:3
	})
});
</script>
</body>
</html>
<!--
http://images.cnitblog.com/blog/319713/201302/19142429-654aebabc3354eeeac79c8e2240311f8.jpg
http://images.cnitblog.com/blog/319713/201302/19142441-33020127369d49aeadddbb3da0744fbd.jpg
http://images.cnitblog.com/blog/319713/201302/19142445-8c48ded8bc354168a79c82b671ff741a.jpg
http://images.cnitblog.com/blog/319713/201302/19142448-76c83874dfb14b35b38ed6fa9ef63ac4.jpg
http://images.cnitblog.com/blog/319713/201302/19142501-9ebfc368fc3e454b982080ef7309c9b0.jpg
http://images.cnitblog.com/blog/319713/201302/19142504-1918ccbd53794a1894009e93e277b458.jpg
http://images.cnitblog.com/blog/319713/201302/19142507-9b18a10ee0144d288cf6a577cbea52ac.jpg
-->

