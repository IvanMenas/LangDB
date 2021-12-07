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
}   
?>