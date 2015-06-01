<?php
$library = "DbConnection.inc.php";
if (is_readable($library)){
        require $library;}else{
        throw new RuntimeException("No se Pudo Incluir la ${library}");
}


$db = new DbConnection();

switch (@$_REQUEST['action'])
{
    case "consultar" :
    $db->connect();
      $data =  $db->getAllRows("SELECT * FROM Employees");
    $db->disconnect();    
   echo json_encode($data);  
        
    exit;
   
          
}


?>
<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8" />
<title></title>
<script type="text/javascript" src='jquery-1.7.1.min.js' ></script>
<script type="text/javascript">
$(function(){ 
  $("#consultar").click(function(){
    $("#receptor").text("Consultando....");        
      $.post("ajaxtuto.php",{action:"consultar"},respuesta,'json')
        
});
});



function respuesta(arg){
    
   $("#receptor").html(arg.toSource());
}
</script>
</head>
<body>
    </br>
    <input type="button" id="consultar" value="consultar">
    <div id="receptor" style="border: solid 1px black; height: 100%; width: 100%;"></div>
</body>
</html>
