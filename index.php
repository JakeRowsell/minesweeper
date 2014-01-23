<!doctype HTML>
<head>
	<!-- Commented out for  offline use -->
	<script src="lib/jquery-min.js"></script>
 	<!-- <script src="//ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js"></script>-->
	<!-- <link href='http://fonts.googleapis.com/css?family=Bowlby+One+SC' rel='stylesheet' type='text/css'>
	<link href='http://fonts.googleapis.com/css?family=Vampiro+One' rel='stylesheet' type='text/css'> -->
	<?php
	$rand = rand(0,2);
	if($rand == 1){
		echo '<link href="lib/minesweeper_galactic.css" rel="stylesheet">';
	}else{
		echo '<link href="lib/minesweeper.css" rel="stylesheet">';
	}
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
	<div class="field_holder">
		<?php
		$x = 0;
		$mines = 30;
		$fieldsize = 199;
		$fields = array();
		 for($i = 0; $i <= 199; $i++){
		 	$fields[] = 0;
		 }
		 for($n = 1; $n <= $mines; $n++){
		  	$random = rand(0, $fieldsize);
			if($fields[$random] != -1){
			 	$fields[$random] = -1;	
		 		if(($random == 0) || ($random == 19) || ($random == 180) || ($random == 199)){
		 			if ($random == 0 ){
		 				$fields[$random+1] == -1 ? $x++ : $fields[$random+1]++;
		 				$fields[$random+20] == -1 ? $x++ : $fields[$random+20]++; //botmid
		 				$fields[$random+21] == -1 ? $x++ : $fields[$random+21]++; //botright
		 			}
		 			elseif ($random == 19){
		 				$fields[$random-1] == -1 ? $x++ : $fields[$random-1]++;
		 				$fields[$random+19] == -1 ? $x++ : $fields[$random+19]++; //botleft
						$fields[$random+20] == -1 ? $x++ : $fields[$random+20]++; //botmid
		 			}
		 			elseif ($random == 180){
		 				$fields[$random-20] == -1 ? $x++ : $fields[$random-20]++; //topmid
						$fields[$random-19] == -1 ? $x++ : $fields[$random-19]++; //topright
						$fields[$random+1] == -1 ? $x++ : $fields[$random+1]++;
		 			}else{
		  				$fields[$random-21] == -1 ? $x++ : $fields[$random-21]++; //topleft
						$fields[$random-20] == -1 ? $x++ : $fields[$random-20]++; //topmid	
						$fields[$random-1] == -1 ? $x++ : $fields[$random-1]++;			
		 			}
		 		}
		 		// IF FIRST LINE NOT CORNER
		 		elseif($random < 20){
		 			$fields[$random-1] == -1 ? $x++ : $fields[$random-1]++;
		 			$fields[$random+1] == -1 ? $x++ : $fields[$random+1]++;
		 			$fields[$random+19] == -1 ? $x++ : $fields[$random+19]++; //botleft
					$fields[$random+20] == -1 ? $x++ : $fields[$random+20]++; //botmid
					$fields[$random+21] == -1 ? $x++ : $fields[$random+21]++; //botright
		 		}
		 		// IF LEFT NOT CORNER
		 		elseif(($random > 180) && ($random < 199)){
		 			$fields[$random-21] == -1 ? $x++ : $fields[$random-21]++; //topleft
					$fields[$random-20] == -1 ? $x++ : $fields[$random-20]++; //topmid
					$fields[$random-19] == -1 ? $x++ : $fields[$random-19]++; //topright
		 			$fields[$random-1] == -1 ? $x++ : $fields[$random-1]++;
		 			$fields[$random+1] == -1 ? $x++ : $fields[$random+1]++;	
		 		}
		 		elseif((($random % 20) == 0)){
					$fields[$random-20] == -1 ? $x++ : $fields[$random-20]++; //topmid
					$fields[$random-19] == -1 ? $x++ : $fields[$random-19]++; //topright
		 			$fields[$random+1] == -1 ? $x++ : $fields[$random+1]++;
					$fields[$random+20] == -1 ? $x++ : $fields[$random+20]++; //botmid	
					$fields[$random+21] == -1 ? $x++ : $fields[$random+21]++; //botright
		 		}
		 		elseif((($random % 20) == 19)){
		 			$fields[$random-21] == -1 ? $x++ : $fields[$random-21]++; //topleft
					$fields[$random-20] == -1 ? $x++ : $fields[$random-20]++; //topmid
		 			$fields[$random-1] == -1 ? $x++ : $fields[$random-1]++;
		 			$fields[$random+19] == -1 ? $x++ : $fields[$random+19]++; //botleft
					$fields[$random+20] == -1 ? $x++ : $fields[$random+20]++; //botmid	
		 		}else{
		 			$fields[$random-21] == -1 ? $x++ : $fields[$random-21]++; //topleft
					$fields[$random-20] == -1 ? $x++ : $fields[$random-20]++; //topmid
					$fields[$random-19] == -1 ? $x++ : $fields[$random-19]++; //topright
		 			$fields[$random-1] == -1 ? $x++ : $fields[$random-1]++;
		 			$fields[$random+1] == -1 ? $x++ : $fields[$random+1]++;
		 			$fields[$random+19] == -1 ? $x++ : $fields[$random+19]++; //botleft
					$fields[$random+20] == -1 ? $x++ : $fields[$random+20]++; //botmid
					$fields[$random+21] == -1 ? $x++ : $fields[$random+21]++; //botright
		 		}
			}else{
			 	$n--;
			}
		 }
		foreach($fields as $key => $field){
			if($field == -1){
				echo "<div class='field ".$key." type_".$field."'><img src='img/mine.png' width='32' height='32' style='padding: 3px 0 0 3px;' /></div>";
			}else{
				echo "<div class='field ".$key." type_".$field."'><img src='img/".$field.".png' ></div>";
			}
		}
		print("<script> var mines =".$mines."; var field_size =".$fieldsize."+1;</script>");	 
		?>
		</div>
		<div class="bomb_container">
		<?php
		for($b = 0; $b <= $fieldsize; $b++){
			echo "<div class='mark_bomb bomb_".$b."'><img src='img/danger.png' /></div>";
		}
		echo "</div><div class='mystery_container'>";
		for($m = 0; $m <= $fieldsize; $m++){
			echo "<div class='mark_mystery mystery_".$m."'></div>";
		}
		echo "</div><div class='overlay_container'>";
		for($o = 0; $o <= $fieldsize; $o++){
			echo "<div class='overlay' id='".$o."'></div>";
		}
		unset($fields);
		?>
	</div>
</div>
<script src="lib/minesweeper.js"></script>
</body>		


<!-- difficulty &amp; fieldsize <br/>
make functions out of field holder repeating code<br/>
better icons + styling<br/>
right click field then left causes freeze

Images for: numbers, bomb, questionmark, danger -->