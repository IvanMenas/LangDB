
const successCon = "Connection successful";
var currentUser = {};

function init(){
    setUser()
    $.post('classes/class-manager.php', {f: "Connect"}, 
    function(response){
        if (response.d != successCon){
            alert('Un error ha ocurrido! Inténtalo másn tarde!');
        }
            loadUserAccount(currentUser.IDUSER); //Debe llenarse con el login
    });
}

function setUser(){
    currentUser.IDUSER = 1
    currentUser.USERNAME = 'admin';
    currentUser.PASSWORD = 'admin';
}
function loadUserAccount(idUser){ 
    $("#accountGrid").find('div').remove()
    $.post('classes/class-manager.php', {f: "loadUserAccount", iduser: idUser}, 
    function(response){
        accounts = response.d;

        if(!accounts){
            return;
        }

        if (!Array.isArray(accounts)) { 
            return
        }

        for (var i = 0; i < accounts.length; i++) {
            var account = accounts[i];
            $("#accountGrid").append($("<div>").attr('id', 'saldo'+ account.IDCUENTA).attr('class', 'w3-third w3-right').append('<br>'));
            $("#saldo"+ account.IDCUENTA).append($("<p>").attr('id', 'saldoP'+ account.IDCUENTA).attr('class', 'w3-text-grey w3-margin-right w3-center').
            append('Saldo<br>'+account.SALDOACTUAL + ' ' + account.NOMBRE));

            $("#accountGrid").append($("<div>").attr('id', 'prod'+ account.IDCUENTA).attr('class', 'w3-third w3-right').append('<br>'));
            $("#prod"+ account.IDCUENTA).append($("<p>").attr('id', 'prodP'+ account.IDCUENTA).attr('class', 'w3-text-grey w3-margin-right w3-center').
            append('Producto<br>'+account.IDBAN));
            
            var descripcion = 'CR-CUENTA CREDITICIA';
            if(account.CREDITO == 1){
                descripcion = 'CR-CUENTA BANCARIA'
            }

            $("#accountGrid").append($("<div>").attr('id', 'desc'+ account.IDCUENTA).attr('class', 'w3-third w3-right').append('<br>'));
            $("#desc"+ account.IDCUENTA).append($("<p>").attr('id', 'descP'+ account.IDCUENTA).attr('class', 'w3-text-grey w3-margin-right w3-center').
            append('Descripción<br>'+descripcion));
        }
    });
}

function loadCompanies(){
    $.post('classes/class-manager.php', {f: "loadCompanies"}, 
    function(response){
        companies = response.d

        if(!companies){
            return;
        }

        if (!Array.isArray(companies)) { 
            return
        }
        for (var i = 0; i < companies.length; i++) {
            var company = companies[i];
            $("#picHolder").append($("<div>").attr('id', 'service'+ company.IDEMPRESA));
            $("#service"+ company.IDEMPRESA).append($("<div>").attr('id', 'pic'+ company.IDEMPRESA).append('<br>'));
            $("#pic"+ company.IDEMPRESA).append($("<img>").attr('src', getServicePic(company.IDEMPRESA)).attr('height', '100').append('<br><br>'));
            $("#service"+ company.IDEMPRESA).append($("<br>"));
            $("#service"+ company.IDEMPRESA).append($("<div>").attr('id', 'tite'+ company.IDEMPRESA).attr('class', 'w3-bar-item w3-button  w3-blue').append(company.NOMBRE));
        }
    });
}

function getServicePic(idServ){
    var file;
   switch(idServ){
       case "1": 
            file = "images/CCSS.png";
       break;
       case "2": 
            file = "images/AYA.png";
       break;
       case "3": 
            file = "images/ICE.png";
       break;
       case "4": 
            file = "images/CNFL.jpg";
       break;
       case "5": 
            file = "images/TIGO.png";
       break;
       case "6": 
            file = "images/kolbi.png";
        break;
        case "7": 
             file = "images/INS.png";
        break;
        case "8": 
              file = "images/Cosevi.png";
        break;
   }

   return file;
}

function initNewAccountModal(){
    $("#divisa").find('option').remove()
    getDivisas();
}
function getDivisas(){
    $.post('classes/class-manager.php', {f: "getDivisas"}, 
    function(response){
        divisas = response.d

        if(!divisas){
            return;
        }

        if (!Array.isArray(divisas)) { 
            return
        }
        for (var i = 0; i < divisas.length; i++) {
            var divisa = divisas[i];
            $("#divisa").append($("<option>").attr('id', 'service'+ divisa.IDDIVISA).append(divisa.NOMBRE).attr('value', divisa.IDDIVISA));
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
    $.post('classes/class-manager.php', {f: "setAccount", iduser: currentUser.IDUSER, idIBAN: idIBAN, idDivisa: idDivisa, credito: credito}, 
    function(response){
        done = response.d;
        msg = "Nueva cuenta agregada";
        if(!done){
            msg = "Cuenta no pudo ser agregada";
        }
        alert(msg)
    }).done(loadUserAccount(currentUser.IDUSER));
}