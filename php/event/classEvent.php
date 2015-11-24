<?
include_once '../initial.php';
class event extends initial {

	public function __construct(){}

	public function eventNew($name, $date, $price){
		$maxId = mysql_query("select max(id) as id from event");
		$maxId = mysql_fetch_array($maxId);
		$maxId = ++$maxId["id"];		
		$sql = mysql_query("insert into event(id, name, date, status)
				values ($maxId, '$name', '$date', 1)");
		if($sql)
		{
			mysql_query("update event set status = 0 where id != '$maxId'");
			$price = explode(',', $price);
			for($i = 0; $i < count($price); $i++)
			{
				$d = explode('-', $price[$i]);
				$data = mysql_query("insert into prices(event, price, description)
						values($maxId, '$d[1]', '$d[0]')");
			}
		}
		if($sql && $data)
			return 'ok';
		else
			return $sql;
	}

	public function getEventByPrice($idPrice){
		$sql = mysql_query("select event from prices where prices.id = '$idPrice'");
		return $sql;
	}

	public function valid($document, $event){
	$verificar = mysql_query("select 
					prices.*
					from 
					person,
					event,
					prices,
					participation
					where
					person.document = '$document'
					and person.id = participation.person
					and participation.idPrice = prices.id
					and event.id = '$event'
					and event.id = prices.event");
	return mysql_num_rows($verificar);
	}

	public function register($participation, $person, $idPrice, $user){

		$fecha = date('Y-m-d');
		$hora = date('G:i:s');
		$maxId = mysql_query("select max(id) as id from participation");
		$maxId = mysql_fetch_array($maxId);
		$maxId = ++$maxId["id"];
		$sql = mysql_query("insert into participation(id, idPrice, person, participation, user, date)
							values ($maxId, '$idPrice','$person','$participation', '$user', '$fecha $hora')");
		if($sql)
			return $maxId.",".$fecha." ".$hora;
		else
			return "na";
	}

	public function getActualEvent(){
		$sql = "select 
				prices.*, 
				event.name 
				from 
				event,
				prices
				where event.id = prices.event
				and event.status = 1";
		return $this->getAllRows($sql);
	}
}