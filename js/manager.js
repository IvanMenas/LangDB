
const successCon = "Connection successful";

//Init User and Home Page
function init(){
    $.post('classes/class-manager.php', {f: "Connect"}, 
    function(response){
        console.log(response)
        if (response.d != successCon){
            alert('Un error ha ocurrido! Inténtalo más tarde!');
        }
    });
}

//Login
function validate(){
    password = document.getElementById('password').value;
    username = document.getElementById('username').value;
    $.post('classes/class-manager.php', {f: "login", username: username,  password: password}, 
    function(response){
        console.log(response)
       if(!response.d){
            alert("Credenciales incorrectas")
       }else{
        window.location.href = "main.html";
        setUser(response.d, username, password);
       }
    });
}

function setUser(iduser, username, password){
    console.log(iduser)
    localStorage.setItem('IDUSER', iduser);
    localStorage.setItem('USERNAME', username);
    localStorage.setItem('PASSWORD', password);
}

//Registrar
function registrar(){
    msg = "";
    nombre = document.getElementById('nombre').value;
    apellido = document.getElementById('apellido').value;
    cedula = document.getElementById('cedula').value;
    username = document.getElementById('username').value;
    telefono= document.getElementById('telefono').value;
    direccion = document.getElementById('direccion').value;
    correo = document.getElementById('correo').value;
    password = document.getElementById('password').value;
    

    console.log(nombre)
    $.post('classes/class-manager.php', {f: "singup",nombre: nombre, apellido: apellido, cedula: cedula,  username: username, telefono: telefono, direccion: direccion, correo: correo, password: password}, 
    function(response){
        console.log(response)
        if(response.d == "0"){
            alert("No se pudo agregar usuario nuevo")
        }else{
            msg='Cuenta Agregada'
            window.location.href = "login.html";
            setUser(response.d, username, password);
        }
        alert(msg)
    }).done();
    // window.location.href = "main.html";
}

//Account grid
function getUserAccount(idUser){
    $.post('classes/class-manager.php', {f: "loadUserAccount", iduser: idUser}, 
    function(response){
        accounts = response.d;

        if(!accounts){
            return;
        }

        if (!Array.isArray(accounts)) { 
            return
        }
        return accounts;
    });
}

function loadAccountGrid(){ 
    idUser = localStorage.getItem('IDUSER');
    console.log(idUser)
    $("#accountGrid").find('div').remove()
    accounts = getUserAccount(idUser);
    setTimeout(() => {
        console.log(accounts)
        for (var i = 0; i < accounts.length; i++) {
            var account = accounts[i];
            $("#accountGrid").append($("<div>").attr('id', 'saldo'+ account.ID_CUENTA).attr('class', 'w3-third w3-right').append('<br>'));
            $("#saldo"+ account.ID_CUENTA).append($("<p>").attr('id', 'saldoP'+ account.ID_CUENTA).attr('class', 'w3-text-grey w3-margin-right w3-center').
            append('Saldo<br>'+account.SALDO_ACTUAL + ' ' + account.NOMBRE));

            $("#accountGrid").append($("<div>").attr('id', 'prod'+ account.ID_CUENTA).attr('class', 'w3-third w3-right').append('<br>'));
            $("#prod"+ account.ID_CUENTA).append($("<p>").attr('id', 'prodP'+ account.ID_CUENTA).attr('class', 'w3-text-grey w3-margin-right w3-center').
            append('Producto<br>'+account.IBAN));
            
            var descripcion = 'CR-CUENTA CREDITICIA';
            if(account.CREDITO == 1){
                descripcion = 'CR-CUENTA BANCARIA'
            }

            $("#accountGrid").append($("<div>").attr('id', 'desc'+ account.ID_CUENTA).attr('class', 'w3-third w3-right').append('<br>'));
            $("#desc"+ account.ID_CUENTA).append($("<p>").attr('id', 'descP'+ account.ID_CUENTA).attr('class', 'w3-text-grey w3-margin-right w3-center').
            append('Descripción<br>'+descripcion));
        }
    }, 1000);
}

