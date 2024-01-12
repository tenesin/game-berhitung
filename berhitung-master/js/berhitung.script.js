var BERHITUNG 				= {};
var LEVEL_JUMLAH_SOAL_AWAL 	= 4;
var LEVEL_SPEED_AWAL 		= 10000;
var LEVEL_NUMBER_AWAL 		= 6;

/* FIXED */
var LEVEL_INCREASE_SPEED 	= 100;
var LEVEL_INCREASE_SOAL 	= 5;
var LEVEL_INCREASE_NUMBER 	= 1;
var ANGKA 		= [];
var URUTAN 		= 0;
var LEVEL 		= 1;
var SKOR 		= 0;
var NYAWA 		= 5;
var COUNTING 	= 0;

BERHITUNG.init = function(){
	BERHITUNG.position.content();	
	BERHITUNG.position.awal();
	BERHITUNG.action.init();
};

BERHITUNG.action = {	
	init 	: function(){
		$('body').keypress(function(e){
            //alert(e.which);
            //if(e.which == 27){
            //Close my modal window
            //}
        });
	},
	generateAngka	: function(opsi) {
		ANGKA = [];
		var nilai_awal = {
                level: LEVEL,
				jumlah_soal : LEVEL_JUMLAH_SOAL_AWAL,
				number_awal : LEVEL_NUMBER_AWAL
            };
		var opt = $.extend(nilai_awal, opsi);
		jum = (LEVEL_INCREASE_SOAL * (opt.level-1)) + opt.jumlah_soal;
		for(i=1;i<=jum;i++){
			incr = (opt.number_awal + ((opt.level-1) * LEVEL_INCREASE_NUMBER) );
			rand1 = Math.floor(Math.random()*(incr));
			rand2 = Math.floor(Math.random()*(incr));
			hasil = parseInt(rand1+rand2);
			ANGKA.push('soal_'+i+'_'+hasil+'_'+rand1+'+'+rand2);
		}
	},	
	start 	: function(opsi){
		URUTAN = 0;
		ANGKA = [];
		NYAWA = 5;
		COUNTING = 0;
		$('#level').html(LEVEL);
		$('#skor').html(SKOR);
		$('#nyawa').html(NYAWA);
		BERHITUNG.action.generateAngka();
		mulai = setInterval(function(){
			BERHITUNG.action.runDown();
		},3000);
	},
	runDown : function(opsi) {	
		if(ANGKA[URUTAN] != undefined){	
			_t = ANGKA[URUTAN].split("_");
			left  = Math.floor(Math.random()*($('#content').width()-150));
			BERHITUNG.position.soal({
				text 	: _t[_t.length-1]+" = ?",
				left	: left + "px",
				id		: _t[0]+"_"+_t[2]+"_"+_t[1]
			});
			URUTAN++;	
		}else{
			return false;
		}
	},
	resetAwal : function(){
		document.location.reload(true);
	},
	nextLevel : function(){
		LEVEL++;
		URUTAN = 0;
		ANGKA = [];
		NYAWA = 5;
		COUNTING = 0;
		BERHITUNG.action.start();
	},
	hitung : function(o){
		$('.box_soal').each(function(){
			id = $(this).attr('id').split("_");
			if(id[1]==o.val()){
				COUNTING++;
				
				$(this).stop().animate({
					top : "10px"	
				},200,function(){
					$(this).remove();
				});	
				
				SKOR = parseInt(SKOR) + parseInt(o.val());
				$('#skor').html(SKOR);	
				
				if(COUNTING == ANGKA.length){
					$('#level-info').html(LEVEL);
					$('#skor-info').html(SKOR);
					$('#level-complete').showBox({
							top:120	
						});	
				}
				
				$(this).next().css("border","4px solid #FF9900");
			}
			o.val("").focus();
		});
	}
}

BERHITUNG.position = {	
	awal : function(){
		$('#awal-mula').showBox({
			top : 50	
		});
	},
	content : function() {
		var ctn = jQuery("#content");
		ctn.css({
			width:$(document).width() + "px",
			height:	$(document).height() - ($('#header').height() + $('#footer').height()) + "px"
		});
	},
	soal : function(opt){
		
		if(NYAWA > 0){
			var nilai_awal = {
					left: "0px",
					id : "soal1",
					text : "4 + 5 ?",
					speed:LEVEL_SPEED_AWAL - ((LEVEL-1)*LEVEL_INCREASE_SPEED)
				};
			var om = $.extend(nilai_awal, opt);
			u = om.id.split("_");
			$("#content").append("<div class='box_soal gradient round soal_"+u[2]+"' style='display:none;' id='"+om.id+"'> "+om.text+" </div>");
			
			oo = $("#"+om.id);
			oo.css({
				left:om.left
			});
			
			if($('.box_soal').length==1)
				$('.box_soal').css("border","4px solid #FF9900");
			
			oo.hide().fadeIn().animate({
					top:$("#content").height() + 20 + "px"
			},om.speed,function(){
				$(this).fadeOut("medium",function(){
					idd=$(this).attr("id").split("_");
					
					$(this).remove();	
					mm = parseInt(idd[2])+1;
					$('.soal_'+mm).css("border","4px solid #FF9900");
					$('.soal_'+mm).css("z-index","100000");
					
					NYAWA--; COUNTING++;
					$('#nyawa').html(NYAWA<0?0:NYAWA);
					if(NYAWA<=0){
						$("#content").html("");
						$('#level-info2').html(LEVEL);
						$('#skor-info2').html(SKOR);
						$('#game-over').showBox({
							top:120	
						});
						return false;
					}
					
					if(COUNTING == ANGKA.length){
						$('#level-info').html(LEVEL);
						$('#skor-info').html(SKOR);
						$('#level-complete').showBox({
								top:120	
							});	
					}
					
				});			
				
			});
		}
	}
}

$(document).ready(function(){
	BERHITUNG.init();
	$('#btn-mulai').click(function(){
		$('#awal-mula').closeBox();
		$('#text-hasil').focus();
		BERHITUNG.action.start();	
	});
	
	$('#btn-mulai2').click(function(){
		$('#game-over').closeBox();
		$('#text-hasil').focus();
		BERHITUNG.action.resetAwal();	
	});
	
	$('#btn-next-level').click(function(){
		$('#level-complete').closeBox();
		$('#text-hasil').focus();
		BERHITUNG.action.nextLevel();
	});
	
	$("#text-hasil").keypress(function(event) {

		if ( (event.which >= 48 && event.which <=57) || event.which == 8 ) {
        }else{
			if( event.which == 13){
				if($.trim($(this).val()) != ""){
					BERHITUNG.action.hitung($(this));
				}
			}else{
				event.preventDefault();
			}
		}
	});	
});