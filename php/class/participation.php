<?
include_once '../initial.php';
class participation extends initial {

	public function __construct(){}

	public function get($id){
		$sql = "select * from participation where id = $id";
		return $this->getOneRow($sql);
	}
}