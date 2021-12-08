
const successCon = "Connection successful";

//Init User and Home Page
function init(){
    setUser()
    $.post('classes/class-manager.php', {f: "Connect"}, 
    function(response){
        if (response.d != successCon){
            alert('Un error ha ocurrido! Inténtalo másn tarde!');
        }
        loadAccountGrid(localStorage.getItem('IDUSER')); //Debe llenarse con el login
    });
}

function setUser(){
    localStorage.setItem('IDUSER', 1);
    localStorage.setItem('USERNAME', 'admin');
    localStorage.setItem('PASSWORD', 'admin');
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

function loadAccountGrid(idUser){ 
    accounts = getUserAccount(idUser);
    setTimeout(() => {
        console.log(accounts)
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
    $.post('classes/class-manager.php', {f: "setAccount", iduser: localStorage.getItem('IDUSER'), idIBAN: idIBAN, idDivisa: idDivisa, credito: credito}, 
    function(response){
        console.log(response)
        done = response.d;
        msg = "Nueva cuenta agregada";
        if(!done){
            msg = "Cuenta no pudo ser agregada";
        }
        alert(msg)
    }).done(loadUserAccount(localStorage.getItem('IDUSER')));
}

function removeAccount(){
    idIBAN = document.getElementById('ibanRemove').value;
    $.post('classes/class-manager.php', {f: "removeAccount", idIBAN: idIBAN}, 
    function(response){
        done = response.d;
        console.log(response)
        msg = "Cuenta eliminada";
        if(!done){
            msg = "Cuenta no pudo ser eliminada";
        }
        alert(msg)
    }).done(loadUserAccount(localStorage.getItem('IDUSER')));
}

//Services grid

function loadCompanies(){
    console.log(localStorage.getItem('IDUSER'))
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
            info = getServiceInfo(company.IDEMPRESA);
            test = myFunction();
            $("#picHolder").append($("<div>").attr('id', 'service'+ company.IDEMPRESA));
            $("#service"+ company.IDEMPRESA).append($("<div>").attr('id', 'pic'+ company.IDEMPRESA).append('<br>'));
            $("#pic"+ company.IDEMPRESA).append($("<img>").attr('src', info.file).attr('height', '100').append('<br><br>'));
            $("#service"+ company.IDEMPRESA).append($("<br>"));
            $("#service"+ company.IDEMPRESA).append($("<div>").attr('id', 'tite'+ company.IDEMPRESA).attr('class', 'w3-bar-item w3-button  w3-blue').append(company.NOMBRE));
            
        }
    });
}


function getServiceInfo(idServ){
    var info = {};
   switch(idServ){
       case "1": 
            info.file = "images/CCSS.png";
            info.form = "PagoServicio.html";
            
       break;
       case "2": 
            info.file = "images/AYA.png";
            info.form = "PagoServicio.html";
       break;
       case "3": 
             info.file = "images/ICE.png";
             info.form = "postpago.html";
       break;
       case "4": 
            info.file = "images/CNFL.jpg";
            info.form = "PagoServicio.html";
       break;
       case "5": 
             info.file = "images/TIGO.png";
             info.form = "PagoServicio.html";
       break;
       case "6": 
            info.file = "images/kolbi.png";
            info.form = "Prepago.html";
        break;
        case "7": 
            info.file = "images/claro.png";
            info.form = "postPago.html";
        break;
        case "8": 
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
    accounts = getUserAccount(1);
    console.log(localStorage.getItem('IDUSER'))
    setTimeout(() => {
        console.log(accounts)
        for (var i = 0; i < accounts.length; i++) {
            var account = accounts[i];
            $("#cbbAccount").append($("<option>").attr('id', 'service'+ account.IDCUENTA).append(account.IDBAN).attr('value', account.IDCUENTA));
        }
    }, 1000);
}
