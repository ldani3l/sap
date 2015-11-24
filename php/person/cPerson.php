<?
include_once '../initial.php';
class person extends initial {

	public function __construct(){}

	public function newPerson($document, $names, $lastnames, $sex, $church, $phone, $email, $startMinistry, $dateIn, $theologicalLevel, $typePerson, $pastoralLevel, $maritalStatus, $academicLevel, $socialSecurity, $typeHome, $birthdate, $user, $affiliation, $whereLive){
		$maxId = mysql_query("select max(id) as id from person");
		$maxId = mysql_fetch_array($maxId);
		$maxId = ++$maxId["id"];
		$data = mysql_query("insert into person(id, `status`, document, names, lastnames, sex, church, phone, email, startMinistry, dateIn, theologicalLevel, typePerson, pastoralLevel, maritalStatus, academicLevel, socialSecurity, typeHome, birthdate, dateChange, user, affiliation, whereLive, `repeat`)
							values ($maxId, 1, '$document', '$names', '$lastnames', '$sex', '$church', '$phone', '$email', '$startMinistry', '$dateIn', '$theologicalLevel', '$typePerson', '$pastoralLevel', '$maritalStatus', '$academicLevel', '$socialSecurity', '$typeHome', '$birthdate', curdate(), '$user', '$affiliation', '$whereLive', 'true')");
		
		if($data)
			return 'ok';
		else
			return mysql_error();
	}

	public function update($id, $document, $names, $lastnames, $sex, $church, $phone, $email, $startMinistry, $dateIn, $theologicalLevel, $typePerson, $pastoralLevel, $maritalStatus, $academicLevel, $socialSecurity, $typeHome, $birthdate, $user, $affiliation, $whereLive){
		
		$doc = mysql_query("select document from person where id = '$id'");
		$doc = mysql_fetch_array($doc);
		$doc = $doc["document"];

		mysql_query("update person set document = '$document' where document = '$doc'");

		#get max id
		$maxId = mysql_query("select max(id) as id from person");
		$maxId = mysql_fetch_array($maxId);
		$maxId = ++$maxId["id"];
		
		$data = mysql_query("insert into person(id, `status`, document, names, lastnames, sex, church, phone, email, startMinistry, dateIn, theologicalLevel, typePerson, pastoralLevel, maritalStatus, academicLevel, socialSecurity, typeHome, birthdate, dateChange, user, affiliation, whereLive, `repeat`)
							values ($maxId, 1, '$document', '$names', '$lastnames', '$sex', '$church', '$phone', '$email', '$startMinistry', '$dateIn', '$theologicalLevel', '$typePerson', '$pastoralLevel', '$maritalStatus', '$academicLevel', '$socialSecurity', '$typeHome', '$birthdate', curdate(), '$user', '$affiliation', '$whereLive', 'true')");
		if($data)
			if(mysql_query("update person set status = 0 where id != '$maxId' and document = '$document'"))
				return $maxId;
			else
				return "na";
		else
			return "na";
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
				where person.document = '$document'
				and person.church = church.id
				and church.city = city.id
				and person.`status` = '1'
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
				and circuit.id = church.circuit
				order by person.id desc";

		return $this->getAllRows($sql);
	}
	
	public function getByNames($names){
		/*$sql = "select person.*, city.name as city, church.name as church, Count(*) As cantidad 
				from person, city, church 
				where person.names like '%$names%' 
				
				and person.church = church.id
				and church.city = city.id
				Group By person.document
				order by lastnames, names";*/

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
										
										and person.church = church.id
										and church.city = city.id
										and person.status = '1'
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