//Account Modals
function initNewAccountModal(){
    $("#divisa").find('option').remove()
    getDivisas();
}

function getDivisas(){
    $.post('classes/class-manager.php', {f: "getDivisas"}, 
    function(response){
        console.log(response)
        divisas = response.d

        if(!divisas){
            return;
        }

        if (!Array.isArray(divisas)) { 
            return
        }
        for (var i = 0; i < divisas.length; i++) {
            var divisa = divisas[i];
            $("#divisa").append($("<option>").attr('id', 'service'+ divisa.ID_DIVISA).append(divisa.NOMBRE).attr('value', divisa.ID_DIVISA));
        }
    });
}

function addNewAccount(){
    idIBAN = document.getElementById('iban').value;
    idDivisa = document.getElementById('divisa').value;
    credito = 0;
    if(document.getElementById('credito').value == 'on'){
        credito = 1;
    }
    $.post('classes/class-manager.php', {f: "setAccount", iduser: localStorage.getItem('IDUSER'), idIBAN: idIBAN, idDivisa: idDivisa, credito: credito}, 
    function(response){
        console.log(response)
        done = response.d;
        msg = "Nueva cuenta agregada";
        if(!done){
            msg = "Cuenta no pudo ser agregada";
        }
        alert(msg)
    }).done(loadAccountGrid(localStorage.getItem('IDUSER')));
}

function removeAccount(){
    idIBAN = document.getElementById('ibanRemove').value;
    console.log(idIBAN)
    $.post('classes/class-manager.php', {f: "removeAccount", idIBAN: idIBAN}, 
    function(response){
        done = response.d;
        console.log(response)
        msg = "Cuenta eliminada";
        if(!done){
            msg = "Cuenta no pudo ser eliminada";
        }
        alert(msg)
    }).done(loadAccountGrid(localStorage.getItem('IDUSER')));
}

//Services grid

function loadCompanies(){
    console.log(localStorage.getItem('IDUSER'))
    console.log('test')
    $.post('classes/class-manager.php', {f: "loadCompanies"}, 
    function(response){
        console.log(response)
        companies = response.d

        if(!companies){
            return;
        }

        if (!Array.isArray(companies)) { 
            return
        }
        for (var i = 0; i < companies.length; i++) {
            var company = companies[i];
            info = getServiceInfo(company.ID_EMPRESA);
            $("#picHolder").append($("<div>").attr('id', 'service'+ company.ID_EMPRESA));
            $("#service"+ company.ID_EMPRESA).append($("<div>").attr('id', 'pic'+ company.ID_EMPRESA).append('<br>'));
            $("#pic"+ company.ID_EMPRESA).append($("<img>").attr('src', info.file).attr('height', '100').append('<br><br>'));
            $("#service"+ company.ID_EMPRESA).append($("<br>"));
            $("#service"+ company.ID_EMPRESA).append($("<div>").attr('id', 'tite'+ company.ID_EMPRESA)
            .attr('class', 'w3-bar-item w3-button  w3-blue'));
            $("#tite"+ company.ID_EMPRESA).append($("<a>").attr('id', company.ID_EMPRESA+info.form).css('color', 'white').attr('href', info.form).append(company.NOMBRE))
            console.log(document.getElementById(company.ID_EMPRESA+info.form))
            console.log(info.form)
            console.log(company.ID_EMPRESA)
        }
    });
}


function getServiceInfo(idServ){
    var info = {};
   switch(idServ){
       case "9": 
            info.file = "images/CCSS.png";
            info.form = "PagoServicio.html";
            
       break;
       case "10": 
            info.file = "images/AYA.png";
            info.form = "PagoServicio.html";
       break;
       case "11": 
             info.file = "images/ICE.png";
             info.form = "postpago.html";
       break;
       case "12": 
            info.file = "images/CNFL.jpg";
            info.form = "PagoServicio.html";
       break;
       case "13": 
             info.file = "images/TIGO.png";
             info.form = "PagoServicio.html";
       break;
       case "14": 
            info.file = "images/kolbi.png";
            info.form = "postPago.html";
        break;
        case "15": 
            info.file = "images/claro.png";
            info.form = "postPago.html";
        break;
        case "16": 
            info.file = "images/movistar.png";
            info.form = "postpago.html";
        break;
   }

   return info;
}

