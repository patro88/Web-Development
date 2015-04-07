$(function () {

    $(".focus").focus(function () {
        $(this).css("background-color", "yellow");
    });
    $(".focus").blur(function () {
        $(this).css("background-color", "white");
    });
    $("#tgDiv button").click(function () {
        $("#tgDiv p").toggle();
    });

    $("#firstfade button").click(function () {
        $("#firstfade #div1").fadeToggle();
        $("#firstfade #div2").fadeToggle("slow");
        $("#firstfade #div3").fadeToggle(3000);
    });
    $("#secondfade button").click(function () {
        $("#secondfade #div1").fadeTo("slow", 0.15);
        $("#secondfade #div2").fadeTo("slow", 0.4);
        $("#secondfade #div3").fadeTo("slow", 0.7);
    });




    ///302///
    $("#appendItem").click(function () {
        $("ol").append("<li class='extra' >Appended item</li>");
    });
    $("#prependItem").click(function () {
        $("ol").prepend("<li class='extra' >Prepended item</li>");
    });
    $("#afterItem").click(function () {
        $("ol").after("<p class='extra' >After OL</p>");
    });
    $("#beforeItem").click(function () {
        $("ol").before("<p class='extra' >Before OL</p>");
    });
    $("#removeItem").click(function () {
        $("li").remove(".extra");
        $("p").remove(".extra");
    });
    $("#emptyItem").click(function () {
        $("ol").empty();
    });


    //303//
    $("#ajaxBtn").click(function () {
        $("#ajaxdiv").load("week3_ajax.txt", function (responseTxt, statusTxt, xhr) {
            if (statusTxt == "success")
                alert("External content loaded successfully!");
            if (statusTxt == "error")
                alert("Error: " + xhr.status + ": " + xhr.statusText);
        });
    });


    //304///
    $("#sortable").sortable();
    $("#sortable").disableSelection();

    $("#catalog").accordion();
    $("#catalog li").draggable({
        appendTo: "body",
        helper: "clone"
    });
    $("#cart ol").droppable({
        activeClass: "ui-state-default",
        hoverClass: "ui-state-hover",
        accept: ":not(.ui-sortable-helper)",
        drop: function (event, ui) {
            $(this).find(".placeholder").remove();
            $("<li></li>").text(ui.draggable.text()).appendTo(this);
        }
    }).sortable({
        items: "li:not(.placeholder)",
        sort: function () {
            // gets added unintentionally by droppable interacting with sortable
            // using connectWithSortable fixes this, but doesn't allow you to customize active/hoverClass options
            $(this).removeClass("ui-state-default");
        }
    });


    //305///
    var state = true;
    $("#responsive").click(function () {
        if (state) {
            $("#effect").animate({
                backgroundColor: "#aa0000",
                color: "#fff",
                width: 500
            }, 1000);
        } else {
            $("#effect").animate({
                backgroundColor: "#fff",
                color: "#000",
                width: 240
            }, 1000);
        }
        state = !state;
    });

    var availableTags = [
                      "ActionScript",
                      "AppleScript",
                      "Asp",
                      "BASIC",
                      "C",
                      "C++",
                      "Clojure",
                      "COBOL",
                      "ColdFusion",
                      "Erlang",
                      "Fortran",
                      "Groovy",
                      "Haskell",
                      "Java",
                      "JavaScript",
                      "Lisp",
                      "Perl",
                      "PHP",
                      "Python",
                      "Ruby",
                      "Scala",
                      "Scheme"
    ];
    $("#tags").autocomplete({
        source: availableTags
    });

    $(document).tooltip({
        track: true
    });
});