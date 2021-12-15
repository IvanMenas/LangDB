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

    public function login($username, $password){
        try{
            $out = 0;
            $sql_stmt = $this-> conn  -> prepare("
                CALL VALIDAR_SESION('$username', '$password' , :out )
            ");
            $sql_stmt->bindParam(':out',$out,PDO::PARAM_INT|PDO::PARAM_INPUT_OUTPUT, 40);

            $sql_stmt->execute();
            return $out;
        }catch(PDOException  $e){
            return "Error: " .$e->getMessage();
        }
    }

    public function singup($nombre, $apellido, $cedula,  $username, $telefono, $direccion, $correo, $password){
        try{
            $telefono = (int)$telefono;
            $out = "";
            
            $sql_stmt = $this-> conn  -> prepare("
                CALL EDITAR_INFORMACION_USUARIO('$nombre', '$apellido', '$cedula',  '$username', $telefono, '$direccion', '$correo', '$password',:out)
            ");
            $sql_stmt->bindParam(':out',$out,PDO::PARAM_STR|PDO::PARAM_INPUT_OUTPUT, 40);

            $sql_stmt->execute();
            return $out;
        }catch(PDOException  $e){
            return "Error: " .$e->getMessage();
        }
    } 


    public function loadUserAccount($iduser){
        try{
            $sql_stmt = $this-> conn  -> prepare(" 
                    SELECT * FROM CUENTAS C
                    JOIN DIVISAS D ON C.ID_DIVISA = D.ID_DIVISA
                    WHERE ID_USER = $iduser
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
            $sql_stmt = $this-> conn  -> prepare("SELECT * FROM EMPRESAS");
            $sql_stmt->execute();
            $result = $sql_stmt->fetchAll(PDO::FETCH_ASSOC);
            return $result;
        }catch(PDOException  $e){
            return "Error: " .$e->getMessage();
        }
    }

    public function getDivisas(){
        try{
            $sql_stmt = $this-> conn  -> prepare("SELECT * FROM DIVISAS");
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
            $out = "";
            
            $sql_stmt = $this-> conn  -> prepare("
                CALL AGREGAR_CUENTA_BANCARIA($iduser, $idDivisa, 1, '$idIBAN', 0, 0, 0, $credito, :out)
            ");
            $sql_stmt->bindParam(':out',$out,PDO::PARAM_STR|PDO::PARAM_INPUT_OUTPUT, 40);

            $sql_stmt->execute();
            return "1";
        }catch(PDOException  $e){
            return "Error: " .$e->getMessage();
        }
    }
    
    public function getLastAccountID(){
        try{
            $sql_stmt = $this-> conn  -> prepare("SELECT MAX(ID_CUENTA)+1 FROM CUENTAS");
            $sql_stmt->execute();
            $result = $sql_stmt->fetchAll(PDO::FETCH_ASSOC);
            return $result;
        }catch(PDOException  $e){
            return "Error: " .$e->getMessage();
        }
    }
    
    public function removeAccount($idIBAN){
        try{
            $out = "";
            
            $sql_stmt = $this-> conn  -> prepare("
                CALL ELIMINAR_CUENTA_BANCARIA('$idIBAN', :out)
            ");
            $sql_stmt->bindParam(':out',$out,PDO::PARAM_STR|PDO::PARAM_INPUT_OUTPUT, 40);

            $sql_stmt->execute();
            return $out;
        }catch(PDOException  $e){
            return "Error: " .$e->getMessage();
        }
    }
    
    public function getTargetSinpeAccount($telefonoDestino){
        try{
            $telefonoDestino = (int)$telefonoDestino;
            $sql_stmt = $this-> conn  -> prepare("SELECT * FROM USUARIO_INFO WHERE TELEFONO = $telefonoDestino");
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
            $sql_stmt = $this-> conn  -> prepare("UPDATE CUENTAS SET 
                SALDO_TOTAL = SALDO_TOTAL - $monto  WHERE ID_CUENTA = $idCuentaOrigen
            ");
            $sql_stmt->execute();
            $result = $sql_stmt->fetchAll(PDO::FETCH_ASSOC);
            return $result;
        }catch(PDOException  $e){
            return "Error: " .$e->getMessage();
        }
    }

    public function EditProfile($iduser, $telefono, $correo){
        try{
            $iduser = (int)$iduser;
            $telefono = (int)$telefono;
            $out = "";
            
            $sql_stmt = $this-> conn  -> prepare("
                CALL EDITAR_INFORMACION_USUARIO($iduser, $telefono, '$correo', :out)
            ");
            $sql_stmt->bindParam(':out',$out,PDO::PARAM_STR|PDO::PARAM_INPUT_OUTPUT, 40);

            $sql_stmt->execute();
            return $out;
        }catch(PDOException  $e){
            return "Error: " .$e->getMessage();
        }
    } 
}   
?>