<?
include_once '../initial.php';
class user extends initial {

	public function __construct(){}

    public function updatePass($user, $pass){
        $result = mysql_query("update users set pass = password('$pass') where user = '$user'");
        if($result)
            return "ok";
        else
            return $result;
    }

	public function login($user, $pass){
        $result = mysql_query("select * from users where user='$user' and pass = password('$pass')");
        $result = mysql_fetch_array($result);
        return $result["type"];
    }

    public function getUrls($type){
        $sql = "select * from `privileges` where typeUser = '$type'";
        return $this->getAllRows($sql);
    }

    public function newUser($user, $pass, $email, $type){
		$result = mysql_query("insert into users(`user`, pass, email, `type`)
                            values('$user', password('$pass'), '$email', '$type')");
        if($result)
            return "ok";
        else
            return $result;
    }

    public function getUsers(){
        $sql = "select user from users where type = 'user'";
        return $this->getAllRows($sql);
    }
}