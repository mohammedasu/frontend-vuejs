$("select").change(function() {
    $(this).css("color", "#333333");
});

// Header fixed end

// smooth scroll start
$(".smoothscroll").on("click", function(e) {
    var href = $(this).attr("href");
    $("html, body").animate(
        {
            scrollTop: $(href).offset().top
        },
        "90000"
    );
    e.preventDefault();
});
// smooth scroll end

// humber menu icon start
$(document).ready(function() {
    $("#nav-icon4").click(function() {
        $(this).toggleClass("open");
    });
});
// humber menu icon end

// search sec start
$(function() {
    $('a[href="#search"]').on("click", function(event) {
        event.preventDefault();
        $("#search").addClass("open");
        $('#search > form > input[type="search"]').focus();
    });

    $("#search, #search button.close").on("click keyup", function(event) {
        if (
            event.target == this ||
            event.target.className == "close" ||
            event.keyCode == 27
        ) {
            $(this).removeClass("open");
        }
    });

    //Do not include! This prevents the form from submitting for DEMO purposes only!
    $("form").submit(function(event) {
        event.preventDefault();
        return false;
    });
});

// search sec end

// navbar responsive sidebar start
function openNav() {
    document.getElementById("navbarCollapse").style.width = "100%";
    document.getElementById("navbarCollapse").style.transition = "1s";
}

function closeNav() {
    document.getElementById("navbarCollapse").style.width = "0%";
    document.getElementById("navbarCollapse").style.transition = "0.6s";
}
// navbar responsive sidebar end

// select option  start
$("select").change(function() {
    $(this).css("color", "#333333");
});
// select option  end

$("#logout,#logout_mobile").click(function(event) {
    event.preventDefault();
    var request_id = new Date().getUTCMilliseconds();
    var form_data = new FormData();
    var request = $.ajax({
        url: ApiUrl + api_user.logout,
        type: "POST",
        dataType: "json",
        data: form_data,
        contentType: false,
        processData: false,
        headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
            "x-request-id": request_id
        }
    });
    request.done(function(response) {
        if (response.success == true) {
            const data = response.data;
            if (data.is_logout) {
                localStorage.setItem("token", "");
                localStorage.setItem("redirectUrl", "");
                localStorage.removeItem("selectedContact", "");
                localStorage.removeItem("utm_source");
                localStorage.removeItem("utm_medium");
                localStorage.removeItem("utm_campaign");
                window.location.href = "/login";
            } else {
                showErrorMessage(response.message);
            }
        } else {
            showErrorMessage(response.message);
        }
    });
    request.fail(function() {
        showErrorMessage();
    });
});
//custom js
$(document).on("click", ".addModel", function() {
    $("#addnewpatientpopup").modal({ backdrop: "static" });
});

//dropdown menu start
function toggleBtn() {
    document.getElementById("myDropdown").classList.toggle("show");
}

window.onclick = function(event) {
if (!event.target.matches('.dropbtn')) {
    var dropdowns = document.getElementsByClassName("dropdown-content");
    var i;
    for (i = 0; i < dropdowns.length; i++) {
    var openDropdown = dropdowns[i];
    if (openDropdown.classList.contains('show')) {
        openDropdown.classList.remove('show');
    }
    }
}
}
  //dropdown menu end

function getUrlData() {
    var vars = [],
        hash;
    var hashes = window.location.href
        .slice(window.location.href.indexOf("?") + 1)
        .split("&");
    for (var i = 0; i < hashes.length; i++) {
        hash = hashes[i].split("=");
        //vars.push(hash[0]);
        vars[hash[0]] = hash[1];
    }
    return vars;
}

$(function() {
    const promo_modal = localStorage.getItem("promo_modal");
    if (promo_modal != 1) {
        // check modal set or not
        $("#launchpromopopup").modal({ backdrop: "static" });
        localStorage.setItem("promo_modal", 1);
    }
    var navMain = $("#navbarCollapse");
    navMain.on("click", "a", null, function() {
        navMain.collapse("hide");
        $(".navbar-toggler").removeClass("open");
        $(".navbar-toggler").removeClass("collapsed");
    });

    $(document).on("click", ".b-sidebar-backdrop", function(event) {
        var _opened = $(".navbar-collapse").hasClass("collapse show");
        if (_opened === true) {
            navMain.collapse("hide");
            $(".navbar-toggler").removeClass("open");
            $(".navbar-toggler").removeClass("collapsed");
        }
    });
    var url_vars = getUrlData();
    if (
        url_vars["utm_source"] != "" &&
        url_vars["utm_source"] != undefined &&
        url_vars["utm_medium"] != "" &&
        url_vars["utm_medium"] != undefined &&
        url_vars["utm_campaign"] != "" &&
        url_vars["utm_campaign"] != undefined
    ) {
        localStorage.setItem("utm_source", url_vars["utm_source"]);
        localStorage.setItem("utm_medium", url_vars["utm_medium"]);
        localStorage.setItem("utm_campaign", url_vars["utm_campaign"]);
    }
});

function closeLaunchModal() {
    $("#iframeId").attr("src", "");
    $("#launchpromopopup").modal("hide");
}
