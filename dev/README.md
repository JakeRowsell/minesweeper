MineSweeper!
===========
The classic game of minesweeper made in JavaScript

Refactoring goals:
* strip out php and use js instead
- abstract data layer
- use Less
- include tests
- automate build
- track in github
- remove jquery
- refactor algorithms
- abstract code
- include minification
- simplify html layer
- minify code
- on build automatically commit and if build successfull push to github
- possibly push live to another domain
- check for cross browser compatibility
- reduce assets size
- split source and production files
- simplify fields to not need multiple layers


Field object:
String 'pos' ("x.y")
Bool 'bomb' 
Bool 'flagged' (initially false)
Bool 'opened' (initially false)
String 'number' (initially "")

Map object:
Int 'width'
Int 'height'
Int 'bombs'
Int 'opened'
Array 'fields'

Tech:
- js
- mocha
- gulp
- less
