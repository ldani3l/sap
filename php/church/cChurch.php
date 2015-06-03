<?
include_once '../initial.php';
class church extends initial {

	public function __construct(){}

	public function churchUpdate($id, $name,$category,$address,$phone,$cellular,$vereda,$email,$countMembers,$personeria,$circuit,$city,$statusICM,$yearDedication,$status,$nit,$user,$affiliation){
		
		$data = mysql_query("update church set `name` = '$name',`category` = '$category',`address` = '$address', `phone` = '$phone', `cellular` = '$cellular',
		`vereda` = '$vereda', `email` = '$email',`countMembers` = '$countMembers',`personeria` = '$personeria',`circuit` = '$circuit',`city` = '$city',`statusICM` = '$statusICM',
		`yearDedication` = '$yearDedication',`status` = '$status',`nit` = '$nit',`user` = '$user',`affiliation` = '$affiliation' where id = '$id'");
							
		if($data)
			return "ok";
	}

	public function churchNew($name,$category,$address,$phone,$cellular,$vereda,$email,$countMembers,$personeria,$circuit,$city,$statusICM,$yearDedication,$status,$nit,$user,$affiliation){
		$maxId = mysql_query("select max(id) as id from church");
		$maxId = mysql_fetch_array($maxId);
		$maxId = ++$maxId["id"];
		$data = mysql_query("insert into church(`id`,`name`,`category`,`address`,`phone`,`cellular`,`vereda`,`email`,`countMembers`,`personeria`,`circuit`,`city`,`statusICM`,`yearDedication`,`status`,`nit`,`user`,`affiliation`)
							values ('$maxId','$name','$category','$address','$phone','$cellular','$vereda','$email','$countMembers','$personeria','$circuit','$city','$statusICM','$yearDedication','$status','$nit','$user','$affiliation')");
	}

	public function get($id){
		$sql = "select * from church where id = $id";
		return $this->getOneRow($sql);
	}

	public function getByCircuit($circuit){
		$sql = "select * from church where circuit = '$circuit' order by name";
		return $this->getAllRows($sql);
	}

	public function getByCity($city){
		$sql = "select * from church where city = '$city'";
		return $this->getAllRows($sql);
	}

}