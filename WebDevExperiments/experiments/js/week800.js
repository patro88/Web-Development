function showMyImage(fileInput) {
    var files = fileInput.files;
    for (var i = 0; i < files.length; i++) {
        var file = files[i];
        var imageType = /image.*/;
        if (!file.type.match(imageType)) {
            continue;
        }
        var img = document.getElementById("thumbnil");
        img.file = file;
        var reader = new FileReader();
        reader.onload = (function (aImg) {
            return function (e) {
                aImg.src = e.target.result;
            };
        })(img);
        reader.readAsDataURL(file);
    }
}

$(function () {
    $("#iframe_video").hide();
    $("#btn_video").click(function () {
        $("#iframe_video").attr("src", $("#input_video").val());
        $("#iframe_video").show();
    });
});

google.load("search", "1", { "nocss": true });
function DoSearch() {
    var ss = document.getElementById("secrchBox").value;
    // Create a search control
    var searchControl = new google.search.SearchControl();

    searchControl.addSearcher(new google.search.WebSearch());

    searchControl.draw(document.getElementById("searchcontrol"));

    // execute an inital search
    searchControl.execute(ss);
}


function dosearchAll() {
    var sf=document.searchform;
    var submitto = sf.sengines.options[sf.sengines.selectedIndex].value + escape(sf.searchterms.value);
    window.location.href = submitto;
    return false;
}
