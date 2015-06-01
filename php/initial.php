<?php
class initial
{   
	public function __construct()
	{
	}
	
	#obtener todas las columnas
	public function getAllRows($sql)
	{
		$results = mysql_query($sql);
		$count   = 0;
		$rows	= array();
		while ($row = mysql_fetch_assoc($results)) {
			$rows[] = $row;
			$count++;
		}
		return ($count) ? $rows : false;
	}
	#obtener una sola columna
	public function getOneColumn($sql)
	{
		$results = @mysql_query($sql);
		$count   = 0;
		$rows	= array();
		while ($row = mysql_fetch_array($results)) {
			$rows[] = $row[0];
			$count++;
		}
		return ($count) ? $rows : false;
	}
	#obtener dos columnas
	public function getArrayPair($sql)
	{
		$results = @mysql_query($sql);
		$count   = 0;
		$rows	= array();
		while ($row = mysql_fetch_array($results)) {
			$rows[$row[0]] = $row[1];
			$count++;
		}
		return ($count) ? $rows : false;
	}
	#obtener un solo registro o fila
	public function getOneRow($sql)
	{
		$results = @mysql_query($sql);
		if ($row = mysql_fetch_assoc($results)) {
			return $row;
		}
		return false;
	}
	#obtener un valor
	public function getOneValue($sql)
	{
		$results = @mysql_query($sql);
		if ($row = mysql_fetch_array($results)) {
			return $row[0];
		}
		return false;
	}
	#ejecutar consulta
	public function executeQuery($sql)
	{
		if (!@mysql_query($sql)) {
			$this->errors[] = mysql_error();
			return false;
		}
		return true;
	}
	public function getErrors()
	{
		return $this->errors;
	}
	#obtener ultimo id insertado
	/*public function getLastId()
	{
	return mysql_insert_id($this->db_connection);
	}*/
	#contar todos los registros de una tabla
	public function countRows($table)
	{
		if (!is_string($table)) {
			throw new InvalidArgumentException("table_name isn't an string");
		}
		if (!$results = @mysql_query("SELECT COUNT(*) as total FROM $table")) {
			throw new RunTimeException("Couldn't execute query: " . mysql_error());
		}
		$count = mysql_fetch_array($results);
		$count = $count['total'];
		return ($count) ? $count : 0;
	}
}
?>