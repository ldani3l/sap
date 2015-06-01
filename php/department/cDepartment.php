<?
include_once '../initial.php';
class department extends initial {

	public function __construct(){}

	public function getAll(){
		$sql = "select * from department";
		return $this->getAllRows($sql);
	}


}