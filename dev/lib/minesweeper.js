// global mine sweeper obj
var _MS = new _MS(".field_holder");

function _MS(target){
 
    var root = this;
    
    this._config = {
        mines: 30,
        width: 20,
        height: 10,
        mineImg: "",
        questionImg: "",
        flagImg: "",
        targetSelector: target
    }
    console.log(this);
    this.map = init(this._config.width, this._config.height, this._config.mines);

    function init(width, height, mines){
        $(root._config.targetSelector).empty();
        var map = new Map(width, height, mines);
        setupFields(map);
        setupMines(map);
        addFields(map);
        return map;
    }
    
   /*
*   Create fields objects to add mines to, give them all an x and y axis position
*/
function setupFields(map){
    
    //  For each needed field insert one to map.fields
    for (var i = 0; i < map.size; i++ ) {

        // get horizontal position in grid by N%W 
        var xPos = i % map.width;

        // get vertical position in grid by Math.floor(N/W) 
        var yPos = Math.floor(i/map.width);

        //  Create Field objects and add to map
        map.fields.push(new Field(xPos, yPos));

    }   
}

/*
*   Setup mines in minefield based on random numbers
*/
function setupMines(map){
    
    //  Amount of mines required
    var mines = map.mines;
    
    //  Array of fields to add mines to
    var fields = map.fields;
    
    for (var n = 0; n < mines; n++ ) {
        
        //  Generate a random number to turn into a mine
        var random = Math.floor(Math.random() * (map.size )) + 0;

        //  If can't be marked as a mine find another random number
        if(!markAsMine(map, random)){
            n--;
        }
    }
}

/*
*   Mark a field as a mine based on field's index in map.fields during setup of minefield
*   Also calls 'incrementSurrounding()' to ensure fields around mine are updated to reflext correct value
*   @returns {Bool} 
*/
function markAsMine(map, fieldIndex){

    var field = map.fields[fieldIndex];

    //  If field already is a mine return false
    if(field.mine){
        return false;   
    }else{
    
        //  mark this as a mine
        field.mine = true;
    
        //  unset number for this field
        field.number = 0;
    
        // increment fields around field
        incrementSurrounding(map, fieldIndex);   
        
        // Field successfully marked as a mine, return true
        return true;
        
    }
}

/*
*   When a field is set to be a mine, increment surrounding fields number value
*/
function incrementSurrounding(map, fieldIndex){
    
    var field = map.fields[fieldIndex];
    
    // Determine position of field on x and y axis
    var xPos = parseInt(field.pos.split(".")[0]);
    var yPos = parseInt(field.pos.split(".")[1]);
    
    var isTop = yPos === 0;
    var isLeft = xPos === 0;
    var isRight = xPos === (map.width - 1);
    var isBottom = yPos === (map.height - 1);
    

    //  Increment surrounding fields, excluding fields not on the map or with a border between them
    // increment top left
    if(!isTop && !isLeft){
        incrementFieldNumber(map.fields[fieldIndex - map.width - 1]);   
    }
    // increment top
    if(!isTop){
        incrementFieldNumber(map.fields[fieldIndex - map.width]);   
    }
    //  increment top right
    if(!isTop && !isRight){
        incrementFieldNumber(map.fields[fieldIndex - map.width + 1]);   
    }
    //  increment left
    if(!isLeft){
        incrementFieldNumber(map.fields[fieldIndex  - 1]);   
    }
    //  increment right
    if(!isRight){
        incrementFieldNumber(map.fields[fieldIndex + 1]);   
    }
    //  increment bottom left
    if(!isBottom && !isLeft){
        incrementFieldNumber(map.fields[fieldIndex + map.width - 1]);   
    }
    //  increment bottom 
    if(!isBottom){
        incrementFieldNumber(map.fields[fieldIndex + map.width]);   
    }
    //  increment bottom right
    if(!isBottom && !isRight){
        incrementFieldNumber(map.fields[fieldIndex + map.width + 1]);
    }

}

/*  
*   If a field isn't a mine increment number  
*/
function incrementFieldNumber(field){
    
    //  If field isn't a mine increment field number
    if(!field.mine){
        field.number += 1;   
    }
}
   
/*  
*   Add fields to map
*/
function addFields(map){
    for(var i = 0; i < 200; i++){ // Append to provided target selector
        $(root._config.targetSelector).append("<div class='field closed type_"+map.fields[i].number+"' id='"+i+"'></div>");
    }
}


//  Use on instead of regular mousedown as fields will be added after function bound
$('body').on('mousedown', '.field', function(event) {
    console.log(event.target);
    console.log("////////");
    console.log($(this).id);
    var map = _MS.map;
    // if event target is img select parent div and get id from there
    switch (event.which) {
        case 1:
            //  open current field
            //  if bomb end game
            //  if not bomb show number
            
			var fieldIndex = event.target.id;
            
            //  If field is flagged don't allow opening
            console.log(fieldIndex); 
			if(!map.fields[fieldIndex].flagged){
                
                exposeField(fieldIndex, map);
                //  If field selected is a bomb
				if(map.fields[fieldIndex].mine){
					playerLost(map);
                //  If number of surrounding bombs is 0 call 'exposeAround()' to open surrounding fields
				}
	        }else{
				alert("Unmark field before clicking");
	        	return false;
	        }
	        checkWin(map);
		 	break;
        case 3:
            //  flag current field
        	var fieldIndex = event.target.id;
            console.log(fieldIndex);
            //  Mark as a bomb
            //  if not currently open, if n
        	if (!map.fields[fieldIndex].opened && !map.fields[fieldIndex].flagged && !map.fields[fieldIndex].mystery){
        		map.fields[fieldIndex].flagged = true;
                $('#'+fieldIndex).append("<img src='img/danger.png'/>");
                $('#'+fieldIndex).removeClass('closed');
            //  Mark as a questionmark
			}else if(!map.fields[fieldIndex].opened && map.fields[fieldIndex].flagged){
                map.fields[fieldIndex].flagged = false;
                map.fields[fieldIndex].mystery = true;
				$('#'+fieldIndex).empty();
				$('#'+fieldIndex).append("<img src='img/questionmark.png'/>");
            }else if(!map.fields[fieldIndex].opened){
                map.fields[fieldIndex].mystery = false;
	        	$('#'+fieldIndex).empty();
                $('#'+fieldIndex).addClass('closed');
			}
			checkWin(map);
        	break;
    }
   return false;
});

/*
*   Due to right click being needed to flag fields, disable rightclick inspection
*/
$("html, body").on("contextmenu",function(e){
	return false;
});

function playerLost(map){
    $('.field').removeClass('closed');
    $('#losebox').show();
    exposeMap(map);
}   

function exposeMap(map){
    for(var i = 0; i < map.fields.length; i++){
        if(!map.fields[i].opened){
            exposeField(i, map);
        }
    }
}

/*
*   With the index of a field in map.fields open the field 
*/
function exposeField(index, map){
    // if bomb add bomb img and show
    // if number add number
    var field = map.fields[index];
    if(!field.opened){
        
        $('#'+index).removeClass('closed');
        map.fields[index].opened = true;
        if(field.mine){
            $('#'+index).append("<img src='img/mine.png' width='32' height='32' style='padding: 3px 0 0 3px;' />");
        }else{
            $('#'+index).append("<img src='img/"+map.fields[index].number+".png' >");
            if(map.fields[index].number === 0){
                exposeAround(index, map);   
            }
        }
    }
    // remove all instances of that index
    while(around.indexOf(index) >= 0){
        around.splice(around.indexOf(index), 1);
    }
    if(around.length){
        exposeField(around[0], map);   
    }
}

var around = [];
function exposeAround(indexRaw, map){
    // get index
    // for each around expose
    var index = parseInt(indexRaw);
    // if in an edge don't expose all
    //  else
    
    var isTop = index < map.width;
    var isLeft = index % map.width === 0;
    var isRight = index % (map.width - 1) === 0;
    var isBot = index >= map.size - map.width - 1;
    
    // unless in top row, or left row
    if(!isTop && !isLeft){
    around.push(index - map.width - 1);
    }
    if(!isTop){
    around.push(index - map.width);
    }
    if(!isTop && !isRight){
    around.push(index - map.width + 1);
    }
    if(!isLeft){
    around.push(index - 1);
    }
    if(!isRight){
    around.push(index + 1);
    }
    if(!isLeft && !isBot){
    around.push(index + map.width - 1);
    }
    if(!isBot){
    around.push(index + map.width);
    }
    if(!isBot && !isRight){
    around.push(index + map.width + 1);
    }
	
}


/*  
*   Check you've won the game, and if so show '#winbox' div
*/
function checkWin(map){
    // for each field, if it's a bomb but not flagged you've not won, if you've marked non-bombs you also haven't won.
    var win = true;
    for(var i = 0; i < map.fields.length; i++){
        if((map.fields[i].mine && !map.fields[i].flagged) || (!map.fields[i].mine && map.fields[i].flagged)){
            win = false;
        }
    }
	if(win){
        $('#winbox').show();
	}
}

/*
*   On click replay hide win/lose box and reset field
*/
$('.replayGame').click(function(){
    // instead, clear field and setup again
    $('#winbox').hide();
    $('#losebox').hide();
	map = init(root._config.width, root._config.height, root._config.mines);
}); 
    
    
    
    
}


