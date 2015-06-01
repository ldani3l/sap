<?
include_once "../app.php";
conectar();
header("Content-type:application/json");

$action = $_GET["action"];

switch($action){
	case 'getAll':

		$p = new department();
		$json = $p->getAll();
		
		if($json == false)
			echo "[]";
		else
			echo json_encode($json);

	break;

}