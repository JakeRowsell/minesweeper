var x = 0;
var mines = 30;
var fieldsize = 199;
var fields = [];
for(var i = 0; i <= 199; i++){
    fields[i] = 0;
}
for(var n = 1; n <= mines; n++){
    var random = Math.floor(Math.random() * (fieldsize - 0 + 1)) + 0;
    if(fields[random] != -1){
        fields[random] = -1;	
        if((random == 0) || (random == 19) || (random == 180) || (random == 199)){
            if (random == 0 ){
                fields[random+1] == -1 ? x++ : fields[random+1]++;
                fields[random+20] == -1 ? x++ : fields[random+20]++; //botmid
                fields[random+21] == -1 ? x++ : fields[random+21]++; //botright
            }
            else if (random == 19){
                fields[random-1] == -1 ? x++ : fields[random-1]++;
                fields[random+19] == -1 ? x++ : fields[random+19]++; //botleft
                fields[random+20] == -1 ? x++ : fields[random+20]++; //botmid
            }
            else if (random == 180){
                fields[random-20] == -1 ? x++ : fields[random-20]++; //topmid
                fields[random-19] == -1 ? x++ : fields[random-19]++; //topright
                fields[random+1] == -1 ? x++ : fields[random+1]++;
            }else{
                fields[random-21] == -1 ? x++ : fields[random-21]++; //topleft
                fields[random-20] == -1 ? x++ : fields[random-20]++; //topmid	
                fields[random-1] == -1 ? x++ : fields[random-1]++;			
            }
        }
        // IF FIRST LINE NOT CORNER
        else if(random < 20){
            fields[random-1] == -1 ? x++ : fields[random-1]++;
            fields[random+1] == -1 ? x++ : fields[random+1]++;
            fields[random+19] == -1 ? x++ : fields[random+19]++; //botleft
            fields[random+20] == -1 ? x++ : fields[random+20]++; //botmid
            fields[random+21] == -1 ? x++ : fields[random+21]++; //botright
        }
        // IF LEFT NOT CORNER
        else if((random > 180) && (random < 199)){
            fields[random-21] == -1 ? x++ : fields[random-21]++; //topleft
            fields[random-20] == -1 ? x++ : fields[random-20]++; //topmid
            fields[random-19] == -1 ? x++ : fields[random-19]++; //topright
            fields[random-1] == -1 ? x++ : fields[random-1]++;
            fields[random+1] == -1 ? x++ : fields[random+1]++;	
        }
        else if(((random % 20) == 0)){
            fields[random-20] == -1 ? x++ : fields[random-20]++; //topmid
            fields[random-19] == -1 ? x++ : fields[random-19]++; //topright
            fields[random+1] == -1 ? x++ : fields[random+1]++;
            fields[random+20] == -1 ? x++ : fields[random+20]++; //botmid	
            fields[random+21] == -1 ? x++ : fields[random+21]++; //botright
        }
        else if(((random % 20) == 19)){
            fields[random-21] == -1 ? x++ : fields[random-21]++; //topleft
            fields[random-20] == -1 ? x++ : fields[random-20]++; //topmid
            fields[random-1] == -1 ? x++ : fields[random-1]++;
            fields[random+19] == -1 ? x++ : fields[random+19]++; //botleft
            fields[random+20] == -1 ? x++ : fields[random+20]++; //botmid	
        }else{
            fields[random-21] == -1 ? x++ : fields[random-21]++; //topleft
            fields[random-20] == -1 ? x++ : fields[random-20]++; //topmid
            fields[random-19] == -1 ? x++ : fields[random-19]++; //topright
            fields[random-1] == -1 ? x++ : fields[random-1]++;
            fields[random+1] == -1 ? x++ : fields[random+1]++;
            fields[random+19] == -1 ? x++ : fields[random+19]++; //botleft
            fields[random+20] == -1 ? x++ : fields[random+20]++; //botmid
            fields[random+21] == -1 ? x++ : fields[random+21]++; //botright
        }
    }else{
        n--;
    }
}
        
for(var i = 0; i < 200; i++){ // Append to .field_holder
    if(fields[i] == -1){
        $('.field_holder').append("<div class='field "+i+" type_"+fields[i]+"'><img src='img/mine.png' width='32' height='32' style='padding: 3px 0 0 3px;' /></div>");
    }else{
        $('.field_holder').append("<div class='field "+i+" type_"+fields[i]+"'><img src='img/"+fields[i]+".png' ></div>");
    }
};