// Transfer

//Sinpe

function initSinpe(){
    loadAccountCbb()
    
}

function loadAccountCbb(){ 
    accounts = getUserAccount(localStorage.getItem('IDUSER'));
    console.log(localStorage.getItem('IDUSER'))
    setTimeout(() => {
        console.log(accounts)
        for (var i = 0; i < accounts.length; i++) {
            var account = accounts[i];
            $("#cbbAccount").append($("<option>").attr('id', 'service'+ account.ID_CUENTA).append(account.IBAN + ' ' + account.NOMBRE).attr('value', account.ID_CUENTA));
        }
    }, 1000);
}

function initSinpeMov(){
    telefonoDestino = document.getElementById('telefono').value;
    console.log(telefonoDestino)
    $.post('classes/class-manager.php', {f: "getTargetSinpeAccount", telefonoDestino: telefonoDestino}, 
    function(response){
        targetAccount = response.d[0];
        console.log(targetAccount);
        
        $("#dialog-confirm").dialog({resizable: false, height: 'auto', width: 400, modal: true, position: {my: 'center top', at: 'center top-25'}, closeOnEscape: true});
		$("#dialog-confirm").dialog('option', 'title', 'Information');
        $("#dialog-confirm").empty().append(`<p>Realizar Sinpe Movil a ` + targetAccount.NOMBRE + `  ` + targetAccount.APELLIDO +`</p>`);
        $("#dialog-confirm").dialog('option', 'buttons', {
            'Yes': function () {
                execSinpeMov(targetAccount)
            },
            'No': function () {
                $(this).dialog("close");
                $("#dialog-confirm").dialog("destroy");
            }
        });
    });
}

function execSinpeMov(idCuentaDestino){
    monto = document.getElementById('monto').value;
    $.post('classes/class-manager.php', {f: "execSinpe", iduser: localStorage.getItem('IDUSER'), idCuentaOrigen: 0, idCuentaDestino: idCuentaDestino, monto: monto}, 
    function(response){
        console.log(response)
        done = response.d;
        alert('Sinpe realizado')
    });
}

function ProfileEdit(){
    msg = "";
    telefono = document.getElementById('telef').value;
    correo = document.getElementById('email').value;
    direccion = document.getElementById('direccion').value;
    console.log(localStorage.getItem('IDUSER'))
    console.log(telefono)
    console.log(correo)
  //  setTimeout(() => {
        $.post('classes/class-manager.php', {f: "EditProfile", iduser: localStorage.getItem('IDUSER'), telefono: telefono, correo: correo, direccion: direccion}, 
        function(response){
            console.log(response)
            done = response.d;
            msg = "Cuenta Modificada";
            if(!done){
                msg = "Error no se pudo modificar";
            }
            alert(msg)
        }).done();
 //   }, 1000);
}

//Historial transaccional

function openHistorialModal(){
    $("#myModal").modal()
    $("#cbbAccount").find('option').remove()
    $("#tranBody").find('tr').remove()
    loadAccountCbb()
}

function loadHistorialModal(){
    $("#tranBody").find('tr').remove()
    idCuenta = document.getElementById("cbbAccount").value;
    $.post('classes/class-manager.php', {f: "loadHistory", idCuenta: idCuenta}, 
    function(response){
        historial = response.d
        for (var i = 0; i < historial.length; i++) {
            transaccion = historial[i]
            $("#tranBody").append($("<tr>").attr("class", "info")
            .append($("<td>").append(transaccion.DESCRIPCION))
            .append($("<td>").append(transaccion.ORIGEN))
            .append($("<td>").append(transaccion.DESTINO))
            .append($("<td>").append(transaccion.MONTO))
            );
            console.log(document.getElementById('tranBody'))
        }
    }).done();
}

