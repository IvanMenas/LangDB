

function loadUserAccount(idUser){ 
    $.post('classes/class-manager.php', {f: "loadUserAccount", iduser: idUser}, 
    function(response){
        accounts = response.d
        console.log(response);

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
