<?php

class dbManager {
    private $db = 'oci:dbname=XE';
    private $user = 'hr';
    private $pass = 'hr01';
    private $conn;

    public function __construct()
    {
        if($this->conn == null){
            $this->Connect();
        }
    }
    public function Connect(){
        try{
           $this-> conn = new PDO($this->db, $this-> user, $this-> pass);
           $this-> conn ->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
           return "Connection successful";
                
        }catch(PDOException  $e){
            return "Error: " .$e->getMessage();
        }
    }

    //Solo para guiarse a como hacer una query
    public function Select(){
        $sql_stmt = $this-> conn  -> prepare("SELECT * FROM EMPLOYEES");
        $sql_stmt->execute();
        $result = $sql_stmt->fetchAll(PDO::FETCH_ASSOC);
        return $result;
    }
}   
?>