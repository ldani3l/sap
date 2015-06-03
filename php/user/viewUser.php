<?
include '../app.php';
conectar();
header("Content-type:application/json");

$action = $_GET["action"];

switch($action){
    case 'login':

    $data = json_decode(file_get_contents("php://input"));

    $user = $data->user;
    $pass = $data->pass;

    $u = new user();
    echo $u->login($user, $pass);
    /*if($type == 'admin' || $type == 'user')
    {
        
    }
    else
        echo "[]";*/
    break;

    case 'getUrls':
        $data = json_decode(file_get_contents("php://input"));
        $type = $data->type;
        $u = new user();
        $urls = $u->getUrls($type);
        echo json_encode($urls);
        //session_start();
        //$_SESSION["idUsuario"] = $tipo["user"];
    break;
}
?>