<?
include_once '../initial.php';
class circuit extends initial {

	public function __construct(){}

	public function get($id){
		$sql = "select * from circuit where id = $id";
		return $this->getOneRow($sql);
	}

	public function gets($zone){
		$sql = "select * from circuit where zone = '$zone'";
		return $this->getAllRows($sql);
	}
}