<?
include '../app.php';
conectar();
header("Content-type:application/json");

$action = $_GET["action"];

switch($action){
    case 'reportFilters':

        $zone = $_GET["zone"];
        $accion = $_GET["accion"];
        $typePerson = $_GET["typePerson"];
        $participation = $_GET["participation"];
        $idPrice = $_GET["idPrice"];

        $e = new event();
        $au = '';
        $dato = $e->getActualEvent();
        for ($i=0;$i<count($dato);$i++){
            $au = $dato[$i]["event"];
        }

        $d = 0;
        $u = new user();
        if($accion == "viewAll"){
            $json = $u->reportAll($au); 
            $d = 1;
        }
        else if($zone != '? undefined:undefined ?' && ($participation == '' && $idPrice == '? undefined:undefined ?' && $typePerson == '')){
            $json = $u->reportByZone($au, $zone);
            $d = 2;
        }
        else if($zone != '? undefined:undefined ?' && $typePerson != '' && ($participation == '' && $idPrice == '? undefined:undefined ?')){
            $json =  $u->reportEventZoneTypePerson($au, $zone, $typePerson);
            $d = 3;
        }
        else if($zone != '? undefined:undefined ?' && $typePerson && $participation && $idPrice == '? undefined:undefined ?'){
            $json =  $u->reportEventZoneTypePersonParticipation($au, $zone, $typePerson, $participation);
            $d = 4;
        }
        else if($zone != '? undefined:undefined ?' && $typePerson && $participation && $idPrice != '? undefined:undefined ?'){
            $json =  $u->reportEventZoneTypePersonParticipationPrice($au, $zone, $typePerson, $participation, $idPrice);
            $d = 5;
        }
        else if($participation && ($zone == '? undefined:undefined ?' && $typePerson == '' && $idPrice == '? undefined:undefined ?')){
            $json =  $u->getAllByParticipation($au, $participation);
            $d = 6;
        }
        else if($idPrice != '? undefined:undefined ?' && ($zone == '? undefined:undefined ?' && $typePerson == '' && $participation == '')){
            $json =  $u->getAllByPrice($au, $idPrice);
            $d = 7;
        }

        if($json == false)
            echo "[]";
        else
            echo json_encode($json);

    break;

    case 'reportUser':

        $user = $_GET["user"];
        
        $e = new event();
        $au = '';
        $dato = $e->getActualEvent();
        for ($i=0;$i<count($dato);$i++){
            $au = $dato[$i]["event"];
        }
        //echo $au;
        $u = new user();
        $json = $u->reportUser($user, $au);
        if($json == false)
            echo "[]";
        else
            echo json_encode($json);
    break;

    


    case 'login':

        $data = json_decode(file_get_contents("php://input"));

        $user = $data->user;
        $pass = $data->pass;

        $u = new user();
        echo $u->login($user, $pass);
    break;


    case 'getTypeUser':
        $user = $_GET["user"];
        $u = new user();
        $result = $u->getTypeUser($user);
        echo $result;
    break;

    case 'getDateTime':
        $fecha = date('Y-m-d')." ".date('G:i:s');
        echo $fecha;
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