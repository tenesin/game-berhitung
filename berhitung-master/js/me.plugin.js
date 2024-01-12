(function($){
    $.fn.extend({
		closeBox:function(){
			jQuery(this).fadeOut("medium",function(){
				$("#box_overlay").fadeOut().remove();	
			});
		},
        showBox: function(options) {
			
            var defaults = {
                top: "auto",
				position:"center",
                mode: "medium",
				overlay:true,
				overlay_color:"#ccc",
				overlay_opacity:".5"
            };
             
            var options = $.extend(defaults, options);
			
			return this.each(function() {
				var obj = jQuery(this);
				var opt = options;
				
				ptop = opt.top;
				if($.trim(opt.top)=="auto"){
					ptop = ($(document).height()-obj.height())/2;
				}
				
				if(opt.overlay){
					$("body").append("<div id='box_overlay'></div>");
					$("#box_overlay").css("z-index","1");
					$("#box_overlay").css("opacity",opt.overlay_opacity);
					$("#box_overlay").css({
						position:"fixed",
						top:"0px",
						left:"0px",
						backgroundColor:opt.overlay_color,
						width:$(document).width() + "px",
						height:$(document).height() + "px"			
					});
				}
				
				pleft = ($(document).width()-obj.width())/2;
				obj.css("z-index","10000");
				obj.css({
					left: pleft + "px",
					top:  ptop  + "px"
				}).fadeIn(opt.mode);
				
			});		
         
        }
    });
})(jQuery);
