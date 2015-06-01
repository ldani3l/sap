<?
include_once "../app.php";
conectar();
header("Content-type:application/json");

$action = $_GET["action"];

switch($action){
	case 'getAllByDepartment':
		$department = $_GET["department"];
		$p = new city();
		$json = $p->getAllByDepartment($department);
		
		if($json == false)
			echo "[]";
		else
			echo json_encode($json);

	break;

}