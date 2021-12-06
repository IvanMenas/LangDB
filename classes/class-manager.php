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
			
        case 'loadUserAccount':
            $r->d = $dbm->loadUserAccount(filterInput('iduser'));
			break;
		case 'loadCompanies':
			$r->d = $dbm->loadCompanies();
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