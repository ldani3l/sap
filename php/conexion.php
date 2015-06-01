<?
function conectar()
{   $result = mysql_connect('127.0.0.1', 'root', 'root');
   if (!$result)
   {   	echo mysql_error();
   		return false;
   }
   if (!mysql_select_db("sap"))
   {   	echo mysql_error();
   		return false;
   }
   mysql_query("SET NAMES 'utf8'");
   	return $result;
}
