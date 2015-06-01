<?
include_once "../app.php";
conectar();
header("Content-type:application/json");

$action = $_GET["action"];

switch($action){
	case 'getByZone':

		$zone = $_GET["zone"];

		$p = new circuit();
		$json = $p->gets($zone);
		
		if($json == false)
			echo "[]";
		else
			echo json_encode($json);

	break;

}