for(var i = 0; i < 200; i++){ // append to bomb container
    $('.bomb_container').append("<div class='mark_bomb bomb_"+i+"'><img src='img/danger.png' /></div>");
    $('.mystery_container').append("<div class='mark_mystery mystery_"+i+"'></div>");
    $('.overlay_container').append("<div class='overlay' id='"+i+"'></div>");
}
var bombs_marked;
var total_fields;
var mines;
var field_size = 200;
total_fields = field_size;
bombs_marked = 0;
$('.overlay').mousedown(function(event) {
    switch (event.which) {
        case 1:
			theID = event.target.id;
			if($('.bomb_'+theID).css("visibility") == "hidden" && $('.mystery_'+theID).css("visibility") == "hidden"){
				$('.'+theID+' img').show();
				if($('.'+theID).hasClass('type_-1')){
					$('.overlay').hide();
					$('.field img').show();
					$('#losebox').show();
				}
				if($('.'+theID).hasClass('type_0')){
				 	manageAround(theID);
				}
	        }else{
				alert("Unmark field before clicking");
	        	return false;
	        }
	        clearField(theID);
	        checkWin();
		 	break;
        case 3:
        	theID = event.target.id;
        	if ($('#'+theID).is(":visible") && $('.bomb_'+theID).css("visibility") == "hidden" && $('.mystery_'+theID).css("visibility") == "hidden"){
        		$('#'+theID).css("background", "none");
        		$('.bomb_'+theID).css("visibility", "visible");  
        		bombs_marked++;
			}else if($('.bomb_'+theID).css("visibility") != "hidden"){
				$('.bomb_'+theID).css("visibility", "hidden");
				$('.mystery_'+theID).css("visibility", "visible");
				bombs_marked--;
			}else{
	        	$('.mystery_'+theID).css("visibility", "hidden");
	        	$('#'+theID).css("background", "#000");
			}
			checkWin();
        	break;
    }
   return false;
});
// disable rightclick inspection
$("html, body").on("contextmenu",function(e){
	return false;
});
var around = new Array();
function manageAround(id_raw){
	id = parseInt(id_raw);
	if((id % 20) != 0 && (id % 20) != 19){
		if(id > 0){
			around.push(id-1);
		}
		if(id >= 20){
			around.push(id-20)
		}
		if(id < 199){
			around.push(id+1)
		}
		if(id <= 179){
			around.push(id+20);
		}
	}
	// if left side
	else if ((id % 20) == 0){
		if(id >= 20){
			around.push(id-20)
		}
		around.push(id+1)
		if(id <= 179){
			around.push(id+20);
		}
	}
	// if right side
	else{
		around.push(id-1);
		if(id >= 20){
			around.push(id-20)
		}
		if(id <= 179){
			around.push(id+20);
		}
	}
	around.push(id);
	getAround(id);
	getDiagonal(id);
	checkWin();
}
function getAround(){
	counter = 0;
	while(counter < 21){
		$.each(around, function(i, v){
			if($('.'+v).hasClass('type_0')){
				clearField(v);
				getDiagonal(v);
				checkAround(v);
				around = $.grep(around, function(value) {
					return value != v;
				});
			}else{
				clearField(v);
				around = $.grep(around, function(value) {
	  				return value != v;
				});
			}
			var temp = [];
			$.each(around, function(i, el){
	   			 if($.inArray(el, temp) === -1) temp.push(el);
			});
			around = temp;
		});
	counter++;
	}
}

function checkAround(id_raw2){
 	id2 = parseInt(id_raw2);
	 	// if not left collumn
		if((id2 % 20) != 0){
			around.push(id2-1);
		}
		// if not bottom collumn
		if(id2 >= 20){
			around.push(id2-20)
		}
		// not right collumn
		if((id2 % 20) != 19){
			around.push(id2+1)
		}
		//if not last row
		if(id2 <= 179){
			around.push(id2+20);
		}
	around.push(id2);	
};

function getDiagonal(id_raw3){
	id3 = parseInt(id_raw3);
	tl = id3-21;
	tr = id3-19;
	bl = id3+19;
	br = id3+21;
	//corners
	if((id3 == 0) || (id3 == 19) || (id3 == 180) || (id3 == 199)){
		if(id3 == 0){
			clearField(br);
		}
		else if(id3 == 19){
			clearField(bl);
		}
		else if(id3 == 180){
			clearField(tr);
		}
		else{
			clearField(tl);
		}
	}else{
	 	// if left collumn
		if((id3 % 20) == 0){
			//top right, bot right
			clearField(tr);
			clearField(br);
		}
		// right collumn
		else if((id3 % 20) == 19){
			// top left, bottom left
			clearField(tl);
			clearField(bl);
		}
		// if top collumn
		else if(id3 <= 20){
			// bottom left, bottom right
			clearField(bl);
			clearField(br);
		}
		
		//if  last row
		else if(id3 >= 179){
			// top left, top right
			clearField(tl);
			clearField(tr);
		}
		else{
			around.push(tl);
			around.push(tr);
			around.push(bl);
			around.push(br);
			// clearField(tl);
			// clearField(tr);
			// clearField(bl);
			// clearField(br);
		}
	}
}
function clearField(id_raw4){
	id4 = parseInt(id_raw4);
	if($('.bomb_'+id_raw4).css("visibility") == "hidden" && $('.mystery_'+id_raw4).css("visibility") == "hidden"){
		if($('#'+id4).css("visibility") != "hidden"){
			$('#'+id4).css("visibility", "hidden");
			$('.'+id4+' img').show();
			field_size--;
		}	
	}
}
function checkWin(){
	if(mines == bombs_marked){
		if(field_size == bombs_marked){
			$('#winbox').show();
		}
	}
}
$('.replayGame').click(function(){
	window.location.reload();
});