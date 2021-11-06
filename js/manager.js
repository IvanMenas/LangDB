

function init(){
    $.post('classes/class-manager.php', {f: "Test"}, 
    function(data){
        console.log(data);
    });
}