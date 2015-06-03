<?
include_once "../app.php";
conectar();
header("Content-type:application/json");

$action = $_GET["action"];

switch($action){
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
		$status = $data->status;
		$nit = $data->nit;
		$user = $data->user;
		$affiliation = $data->affiliation;
		$id = $data->id;

		$p = new church();
		$json = $p->churchUpdate($id, $name,$category,$address,$phone,$cellular,$vereda,$email,$countMembers,$personeria,$circuit,$city,$statusICM,$yearDedication,$status,$nit,$user,$affiliation);

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
		$status = $data->status;
		$nit = $data->nit;
		$user = $data->user;
		$affiliation = $data->affiliation;

		$p = new church();
		$json = $p->churchNew($name,$category,$address,$phone,$cellular,$vereda,$email,$countMembers,$personeria,$circuit,$city,$statusICM,$yearDedication,$status,$nit,$user,$affiliation);

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