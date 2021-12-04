
function validaciones() {

    var retorno = false;
    try {
        //obtiene el nombre del paciente
        var test= document.getElementById('TEST1').value;

        /*  /^([A-Z]{1}[a-zñáéíóú]+[\s]*)+$/ Comprobar un nombre propio
         En realidad comprobamos que el el nombre empieza por una letra mayúscula, 
         y que los caracteres que le siguien son minúsculas y letras empleadas en español, 
         y que no son números; en el patrón este esquema podemos repetirlo con un espacio en medio, 
         con lo cual se pueden poner también nombres compuestos. La expresión es la siguiente */

        if (test == null || test.length == 0 || !(/^([A-Z]{1}[a-zñáéíóú]+[\s]*)+$/.test(test))) {
            return retorno;
        }

      
      
    } catch (error) {
        retorno = false;
    }
    //Cuando se ejecuta un evento submit y el resultado de la función javaScript es true
    //La información se envía al servidor, caso contrario no se realiza el envió al servidor.aviso
    return retorno;

}