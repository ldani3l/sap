<?
include_once '../initial.php';
class person extends initial {

	public function __construct(){}

	public function newPerson($document, $names, $lastnames, $sex, $church, $phone, $email, $startMinistry, $dateIn, $theologicalLevel, $typePerson, $pastoralLevel, $maritalStatus, $academicLevel, $socialSecurity, $typeHome, $birthdate, $user, $affiliation){
		$maxId = mysql_query("select max(id) as id from person");
		$maxId = mysql_fetch_array($maxId);
		$maxId = ++$maxId["id"];
		$data = mysql_query("insert into person(id, `status`, document, names, lastnames, sex, church, phone, email, startMinistry, dateIn, theologicalLevel, typePerson, pastoralLevel, maritalStatus, academicLevel, socialSecurity, typeHome, birthdate, dateChange, user, affiliation)
							values ($maxId, 1, '$document', '$names', '$lastnames', '$sex', '$church', '$phone', '$email', '$startMinistry', '$dateIn', '$theologicalLevel', '$typePerson', '$pastoralLevel', '$maritalStatus', '$academicLevel', '$socialSecurity', '$typeHome', '$birthdate', curdate(), '$user', '$affiliation')");
		
		if($data)
			return 'ok';
		else
			return mysql_error();
	}

	public function update($document, $names, $lastnames, $sex, $church, $phone, $email, $startMinistry, $dateIn, $theologicalLevel, $typePerson, $pastoralLevel, $maritalStatus, $academicLevel, $socialSecurity, $typeHome, $birthdate, $user, $affiliation){
		
		/*$doc = mysql_query("select document from person where document = '$document' and `status` = '1'");
		$doc = mysql_fetch_array($doc);
		$doc = $doc["document"];

		if($document != $doc)
		{
			mysql_query("update person set document = '$document' where document = '$doc'");
		}*/

		#get max id
		$maxId = mysql_query("select max(id) as id from person");
		$maxId = mysql_fetch_array($maxId);
		$maxId = ++$maxId["id"];
		
		$data = mysql_query("insert into person(id, `status`, document, names, lastnames, sex, church, phone, email, startMinistry, dateIn, theologicalLevel, typePerson, pastoralLevel, maritalStatus, academicLevel, socialSecurity, typeHome, birthdate, dateChange, user, affiliation)
							values ($maxId, 1, '$document', '$names', '$lastnames', '$sex', '$church', '$phone', '$email', '$startMinistry', '$dateIn', '$theologicalLevel', '$typePerson', '$pastoralLevel', '$maritalStatus', '$academicLevel', '$socialSecurity', '$typeHome', '$birthdate', curdate(), '$user', '$affiliation')");
		
		if(mysql_query("update person set status = 0 where id != '$maxId'") && $data)
			return $maxId;
		else
			"na";
	}

	public function getPerson($document){
		$sql = mysql_query("select person.*, 
				city.name as city, 
				city.id as idCity, 
				church.name as church,
				church.id as idChurch,
				circuit.id as idCircuit,
				circuit.name,
				circuit.nick,
				circuit.zone
				from person, city, church, circuit
				where person.document = '$document' and person.`status` = '1'
				and person.church = church.id
				and church.city = city.id
				and circuit.id = church.circuit");

		return mysql_fetch_array($sql);
	}

	public function get($document){
		$sql = "select person.*, 
				city.name as city, 
				city.id as idCity, 
				church.name as church,
				church.id as idChurch,
				circuit.id as idCircuit,
				circuit.name,
				circuit.nick,
				circuit.zone
				from person, city, church, circuit
				where person.document = '$document' and person.`status` = '1'
				and person.church = church.id
				and church.city = city.id
				and circuit.id = church.circuit";

		return $this->getAllRows($sql);
	}

	public function getHistory($document){
		$sql = "select person.*, 
				city.name as city, 
				city.id as idCity, 
				church.name as church,
				church.id as idChurch,
				circuit.id as idCircuit,
				circuit.name,
				circuit.nick,
				circuit.zone
				from person, city, church, circuit
				where person.document = '$document'
				and person.church = church.id
				and church.city = city.id
				and circuit.id = church.circuit";

		return $this->getAllRows($sql);
	}
	
	public function getByNames($names){
		$sql = "select person.*, city.name as city, church.name as church 
				from person, city, church 
				where person.names like '%$names%' 
				and person.status = '1'
				and person.church = church.id
				and church.city = city.id
				order by lastnames, names";
		return $this->getAllRows($sql);
	}

	public function getByLastnames($lastnames){
		$sql = "select person.*, city.name as city, church.name as church 
				from person, city, church 
				where person.lastnames like '%$lastnames%' 
										and person.status = '1'
										and person.church = church.id
										and church.city = city.id
										order by lastnames, names";
		return $this->getAllRows($sql);
	}

	public function getByNamesLastnames($names, $lastnames){
		$sql = "select person.*, city.name as city, church.name as church 
				from person, city, church 
				where person.names like '%$names%' 
										and person.lastnames like '%$lastnames%'
										and person.status = '1'
										and person.church = church.id
										and church.city = city.id
										order by lastnames, names";
		return $this->getAllRows($sql);
	}

	/*
	public function getByCity($city){
		$sql = "select * from person where city = '$city'";
		return $this->getAllRows($sql);
	}*/

}