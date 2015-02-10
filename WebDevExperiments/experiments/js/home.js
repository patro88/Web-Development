$(function(){
    $("li").on("click", function(event){
        $(event.target).find("a").click();
    })       
});