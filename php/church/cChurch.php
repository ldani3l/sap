<?
include_once '../initial.php';
class church extends initial {

	public function __construct(){}

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