CREATE TABLE USUARIO (
IDUSER NUMBER,/*PK*/
USERNAME VARCHAR2(50),
PASSWORD VARCHAR2(50),
CONSTRAINT IDUSER_PK PRIMARY KEY (IDUSER)
);

CREATE TABLE DIVISA (
IDDIVISA NUMBER,/*PK*/
NOMBRE VARCHAR2(30),
PRECIOVENTADOLAR FLOAT,
PRECIOCOMPRADOLAR FLOAT,
RESERVADOLAR FLOAT, 
CONSTRAINT IDDIVISA_PK PRIMARY KEY (IDDIVISA)
);

CREATE TABLE CUENTA (
IDCUENTA NUMBER,/*PK*/
IDUSER NUMBER,/*FK*/
IDBAN VARCHAR2(30),
IDDIVISA NUMBER,/*FK*/
SALDOTOTAL FLOAT,
SALDOACTUAL FLOAT,
SALDORETENIDO FLOAT,
CREDITO NUMBER(2),
SISTEMAPAGO NUMBER,
CONSTRAINT IDCUENTA_PK PRIMARY KEY (IDCUENTA),
CONSTRAINT FK_IDUSER FOREIGN KEY (IDUSER) REFERENCES USUARIO(IDUSER),
CONSTRAINT FK_IDDIVISA FOREIGN KEY (IDDIVISA) REFERENCES DIVISA(IDDIVISA)
);


CREATE TABLE TIPOCEDULA(
IDTIPOCEDULA NUMBER,/*PK*/
DESCRIPCION VARCHAR2(50),
PAISORIGEN VARCHAR2(20),
CONSTRAINT IDTIPOCEDULA_PK PRIMARY KEY (IDTIPOCEDULA)
);



CREATE TABLE USUARIO_PERSONAL_INFO (
IDPERSONALINFO NUMBER,/*PK*/
IDUSER NUMBER,/*FK*/
IDTIPOCEDULA NUMBER,/*FK*/
NOMBRE VARCHAR2(20),
APELLIDO VARCHAR2(20),
CEDULA VARCHAR2(20),
TELEFONO NUMBER,
CORREO VARCHAR2(20),
IDBACKUPINFO NUMBER,
DIRECCION VARCHAR2(40),
CONSTRAINT IDPERSONALINFO_PK PRIMARY KEY (IDPERSONALINFO),
CONSTRAINT FK_IDUSER_USARIO_PERSONAL FOREIGN KEY (IDUSER) REFERENCES USUARIO(IDUSER),
CONSTRAINT FK_IDTIPOCEDULA FOREIGN KEY (IDTIPOCEDULA) REFERENCES TIPOCEDULA(IDTIPOCEDULA)
);


CREATE TABLE BACKUP_PERSONAL_INFO (
IDBACKUPPERSONALINFO NUMBER,/*PK*/
CORREO_BACKUP VARCHAR2(30),
SAFE_CODE NUMBER,
CONSTRAINT IDBACKUPPERSONALINFO_PK PRIMARY KEY (IDBACKUPPERSONALINFO)
);





CREATE TABLE MOVIMIENTODISPONIBLE (
IDMOVIMIENTOSDISPONIBLES NUMBER,/*PK*/
IDCUENTA NUMBER,/*FK*/
SINPEMOVIL NUMBER(2),
SINPE NUMBER(2),
DEPOSITO NUMBER(2),
RETIROCAJERO NUMBER(2),
CONSTRAINT IDMOVIMIENTODISPONIBLES_PK PRIMARY KEY (IDMOVIMIENTOSDISPONIBLES),
CONSTRAINT FK_IDCUENTA FOREIGN KEY (IDCUENTA) REFERENCES CUENTA(IDCUENTA)
);


CREATE TABLE EMPRESA (
IDEMPRESA NUMBER,/*PK*/
NOMBRE VARCHAR2(20),
IDUSER NUMBER,/*FK*/
DESCRIPCION VARCHAR2(30),
CONSTRAINT IDEMPRESA_PK PRIMARY KEY (IDEMPRESA),
CONSTRAINT FK_IDUSER2 FOREIGN KEY (IDUSER) REFERENCES USUARIO(IDUSER)
);


CREATE TABLE STATUSTRANSCACCIONAL (
IDSTATUSTRANSACCIONAL NUMBER,/*PK*/
DESCRIPCION VARCHAR2(30),
CONSTRAINT IDSTATUSTRANSACCIONAL_PK PRIMARY KEY (IDSTATUSTRANSACCIONAL)
);


CREATE TABLE TRANSACCION (
IDTRANSACCION NUMBER,/*PK*/
IDUSER NUMBER,/*FK*/
IDCUENTAORIGEN NUMBER,
IDCUENTADESTINO NUMBER,
MONTO FLOAT,
IDSTATUS NUMBER,
DESCRIPCION VARCHAR2(30),
CONSTRAINT IDTRANSACCION_PK PRIMARY KEY (IDTRANSACCION),
CONSTRAINT FK_IDUSERTRANSACCION FOREIGN KEY (IDUSER) REFERENCES USUARIO(IDUSER)
);


CREATE TABLE BALANCE (
IDBALANCE NUMBER,/*PK*/
IDUSER NUMBER,/*FK*/
TOTALACTIVO FLOAT,
TOTALPASIVO FLOAT,
CONSTRAINT IDBALANCE_PK PRIMARY KEY (IDBALANCE),
CONSTRAINT FK_IDUSER_BALANCE FOREIGN KEY (IDUSER) REFERENCES USUARIO(IDUSER)
);


CREATE TABLE SERVICIOS (
IDSERVICIOS NUMBER,/*PK*/
DESCRIPCION VARCHAR2(30),
CONSTRAINT IDSERVICIOS_PK PRIMARY KEY (IDSERVICIOS)
);


CREATE TABLE STATUSPAGO (
IDSTATUSPAGO NUMBER,/*PK*/
DESCRIPCION VARCHAR2(30),
CONSTRAINT IDSTATUSPAGO_PK PRIMARY KEY (IDSTATUSPAGO)
);


CREATE TABLE FACTURA (
IDFACTURA NUMBER,/*PK*/
IDTRANSACCION NUMBER,/*FK*/
IDSERVICIOS NUMBER,/*FK*/
DESCRIPCION VARCHAR2(30),
REFERENCIA NUMBER,
IDSTATUSPAGO NUMBER,/*FK*/
MONTO FLOAT,
CONSTRAINT IDFACTURA_PK PRIMARY KEY (IDFACTURA),
CONSTRAINT FK_IDTRANSACCION FOREIGN KEY (IDTRANSACCION) REFERENCES TRANSACCION(IDTRANSACCION),
CONSTRAINT FK_IDSERVICIOS FOREIGN KEY (IDSERVICIOS) REFERENCES SERVICIOS(IDSERVICIOS),
CONSTRAINT FK_IDSTATUSPAGO FOREIGN KEY (IDSTATUSPAGO) REFERENCES STATUSPAGO(IDSTATUSPAGO)
);
