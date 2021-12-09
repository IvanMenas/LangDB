<?php
require_once './config.php';

class dbManager {
    private $conn;
    private $conf;

    public function __construct()
    {
        GLOBAL $config;
		$this->conf = $config;
        if($this->conn == null){
            $this->Connect();
        }
    }

    public function Connect(){
        try{
           $this-> conn = new PDO($this->conf->pdoSQL->db, $this->conf->pdoSQL->user, $this->conf->pdoSQL->pass);
           $this-> conn ->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            return "Connection successful";
                
        }catch(PDOException  $e){
            return "Error: " .$e->getMessage();
        }
    }

    public function loadUserAccount($iduser){
        try{
            $sql_stmt = $this-> conn  -> prepare(" 
                SELECT * FROM CUENTA C
                JOIN DIVISA  D
                ON C.IDDIVISA = D.IDDIVISA
                WHERE IDUSER = $iduser
            ");
            $sql_stmt->execute();
            $result = $sql_stmt->fetchAll(PDO::FETCH_ASSOC);
            return $result;
        }catch(PDOException  $e){
            return "Error: " .$e->getMessage();
        }
    }

    public function loadCompanies(){
        try{
            $sql_stmt = $this-> conn  -> prepare("SELECT * FROM EMPRESA");
            $sql_stmt->execute();
            $result = $sql_stmt->fetchAll(PDO::FETCH_ASSOC);
            return $result;
        }catch(PDOException  $e){
            return "Error: " .$e->getMessage();
        }
    }

    public function getDivisas(){
        try{
            $sql_stmt = $this-> conn  -> prepare("SELECT * FROM DIVISA");
            $sql_stmt->execute();
            $result = $sql_stmt->fetchAll(PDO::FETCH_ASSOC);
            return $result;
        }catch(PDOException  $e){
            return "Error: " .$e->getMessage();
        }
    }

    public function setAccount($iduser, $idIBAN, $idDivisa, $credito){
        try{
            $iduser = (int)$iduser;
            $idDivisa = (int)$idDivisa;
            $credito = (int)$credito;
           
            $sql_stmt = $this-> conn  -> prepare("SELECT MAX(IDCUENTA)+1  AS IDCUENTA FROM CUENTA");
            $sql_stmt->execute();
            $result = $sql_stmt->fetchAll(PDO::FETCH_ASSOC);
            $idCuenta = (int)$result[0]['IDCUENTA'];
            
            $sql_stmt = $this-> conn  -> prepare("
            INSERT INTO CUENTA(IDCUENTA, IDUSER, IDBAN, IDDIVISA, SALDOTOTAL, SALDOACTUAL, SALDORETENIDO, CREDITO, SISTEMAPAGO)
            VALUES
            ($idCuenta, $iduser, '$idIBAN', $idDivisa, 150000, 85000, 65000, $credito, 0)
            ");
            $sql_stmt->execute();
            $sql_stmt->fetchAll(PDO::FETCH_ASSOC);
            return "1";
        }catch(PDOException  $e){
            return "Error: " .$e->getMessage();
        }
    }
    
    public function getLastAccountID(){
        try{
            $sql_stmt = $this-> conn  -> prepare("SELECT MAX(IDCUENTA)+1 FROM CUENTA");
            $sql_stmt->execute();
            $result = $sql_stmt->fetchAll(PDO::FETCH_ASSOC);
            return $result;
        }catch(PDOException  $e){
            return "Error: " .$e->getMessage();
        }
    }
    
    public function removeAccount($idIBAN){
        try{
            $sql_stmt = $this-> conn  -> prepare("DELETE CUENTA WHERE IDBAN = '$idIBAN'");
            $sql_stmt->execute();
            $sql_stmt->fetchAll(PDO::FETCH_ASSOC);
            return "1";
        }catch(PDOException  $e){
            return "Error: " .$e->getMessage();
        }
    }
    
    public function getTargetSinpeAccount($telefonoDestino){
        try{
            $telefonoDestino = (int)$telefonoDestino;
            $sql_stmt = $this-> conn  -> prepare("SELECT * FROM USUARIO_PERSONAL_INFO WHERE TELEFONO = $telefonoDestino");
            $sql_stmt->execute();
            $result = $sql_stmt->fetchAll(PDO::FETCH_ASSOC);
            return $result;
        }catch(PDOException  $e){
            return "Error: " .$e->getMessage();
        }
    }

    public function execSinpeMov($iduser, $idCuentaOrigen, $idCuentaDestino, $monto){
        try{
            $idCuentaOrigen = (int)$idCuentaOrigen;
            $monto = (int)$monto;
            $sql_stmt = $this-> conn  -> prepare("UPDATE CUENTA SET 
                SALDOTOTAL = SALDOTOTAL - $monto  WHERE IDCUENTA = $idCuentaOrigen
            ");
            $sql_stmt->execute();
            $result = $sql_stmt->fetchAll(PDO::FETCH_ASSOC);
            return $result;
        }catch(PDOException  $e){
            return "Error: " .$e->getMessage();
        }
    }
}   
?>