<!doctype HTML>
<head>
	<!-- Commented out for  offline use -->
	<!--<script src="lib/jquery-min.js"></script>-->
 	 <script src="//ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js"></script>
	<link href='http://fonts.googleapis.com/css?family=Bowlby+One+SC' rel='stylesheet' type='text/css'>
	<link href='http://fonts.googleapis.com/css?family=Vampiro+One' rel='stylesheet' type='text/css'>
	<link href="lib/minesweeper_galactic.css" rel="stylesheet">
	<?php
	//$rand = rand(0,2);
	//if($rand == 1){
	//	echo '<link href="lib/minesweeper_galactic.css" rel="stylesheet">';
	//}else{
	//	echo '<link href="lib/minesweeper.css" rel="stylesheet">';
	//}
	?>
</head>
<body>
<div id="winbox">
	<div class="endbox">
		<span class="endWin">You win!</span> <br/>
		<button class="replayGame">Play again!</button>
	</div>
</div>
<div id="losebox">
	<div class="endbox">
		<span class="endLose">You lose..</span><br/>
		<button class="replayGame">Play again!</button>
	</div>
</div>
	
<div class="page_title">Mine<span>Sweeper</span>!<br/>
	<span class="subtitle">Made with PHP, jQuery and HTML</span>
</div>
<div class="game_container">
	<div class="field_holder"></div>
    <div class="bomb_container"></div>
    <div class="mystery_container"></div>
    <div class="overlay_container"></div>
</div>

<script src="lib/minesweeper.js"></script>
</body>		


<!-- difficulty &amp; fieldsize <br/>
make functions out of field holder repeating code<br/>
better icons + styling<br/>
right click field then left causes freeze

Images for: numbers, bomb, questionmark, danger -->