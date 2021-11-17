<?php

class dbManager {
    private $db = 'oci:dbname=XE';
    private $user = 'hr';
    private $pass = 'hr01';

    
    public function Connect(){
        try{
            $base = new PDO($this->db, $this-> user, $this-> pass);
            $base -> exec("SELECT * FROM EMPLOYEES");

            return $base;
                
        }catch(Exception $e){
            return "Error: " .$e->getMessage();
        }
    }
}   
?>