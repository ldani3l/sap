<?
include_once "../app.php";
conectar();
header("Content-type:application/json");

$action = $_GET["action"];

switch($action){
	case 'getByCircuit':

		$circuit = $_GET["circuit"];

		$p = new church();
		$json = $p->getByCircuit($circuit);
		
		if($json == false)
			echo "[]";
		else
			echo json_encode($json);

	break;

}