
--Insertar usuarios
INSERT INTO USUARIO(IDUSER, USERNAME, PASSWORD)
VALUES
(1, 'admin', 'admin');

INSERT INTO USUARIO(IDUSER, USERNAME, PASSWORD)
VALUES
(2, 'Ivan', 'admin');

INSERT INTO USUARIO(IDUSER, USERNAME, PASSWORD)
VALUES
(3, 'Patricia', 'admin');

INSERT INTO USUARIO(IDUSER, USERNAME, PASSWORD)
VALUES
(4, 'Eduardo', 'admin');

INSERT INTO USUARIO(IDUSER, USERNAME, PASSWORD)
VALUES
(5, 'Gabriela', 'admin');

-- Usuarios de servicios
INSERT INTO USUARIO(IDUSER, USERNAME, PASSWORD)
VALUES
(6, 'CCSSS', 'admin');

INSERT INTO USUARIO(IDUSER, USERNAME, PASSWORD)
VALUES
(7, 'AYA', 'admin');

INSERT INTO USUARIO(IDUSER, USERNAME, PASSWORD)
VALUES
(8, 'ICE', 'admin');

INSERT INTO USUARIO(IDUSER, USERNAME, PASSWORD)
VALUES
(9, 'CNFL', 'admin');

INSERT INTO USUARIO(IDUSER, USERNAME, PASSWORD)
VALUES
(10, 'TIGO', 'admin');

INSERT INTO USUARIO(IDUSER, USERNAME, PASSWORD)
VALUES
(11, 'KOLBI', 'admin');

INSERT INTO USUARIO(IDUSER, USERNAME, PASSWORD)
VALUES
(12, 'INS', 'admin');

INSERT INTO USUARIO(IDUSER, USERNAME, PASSWORD)
VALUES
(13, 'COSEVI', 'admin');

--Insertar empresas

INSERT INTO EMPRESA(IDEMPRESA, IDUSER, NOMBRE, DESCRIPCION)
VALUES
(1, 6, 'CCSS', 'Servicio de salud');

INSERT INTO EMPRESA(IDEMPRESA, IDUSER, NOMBRE, DESCRIPCION)
VALUES
(2, 7, 'AYA', 'Servicio de agua');

INSERT INTO EMPRESA(IDEMPRESA, IDUSER, NOMBRE, DESCRIPCION)
VALUES
(3, 8, 'ICE', 'Servicio de electricidad');

INSERT INTO EMPRESA(IDEMPRESA, IDUSER, NOMBRE, DESCRIPCION)
VALUES
(4, 9, 'CCSS', 'Servicio de electricidad');

INSERT INTO EMPRESA(IDEMPRESA, IDUSER, NOMBRE, DESCRIPCION)
VALUES
(5, 10, 'TIGO', 'Servicio de telecomunicaciones');

INSERT INTO EMPRESA(IDEMPRESA, IDUSER, NOMBRE, DESCRIPCION)
VALUES
(6, 11, 'KOLBI', 'Servicio de telecomunicaciones');

INSERT INTO EMPRESA(IDEMPRESA, IDUSER, NOMBRE, DESCRIPCION)
VALUES
(7, 12, 'INS', 'Servicio de seguros');

INSERT INTO EMPRESA(IDEMPRESA, IDUSER, NOMBRE, DESCRIPCION)
VALUES
(8, 13, 'COSEVI', 'Servicio de transporte');


--Insertar divisas

INSERT INTO DIVISA(IDDIVISA, NOMBRE, PRECIOVENTADOLAR, PRECIOCOMPRADOLAR, RESERVADOLAR)
VALUES
(1, 'Colones', 0.0016, 0.0018, 2500000);

INSERT INTO DIVISA(IDDIVISA, NOMBRE, PRECIOVENTADOLAR, PRECIOCOMPRADOLAR, RESERVADOLAR)
VALUES
(2, 'Dolar', 1, 1.2, 5500000000);

INSERT INTO DIVISA(IDDIVISA, NOMBRE, PRECIOVENTADOLAR, PRECIOCOMPRADOLAR, RESERVADOLAR)
VALUES
(3, 'Euro', 1.13, 1.25, 4560000);


--Insertar cuentas
INSERT INTO CUENTA(IDCUENTA, IDUSER, IDBAN, IDDIVISA, SALDOTOTAL, SALDOACTUAL, SALDORETENIDO, CREDITO, SISTEMAPAGO)
VALUES
(1, 1, 'CR123456891010', 1, 150000, 85000, 65000, 0, 0);

INSERT INTO CUENTA(IDCUENTA, IDUSER, IDBAN, IDDIVISA, SALDOTOTAL, SALDOACTUAL, SALDORETENIDO, CREDITO, SISTEMAPAGO)
VALUES
(2, 1, 'CR12388999201', 1, 800000, 5000, 75000, 0, 0);

INSERT INTO CUENTA(IDCUENTA, IDUSER, IDBAN, IDDIVISA, SALDOTOTAL, SALDOACTUAL, SALDORETENIDO, CREDITO, SISTEMAPAGO)
VALUES
(3, 2, 'CR123453445010', 1, 10000000, 0, 65000, 1, 0);

-- Insertar tipo de cedula

INSERT INTO TIPOCEDULA(IDTIPOCEDULA, DESCRIPCION)
VALUES(3, 'NACIONAL');

INSERT INTO TIPOCEDULA(IDTIPOCEDULA, DESCRIPCION)
VALUES(2, 'EXTRANJERO');

INSERT INTO TIPOCEDULA(IDTIPOCEDULA, DESCRIPCION)
VALUES(1, 'DIMEX');

-- Insertar personal info
INSERT INTO USUARIO_PERSONAL_INFO(IDPERSONALINFO, IDUSER, IDTIPOCEDULA, NOMBRE, APELLIDO, CEDULA, TELEFONO, CORREO, DIRECCION)
VALUES (1, 1, 1, 'admin', 'admin', 12345678, 89988818, 'admin@gmail.com', 'Pavas')