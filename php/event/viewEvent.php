<?
include_once "../app.php";
conectar();
header("Content-type:application/json");

$action = $_GET["action"];

switch($action){

	case "getEvent":

		$p = new event();
		$json = $p->getActualEvent();
		
		echo json_encode($json);

	break;

	case "eventNew":
		$data = json_decode(file_get_contents("php://input"));
		
		$name = $data->name;
		$date = $data->date;
		$price = $data->price;

		$p = new event();
		$json = $p->eventNew($name,$date,$price);
		
		echo $json;

	break;

	case "register":
		$data = json_decode(file_get_contents("php://input"));
		
		$participation = $data->participation;
		$document = $data->document;
		$idPrice = $data->idPrice;
		$user = $data->user;

		$p = new person();
		$people = $p->getPerson($document);
		//$json = mysql_fetch_array($json);
		//$id = $json["id"];
		//echo ($id);
		//echo "sdgd";
		$e = new event();
		$event = $e->getEventByPrice($idPrice);
		$event = mysql_fetch_array($event);
		$event = $event["event"];
		//echo $event;
		if($e->valid($document, $event)==0){
			$json = $e->register($participation, $people["id"], $idPrice, $user);
			echo $json;
		}

	break;

}