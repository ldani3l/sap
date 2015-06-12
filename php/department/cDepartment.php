<?
include_once '../initial.php';
class department extends initial {

	public function __construct(){}

	public function getAll(){
		$sql = "select * from department";
		return $this->getAllRows($sql);
	}

	public function getById($id){
		$sql = "select * from department where id = '$id'";
		return $this->getOneRow($sql);
	}


}