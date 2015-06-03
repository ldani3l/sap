<?
include_once '../initial.php';
class user extends initial {

	public function __construct(){}

	public function login($user, $pass){
		$result = mysql_query("select * from users where user='$user' and pass = password('$pass')");
        $result = mysql_fetch_array($result);
		return $result["type"];
    }
    public function getUrls($type){
        $sql = "select * from `privileges` where typeUser = '$type'";
        return $this->getAllRows($sql);
    }
}