<?
include_once '../initial.php';
class city extends initial {

	public function __construct(){}

	public function getAllByDepartment($department){
		$sql = "select * from city where department = '$department'";
		return $this->getAllRows($sql);
	}
}