/*
*   Map object 
*   @param {Int} width 
*   @param {Int} height
*   @param {Int} mines
*   @param {Int} opened
*   @returns {Object} map
*   @returns {Int} map.width 
*   @returns {Int} map.height 
*   @returns {Int} map.mines 
*   @returns {Int} map.opened
*   @returns {Array} map.fields
*/

function Map(width, height, mines){
    this.width = width;
    this.height = height;
    this.size = width * height;
    this.mines = mines;
    this.opened = 0;
    this.fields = [];
}

