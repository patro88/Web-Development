$(function(){
    $(".navLink").click(function (event) {
        if (event.target.tagName == "LI") {
            window.open($(event.target).find("a").attr("href"));
        } else {
            window.open($(event.target).closest("a").attr("href"));
        }
       
        event.preventDefault();
    })


    $(".list").click(function () {
        $("#smallNav").toggle("slow");
    });
});