

function init(){
    $.post('classes/class-manager.php', {f: "Connect"}, 
    function(data){
        console.log(data);
    });
}