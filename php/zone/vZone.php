<?
include_once "../app.php";
conectar();
header("Content-type:application/json");

$action = $_GET["action"];

switch($action){
	case 'get-all':

		$p = new zone();
		$json = $p->getAll();
		
		if($json == false)
			echo "[]";
		else
			echo json_encode($json);

	break;

}