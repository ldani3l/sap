<?
include_once "../app.php";
conectar();
header("Content-type:application/json");

#$c = new circuit();
#$data = $c->gets(3);

#$c = new circuit();
#$data = $c->gets(3);

#$z = new zone();
#$data = $z->getAll();

#$c = new church();
#$data = $c->getByCity(1001);

$c = new person();
$data = $c->get(15157028);

echo json_encode($data);
	
?>