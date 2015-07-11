/*
*   Map object 
*   @param {Int} width 
*   @param {Int} height
*   @param {Int} bombs
*   @param {Int} opened
*   @returns {Object} map
*   @returns {Int} map.width 
*   @returns {Int} map.height 
*   @returns {Int} map.bombs 
*   @returns {Int} map.opened
*   @returns {Array} map.fields
*/

function Map(width, height, bombs){
    this.width = width;
    this.height = height;
    this.bombs = bombs;
    this.opened = 0;
    this.fields = [];
}

(function(){
    console.log(new Map(1,2,false,2));
})()