/*
*   Field object 
*   @param {Int} x 
*   @param {Int} y
*   @param {Bool} mine
*   @param {Int} number
*   @returns {Object} field
*   @returns {String} field.pos ("x.y")
*   @returns {Bool} field.mine 
*   @returns {Bool} field.flagged (initially false)
*   @returns {Bool} field.opened (initially false)
*   @returns {Bool} field.mystery (initially false)
*   @returns {String} field.number (initially "")
*/

function Field(x, y){
    this.pos = x + "." + y;
    this.mine = false;
    this.flagged = false;
    this.opened = false;
    this.mystery = false;
    this.number = 0;
}
