<?
include_once '../initial.php';
class zone extends initial {

	public function __construct(){}

	public function getAll(){
		$sql = "select * from zone";
		return $this->getAllRows($sql);
	}

}