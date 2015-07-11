/*
*   Field object 
*   @param {Int} x 
*   @param {Int} y
*   @param {Bool} bomb
*   @param {Int} number
*   @returns {Object} field
*   @returns {String} field.pos ("x.y")
*   @returns {Bool} field.bomb 
*   @returns {Bool} field.flagged (initially false)
*   @returns {Bool} field.opened (initially false)
*   @returns {String} field.number (initially "")
*/

function Field(x, y, bomb, number){
    this.pos = x + "." + y;
    this.bomb = bomb;
    this.flagged = false;
    this.opened = false;
    this.number = number;
}

(function(){
    console.log(new Field(1,2,false,2));
})()