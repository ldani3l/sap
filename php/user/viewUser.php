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

    case 'newUser':
        $data = json_decode(file_get_contents("php://input"));
        
        $type = $data->type;
        $email = $data->email;
        $user = $data->user;
        $pass = $data->pass;

        $u = new user();
        $urls = $u->newUser($user, $pass, $email, $type);
        echo $urls;

    break;

    case 'getUsers':
        $u = new user();
        $urls = $u->getUsers();
        echo json_encode($urls);
    break;

    case 'updatePass':
        $data = json_decode(file_get_contents("php://input"));
        $pass = $data->pass;
        $user = $data->user;
        $u = new user();
        $urls = $u->updatePass($user, $pass);
        echo $urls;
    break;

    case 'getUrls':
        $data = json_decode(file_get_contents("php://input"));
        $type = $data->type;
        $u = new user();
        $urls = $u->getUrls($type);
        echo json_encode($urls);
    break;
}
?>