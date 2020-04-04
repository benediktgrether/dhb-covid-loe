<?php
   
   $myFile = "data.json";
   $arr_data = array(); // create empty array

  try
  {	
		$city = $_POST['city'];
		echo ($city);

			if($city == Basel) {
				$formdata = array(
					'Basel' => array(
						'date' => $_POST['date'],
						'cases' => $_POST['cases']
					)
				);
			}else if ($city == Lörrach){
				$formdata = array(
					'Lörrach' => array(
						'date' => $_POST['date'],
						'cases' => $_POST['cases'] 
					)
				);
			}

	   //Get data from existing json file
	   $jsondata = file_get_contents($myFile);

	   // converts json data into array
	   $arr_data = json_decode($jsondata, true);

	   // Push user data to array
	   array_push($arr_data,$formdata);

       //Convert updated array to JSON
	   $jsondata = json_encode($arr_data, JSON_PRETTY_PRINT);
	   
	   //write json data into data.json file
	   if(file_put_contents($myFile, $jsondata)) {
					echo 'Data successfully saved';
	    }
	   else 
	        echo "error";

   }
   catch (Exception $e) {
            echo 'Caught exception: ',  $e->getMessage(), "\n";
   }
?>
<!DOCTYPE html>
<html lang="de">

<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<script src="./main.js"></script>
	<title>Document</title>
</head>

<body>
	<a href="./">Zurück zur Startseite</a>

</bod>
</html>