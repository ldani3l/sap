<?
include_once '../initial.php';
class city extends initial {

	public function __construct(){}

	public function get($id){
		$sql = "select * from city where id = $id";
		return $this->getOneRow($sql);
	}

	public function gets($department){
		$sql = "select * from city where department = '$department'";
		return $this->getAllRows($sql);
	}
}