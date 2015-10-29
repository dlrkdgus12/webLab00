<!DOCTYPE html>
<html>
<head>
	<title>DB query</title>
</head>
<body>
		<form action="db.php" method="post">
			<input type="text" name="db_name"/>
			<textarea rows="4" cols="100" name="query">Input query</textarea>
			<input type="submit" name="submit" value="Submit" />
		</form>
		<?php
			$db_name = isset($_POST["db_name"]) ? $_POST["db_name"] : '';
			$db_query = isset($_POST["query"]) ? $_POST["query"] : '';
				$db = new PDO("mysql:dbname=$db_name","root","root");
				$rows = $db->query($db_query); 
				print_r($rows);?>
				<ul>
				<? foreach($rows as $row) { ?>
					<li><?= implode(" ", $row) ?></li>
				<? }
		?></ul>
</body>
</html>
