<?
include_once "../app.php";
conectar();
header("Content-type:application/json");

$action = $_GET["action"];

switch($action){
	case 'new':
		$data = json_decode(file_get_contents("php://input"));
		
		$document = $data->document;
		$names = $data->names;
		$lastnames = $data->lastnames;
		$sex = $data->sex;
		$church = $data->church;
		$phone = $data->phone;
		$email = $data->email;
		$startMinistry = $data->startMinistry;
		$dateIn = $data->dateIn;
		$theologicalLevel = $data->theologicalLevel;
		$typePerson = $data->typePerson;
		$pastoralLevel = $data->pastoralLevel;
		$maritalStatus = $data->maritalStatus;
		$academicLevel = $data->academicLevel;
		$typeHome = $data->typeHome;
		$birthdate = $data->birthdate;
		$socialSecurity = $data->socialSecurity;
		$user = $data->user;
		$affiliation = $data->affiliation;
		$whereLive = $data->whereLive;

		$p = new person();
		$result = $p->newPerson($document, $names, $lastnames, $sex, $church, $phone, $email, $startMinistry, $dateIn, $theologicalLevel, $typePerson, $pastoralLevel, $maritalStatus, $academicLevel, $socialSecurity, $typeHome, $birthdate, $user, $affiliation, $whereLive);
		echo $result;

	break;

	case 'update':
		$data = json_decode(file_get_contents("php://input"));
		
		$id = $data->id;
		$document = $data->document;
		$names = $data->names;
		$lastnames = $data->lastnames;
		$sex = $data->sex;
		$church = $data->church;
		$phone = $data->phone;
		$email = $data->email;
		$startMinistry = $data->startMinistry;
		$dateIn = $data->dateIn;
		$theologicalLevel = $data->theologicalLevel;
		$typePerson = $data->typePerson;
		$pastoralLevel = $data->pastoralLevel;
		$maritalStatus = $data->maritalStatus;
		$academicLevel = $data->academicLevel;
		$typeHome = $data->typeHome;
		$birthdate = $data->birthdate;
		$socialSecurity = $data->socialSecurity;
		$user = $data->user;
		$affiliation = $data->affiliation;
		$whereLive = $data->whereLive;

		$p = new person();
		$result = $p->update($id, $document, $names, $lastnames, $sex, $church, $phone, $email, $startMinistry, $dateIn, $theologicalLevel, $typePerson, $pastoralLevel, $maritalStatus, $academicLevel, $socialSecurity, $typeHome, $birthdate, $user, $affiliation, $whereLive);
		echo $result;
	break;
	
	case 'person-history':
		$document = $_GET["document"];

		$p = new person();

		$json = $p->getHistory($document);
		
		if($json == false)
			echo "[]";
		else
			echo json_encode($json);

	break;

	case 'look-for':
		$data = json_decode(file_get_contents("php://input"));
		$document = $_GET["document"];
		$names = $_GET["names"];
		$lastnames = $_GET["lastnames"];

		$p = new person();

		if($document)
			$json = $p->get($document);
		else if($names && !$lastnames)
			$json = $p->getByNames($names);
		else if(!$names && $lastnames)
			$json = $p->getByLastnames($lastnames);
		else if($names && $lastnames)
			$json = $p->getByNamesLastnames($names, $lastnames);
		
		if($json == false)
			echo "[]";
		else
			echo json_encode($json);
		//echo $json;
	break;

	/*
	case 'update':
		$data = mysql_query("select * from person");

		for($i=0; $i<mysql_num_rows($data); $i++)
		{
			$datos = mysql_fetch_array($data);
			$id = $datos["id"];
			$nombres = $datos["firstname"]." ".$datos["middlename"];
			$apellidos =  $datos["surname"]." ".$datos["secondsurname"];


			mysql_query("update person set firstname = '$nombres', surname = '$apellidos' where id = '$id'");
		}
	break;*/
}