<?
include_once "../app.php";
conectar();
header("Content-type:application/json");

$action = $_GET["action"];

switch($action){
	case "get":
		$data = json_decode(file_get_contents("php://input"));
		
		$id = $data->id;
		$c = new church();
		$json = $c->get($id);
		echo json_encode($json);

	break;
	case "churchSearch":
		$data = json_decode(file_get_contents("php://input"));
		
		$name = $data->name;
		$circuit = $data->circuit;
		$zone = $data->zone;

		$c = new church();
		if($zone && !$circuit && !$name)
			$json = $c->getByZone($zone);
		if($circuit && !$name)
			$json = $c->getByCircuit($circuit);
		if(!$zone && !$circuit && $name)
			$json = $c->getByName($name);
		elseif($zone && !$circuit && $name)
			$json = $c->getByZoneAndName($zone, $name);
		elseif($circuit && $name)
			$json = $c->getByCircuitAndName($circuit, $name);
		if($json == false)
			echo "[]";
		else
			echo json_encode($json);
		
	break;
	
	case "churchUpdate":
		$data = json_decode(file_get_contents("php://input"));
		
		$name = $data->name;
		$category = $data->category;
		$address = $data->address;
		$phone = $data->phone;
		$cellular = $data->cellular;
		$vereda = $data->vereda;
		$email = $data->email;
		$countMembers = $data->countMembers;
		$personeria = $data->personeria;
		$circuit = $data->circuit;
		$city = $data->city;
		$statusICM = $data->statusICM;
		$yearDedication = $data->yearDedication;
		$nit = $data->nit;
		$user = $data->user;
		$id = $data->id;

		$p = new church();
		$json = $p->churchUpdate($id, $name,$category,$address,$phone,$cellular,$vereda,$email,$countMembers,$personeria,$circuit,$city,$statusICM,$yearDedication,$nit,$user);
		echo $json;

	break;

	case "churchNew":
		$data = json_decode(file_get_contents("php://input"));
		
		$name = $data->name;
		$category = $data->category;
		$address = $data->address;
		$phone = $data->phone;
		$cellular = $data->cellular;
		$vereda = $data->vereda;
		$email = $data->email;
		$countMembers = $data->countMembers;
		$personeria = $data->personeria;
		$circuit = $data->circuit;
		$city = $data->city;
		$statusICM = $data->statusICM;
		$yearDedication = $data->yearDedication;
		$nit = $data->nit;
		$user = $data->user;

		$p = new church();
		$json = $p->churchNew($name,$category,$address,$phone,$cellular,$vereda,$email,$countMembers,$personeria,$circuit,$city,$statusICM,$yearDedication,$nit,$user);
		
		echo $json;

	break;
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