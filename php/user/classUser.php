<?
include_once '../initial.php';
date_default_timezone_set('America/Bogota'); 
class user extends initial {

	public function __construct(){}

    /*########################  REPORTES  ########################*/
    #reporte por zona y evento
    public function reportByZone($event, $zone){
        $sql = "select 
                    prices.*,
                    person.document,
                    person.names,
                    person.lastnames,
                    participation.date,
                    participation.id,
                    participation.participation
                    from 
                    person,
                    event,
                    prices,
                    participation,
                    church, 
                    circuit
                    where
                    person.id = participation.person
                    and participation.idPrice = prices.id
                    and event.id = prices.event
                    and event.id = '$event'
                    and person.church = church.id
                    and church.circuit = circuit.id
                    and circuit.zone = '$zone'
                    order by person.lastnames, person.names";
        return $this->getAllRows($sql);
    }

    public function getAllByPrice($event, $price){
        $sql = "select 
                    prices.*,
                    person.document,
                    person.names,
                    person.lastnames,
                    participation.date,
                    participation.id,
                    participation.participation
                    from 
                    person,
                    event,
                    prices,
                    participation,
                    church, 
                    circuit
                    where
                    person.id = participation.person
                    and participation.idPrice = prices.id
                    and event.id = prices.event
                    and event.id = '$event'
                    and person.church = church.id
                    and church.circuit = circuit.id
                    and prices.id = '$price'
                    order by person.lastnames, person.names";
        return $this->getAllRows($sql);
    }

    public function getAllByParticipation($event, $participation){
        $sql = "select 
                    prices.*,
                    person.document,
                    person.names,
                    person.lastnames,
                    participation.date,
                    participation.id,
                    participation.participation
                    from 
                    person,
                    event,
                    prices,
                    participation,
                    church, 
                    circuit
                    where
                    person.id = participation.person
                    and participation.idPrice = prices.id
                    and event.id = prices.event
                    and event.id = '$event'
                    and person.church = church.id
                    and church.circuit = circuit.id
                    and participation.participation = '$participation'
                    order by person.lastnames, person.names";
        return $this->getAllRows($sql);
    }

    public function reportEventZoneTypePersonParticipationPrice($event, $zone, $typePerson, $participation, $idPrice){
        $sql = "select 
                    prices.*,
                    person.document,
                    person.names,
                    person.lastnames,
                    participation.date,
                    participation.id,
                    participation.participation
                    from 
                    person,
                    event,
                    prices,
                    participation,
                    church, 
                    circuit
                    where
                    person.id = participation.person
                    and participation.idPrice = prices.id
                    and event.id = prices.event
                    and event.id = '$event'
                    and person.church = church.id
                    and church.circuit = circuit.id
                    and person.typePerson = '$typePerson'
                    and participation.participation = '$participation'
                    and circuit.zone = '$zone'
                    and prices.id = '$idPrice'
                    order by person.lastnames, person.names";
        return $this->getAllRows($sql);
    }

    public function reportEventZoneTypePersonParticipation($event, $zone, $typePerson, $participation){
        $sql = "select 
                    prices.*,
                    person.document,
                    person.names,
                    person.lastnames,
                    participation.date,
                    participation.id,
                    participation.participation
                    from 
                    person,
                    event,
                    prices,
                    participation,
                    church, 
                    circuit
                    where
                    person.id = participation.person
                    and participation.idPrice = prices.id
                    and event.id = prices.event
                    and event.id = '$event'
                    and person.church = church.id
                    and church.circuit = circuit.id
                    and person.typePerson = '$typePerson'
                    and participation.participation = '$participation'
                    and circuit.zone = '$zone'
                    order by person.lastnames, person.names";
        return $this->getAllRows($sql);
    }

    public function reportEventZoneTypePerson($event, $zone, $typePerson){
        $sql = "select 
                    prices.*,
                    person.document,
                    person.names,
                    person.lastnames,
                    participation.date,
                    participation.id,
                    participation.participation
                    from 
                    person,
                    event,
                    prices,
                    participation,
                    church, 
                    circuit
                    where
                    person.id = participation.person
                    and participation.idPrice = prices.id
                    and event.id = prices.event
                    and event.id = '$event'
                    and person.church = church.id
                    and church.circuit = circuit.id
                    and person.typePerson = '$typePerson'
                    and circuit.zone = '$zone'
                    order by person.lastnames, person.names";
        return $this->getAllRows($sql);
    }

    public function reportAll($event){
        $sql = "select 
                    prices.*,
                    person.document,
                    person.names,
                    person.lastnames,
                    participation.date,
                    participation.id,
                    participation.participation
                    from 
                    person,
                    event,
                    prices,
                    participation
                    where
                    person.id = participation.person
                    and participation.idPrice = prices.id
                    and event.id = prices.event
                    and event.id = '$event'
                    order by person.lastnames, person.names";
        return $this->getAllRows($sql);
    }

    public function reportUser($user, $event){
        $sql = "select 
                    prices.*,
                    person.document,
                    person.names,
                    person.lastnames,
                    participation.date,
                    participation.id,
                    participation.participation
                    from 
                    person,
                    event,
                    prices,
                    participation
                    where
                    participation.user = '$user'
                    and person.id = participation.person
                    and participation.idPrice = prices.id
                    and event.id = prices.event
                    and event.id = '$event'
                    order by person.lastnames, person.names";
        return $this->getAllRows($sql);
    }

    







    /*########################  USUARIOS  ########################*/
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

    public function getTypeUser($user){
        $sql = mysql_query("select * from users where `user` = '$user'");
        $sql = mysql_fetch_array($sql);
        return $sql["type"];
    }

    public function getUsers(){
        $sql = "select user from users where type = 'user'";
        return $this->getAllRows($sql);
    }
}