<?
include_once '../initial.php';
class church extends initial {

	public function __construct(){}

	public function churchUpdate($id, $name,$category,$address,$phone,$cellular,$vereda,$email,$countMembers,$personeria,$circuit,$city,$statusICM,$yearDedication,$nit,$user){
		
		$data = mysql_query("update church set `name` = '$name',`category` = '$category',`address` = '$address', `phone` = '$phone', `cellular` = '$cellular',
		`vereda` = '$vereda', `email` = '$email',`countMembers` = '$countMembers',`personeria` = '$personeria',`circuit` = '$circuit',`city` = '$city',`statusICM` = '$statusICM',
		`yearDedication` = '$yearDedication',`nit` = '$nit',`user`  = '$user', `repeat` = 'true' where id = '$id'");
							
		if($data)
			return "ok";
		else
			return $data;
	}

	public function churchNew($name,$category,$address,$phone,$cellular,$vereda,$email,$countMembers,$personeria,$circuit,$city,$statusICM,$yearDedication,$nit,$user){
		$maxId = mysql_query("select max(id) as id from church");
		$maxId = mysql_fetch_array($maxId);
		$maxId = ++$maxId["id"];
		$data = mysql_query("insert into church(`id`,`name`,`category`,`address`,`phone`,`cellular`,`vereda`,`email`,`countMembers`,`personeria`,`circuit`,`city`,`statusICM`,`yearDedication`,`nit`,`user`)
							values ('$maxId','$name','$category','$address','$phone','$cellular','$vereda','$email','$countMembers','$personeria','$circuit','$city','$statusICM','$yearDedication','$nit','$user')");

		if($data)
			return "ok";
		else
			return $data;
	}

	public function get($id){
		$sql = "select 
				church.*,
				circuit.name as nameCircuit,
				circuit.zone,
				city.name as nameCity,
				city.department,
				person.id as idPerson,
				person.names,
				person.lastnames,
				person.document
				from 
				church,
				circuit,
				city,
				person
				where 
				church.circuit = circuit.id
				and church.city = city.id
				and person.church = church.id
				and church.id = '$id'";
		return $this->getOneRow($sql);
	}

	public function getByZoneAndName($zone, $name){
		$sql = "select 
				church.*,
				circuit.name as nameCircuit,
				circuit.zone,
				city.name as nameCity,
				person.id as idPerson,
				person.names,
				person.lastnames,
				person.document
				from 
				church,
				circuit,
				city,
				person
				where 
				church.circuit = circuit.id
				and church.city = city.id
				and person.church = church.id
				and circuit.zone = '$zone'
				and church.name like '%$name%'
				order by church.name";
		return $this->getAllRows($sql);
	}

	public function getByCircuitAndName($circuit, $name){
		$sql = "select 
				church.*,
				circuit.name as nameCircuit,
				circuit.zone,
				city.name as nameCity,
				person.id as idPerson,
				person.names,
				person.lastnames,
				person.document
				from 
				church,
				circuit,
				city,
				person
				where 
				church.circuit = circuit.id
				and church.city = city.id
				and person.church = church.id
				and circuit.id = '$circuit'
				and church.name like '%$name%'
				order by church.name";
		return $this->getAllRows($sql);
	}

	public function getByCircuit($circuit){
		$sql = "select 
				church.*,
				circuit.name as nameCircuit,
				circuit.zone,
				city.name as nameCity,
				person.id as idPerson,
				person.names,
				person.lastnames,
				person.document
				from 
				church,
				circuit,
				city,
				person
				where 
				church.circuit = circuit.id
				and church.city = city.id
				and person.church = church.id
				and circuit.id = '$circuit'
				order by church.name";
		return $this->getAllRows($sql);
	}

	public function getByZone($zone){
		$sql = "select 
				church.*,
				circuit.name as nameCircuit,
				circuit.zone,
				city.name as nameCity,
				person.id as idPerson,
				person.names,
				person.lastnames,
				person.document
				from 
				church,
				circuit,
				city,
				person
				where 
				church.circuit = circuit.id
				and church.city = city.id
				and person.church = church.id
				and circuit.zone = '$zone'
				order by church.name";
		return $this->getAllRows($sql);
	}

	public function getByName($name){
		$sql = "select 
				church.*,
				circuit.name as nameCircuit,
				circuit.zone,
				city.name as nameCity,
				person.id as idPerson,
				person.names,
				person.lastnames,
				person.document
				from 
				church,
				circuit,
				city,
				person
				where 
				church.circuit = circuit.id
				and church.city = city.id
				and person.church = church.id
				and church.name like '%$name%'
				order by church.name";
		return $this->getAllRows($sql);
	}

	/*public function getByCircuit($circuit){
		$sql = "select * from church where circuit = '$circuit' order by name";
		return $this->getAllRows($sql);
	}*/

	public function getByCity($city){
		$sql = "select * from church where city = '$city'";
		return $this->getAllRows($sql);
	}

}