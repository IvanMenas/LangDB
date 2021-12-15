<?php
require_once './dba-class.php';
require_once './config.php';


$r = new stdClass();
$r->errCode = 0;
$r->errMsg = '';

$dbm = new dbManager();

try{
    $f = filterInput('f');
    switch ($f) {
        case 'Connect':
            $r->d = $dbm->Connect();
			break;
        case 'login':
            $r->d = $dbm->login(filterInput('username'), filterInput('password'));
			break;
        case 'singup':
            $r->d = $dbm->singup(filterInput('nombre'), filterInput('apellido'), filterInput('cedula'), filterInput('username'), 
			filterInput('telefono'), filterInput('direccion'), filterInput('correo'), filterInput('password'));
			break;
        case 'loadUserAccount':
            $r->d = $dbm->loadUserAccount(filterInput('iduser'));
			break;
		case 'loadCompanies':
			$r->d = $dbm->loadCompanies();
			break;
		case 'getDivisas':
			$r->d = $dbm->getDivisas();
			break;
		case 'setAccount':
			$r->d = $dbm->setAccount(filterInput('iduser'),filterInput('idIBAN'),filterInput('idDivisa'),filterInput('credito'));
			break;
		case 'EditProfile':
			$r->d = $dbm->EditProfile(filterInput('iduser'),filterInput('telefono'),filterInput('correo'));
			break;
		case 'removeAccount':
			$r->d = $dbm->removeAccount(filterInput('idIBAN'));
			break;
		case 'getTargetSinpeAccount':
			$r->d = $dbm->getTargetSinpeAccount(filterInput('telefonoDestino'));
			break;
		case 'execSinpe':
			$r->d = $dbm->execSinpeMov(filterInput('iduser'), filterInput('idCuentaOrigen'), filterInput('idCuentaDestino'), filterInput('monto'));
			break;
		break;
    }
	
}catch  (Exception $ex){

}

function filterInput($s) {
	if (filter_has_var(INPUT_GET, $s)) {
		$f = filter_input(INPUT_GET, $s);
	} else if (filter_has_var(INPUT_POST, $s)) {
		$f = filter_input(INPUT_POST, $s);
	} else {
		throw new Exception("Missing paramether", 100);
	}
	return $f;
}

header('Content-Type: application/json');
echo(json_encode($r));
?>